import requests
import pandas as pd
from pandas_datareader import data as pd_data
from pprint import pprint as pp
import decimal

mapping = {
	'a':'ask',
	'b':'bid',
	'p':'prev_close',
	'o':'open',
	'v':'volume',
	'a2':'ave_daily_volume',
	'e':'eps',
	'e7':'eps_estimate_current_yr',
	'e8':'eps_estimate_next_yr',
	'e9':'eps_estimate_next_quarter',
	'b4':'book_value',
	'j4':'EBITDA',
	's1':'shares_owned',
	'j1':'market_capitalization',
	'j2':'shares_outstanding',
	'r':'PE_ratio',
	'r5':'PEG_ratio',
	'r6':'price_eps_current_yr',
	'r7':'price_eps_next_yr',
	't8':'1_yr_target_price',
	'm3':'macd_50',
	'm4':'macd_200',
	'p5': 'price_to_sales',
	'p6': 'price_to_book'
}

def createURL(symbol,data_arr):
	data_str = ''
	for value in data_arr:
		data_str+=value

	url = "http://finance.yahoo.com/d/quotes.csv?"
	ticker = "s="+symbol.upper()
	data = "&f="+data_str
	return url+ticker+data

def getData(url,data_arr):
	# df = pd.read_csv(url, encoding='utf-16', header=None)
	result = {}
	response = requests.get(url)
	content = response.content.replace('\t', '').replace('\n', '')
	data = content.split(',')
	for index in  range(len(data_arr)):
		key = mapping[data_arr[index]]
		value = data[index]
		if value == 'N/A':
			value = None
		else:
			mult = 1
			if value[-1] =='M':
				value = value[:-1]
				mult = 1000000
			if value[-1] =='B':
				value = value[:-1] 
				mult = 1000000000
			value = float(value)*mult
		result[key]=value
	return result

def getFairValue(data):
	# if data['PE_ratio'] == None or 'eps' == None:
	# 	return None
	if data['PE_ratio'] == None:
		data['PE_ratio'] = data['prev_close']/data['eps']
	pe = data['PE_ratio']
	eps = data['eps']
	fair_value = pe*eps
	return fair_value

def getMarketValue(data):
	m_cap = data['market_capitalization']
	shares = data['shares_outstanding']
	market_value = m_cap/shares
	market_value = decimal.Decimal(market_value)
	market_value = round(market_value,4)
	return market_value

# ticker = "scon"
# # data_arr = ['a','b','o','e','e7','e8','e9','r','r5','r6','r7','t8','p']
# data_arr = mapping.keys()
# url = createURL(ticker,data_arr)
# data = getData(url,data_arr)
# # pp(data)
# data["fair_value"] = getFairValue(data)
# data["market_value"] = getMarketValue(data)
# pp(data)



