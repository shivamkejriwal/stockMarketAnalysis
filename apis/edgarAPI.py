import requests
import json
from pprint import pprint as pp
from datetime import datetime,timedelta
import config as config
EDGAR_Key = config.EDGAR_Key


def getAuthorizedURL(url):
	AuthorizedURL = url+'&appkey='+EDGAR_Key
	return AuthorizedURL

def fixData(data):
	result = []
	for rows in data['result']['rows']:
		obj = {}
		for item in rows['values']:
			key =  item['field']
			value = item['value']
			obj[key] = value
		result.append(obj)
	return result

def getData(url):
	response = requests.get(getAuthorizedURL(url))
	json_data = response.content
	data = json.loads(json_data)
	if 'result' in data:
		data = fixData(data)
	return data


def create_insider_trade_URL(ticker, data_type='filers'):
	# data_type='filers' or 'issues'
	ticker = ticker.upper()
	url = 'http://edgaronline.api.mashery.com/v2/insiders/'
	data_type_str = data_type+'?'
	ticker_str = 'issuetickers='+ticker
	return url+data_type_str+ticker_str

def getInsiderTrades(ticker):
	ticker = ticker.upper()
	url = create_insider_trade_URL(ticker,'issues')
	data = getData(url)
	return data

def getInsiderSignal(ticker):
	data = getInsiderTrades(ticker)
	buy_signals = { 'raw': 0,'weighted': 0 }
	sell_signals = { 'raw': 0,'weighted': 0 }
	weights = {
		'Beneficial Owner (10%)':1,
		'Officer':.75,
		'Director':.5,
		'Other':.25
	}
	past_date = datetime.now() - timedelta(days=31*4)
	for row in data:
		print row
		date_object = datetime.strptime(row['transactiondate'], '%m/%d/%Y')
		if date_object > past_date:
			print row['filername'],row['transactiondate'],row['relationship'],row['transactiontype'],row['price']#,row['transactionpricefrom']
			# pp(row)
			if row['transactiontype'] in ['Buy', 'Acquisition (Non Open Market)', 'Automatic Buy']:
				buy_signals['raw']+=1
				buy_signals['weighted']+=1*weights[row['relationship']]
			if row['transactiontype'] in ['Sell', 'Disposition (Non Open Market)', 'Automatic Sell']:
				sell_signals['raw']+=1
				sell_signals['weighted']+=1*weights[row['relationship']]
	# print "signal:",buy_signals, sell_signals
	total = {
		'raw': max(buy_signals['raw']+sell_signals['raw'],1),
		'weighted': max(buy_signals['weighted']+sell_signals['weighted'],1)
	}
	signal = {
		'raw': float(buy_signals['raw'] - sell_signals['raw'])/float(total['raw']),
		'weighted': float(buy_signals['weighted'] - sell_signals['weighted'])/float(total['weighted']),
		'count': buy_signals['raw']+sell_signals['raw']
	}
	return signal

# start = datetime.now()
# print getInsiderSignal("CYTR")
# end = datetime.now()
# print end - start


