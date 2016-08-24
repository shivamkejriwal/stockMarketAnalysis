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
	'j3':'market_capitalization_realtime',
	'f6':'float_shares',
	'r':'PE_ratio',
	'r2':'PE_ratio_realtime',
	'r5':'PEG_ratio',
	'r6':'price_eps_current_yr',
	'r7':'price_eps_next_yr',
	't8':'1_yr_target_price',
	'm3':'macd_50',
	'm4':'macd_200',
	'p5':'price_to_sales',
	'p6':'price_to_book',
	's6':'revenue',
	't8': 'yr_target_price',
	'x': 'stock_exchange',
	'k' : '52_week_high',
	'j' : '52_week_low'
}

def fixDecimal(value):
	result = decimal.Decimal(value)
	result = round(result,4)
	return result

def createURL(symbol,data_arr):

	url = "http://finance.yahoo.com/d/quotes.csv?"


	ticker_str = ''
	if isinstance(symbol, list):
		for ticker in symbol:
			ticker_str+=','+ticker
	else:
		ticker_str = symbol


	data_str = ''
	for value in data_arr:
		data_str+=value

	
	ticker = "s="+ticker_str.upper()
	data = "&f="+data_str
	return url+ticker+data

def cleanData(contentLineStr, data_arr):
	result = {}
	data = contentLineStr.split(',')
	for index in  range(len(data_arr)):
		key = mapping[data_arr[index]]
		value = data[index]
		if key != 'stock_exchange':
			# print value
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
		else:
			value = value[1:-1]
		result[key]= str(value)
	return result

def getData(url,data_arr):
	# df = pd.read_csv(url, encoding='utf-16', header=None)
	result = {}
	response = requests.get(url)
	content = response.content.replace('\t', '').replace('\n', '')
	result = cleanData(content, data_arr)
	return result



def getPE_ratio(data):
	eps = data['eps']
	pe = data['PE_ratio']
	if pe == None:
		pe = data['prev_close']/eps
		pe = fixDecimal(pe)
	return pe

def getFairValue(data):
	eps = data['eps']
	pe = data['PE_ratio']
	fair_value = pe*eps
	fair_value = fixDecimal(fair_value)
	return fair_value

def getFairValue_estimates(data):
	keys = ['','_estimate_current_yr','_estimate_next_quarter','_estimate_next_yr']
	fair_value = {
		'fair_value':None,
		'fair_value_current_yr':None,
		'fair_value_next_quarter':None,
		'fair_value_next_yr':None,
	}
	for key in keys:
		eps = data['eps'+key]
		pe = data['PE_ratio']
		value = pe*eps
		value = fixDecimal(value)
		key  = key.replace('_estimate','')
		fair_value['fair_value'+key] = value
	return fair_value

def getMarketValue(data):
	# print data
	if 'market_capitalization' not in data or 'shares_outstanding' not in data:
		return None

	if data['market_capitalization'] == None or data['shares_outstanding'] == None:
		return None

	if data['market_capitalization'] == None or data['market_capitalization'] == 'None':
		return None

	if data['shares_outstanding'] == None or data['shares_outstanding'] == 'None':
		return None

	# print "----", data
	m_cap = fixDecimal(data['market_capitalization'])
	shares = fixDecimal(data['shares_outstanding'])
	# print m_cap,shares
	market_value = m_cap/shares
	market_value = fixDecimal(market_value)
	return market_value

def getPriceToBook(data):
	if 'market_value' not in data or 'book_value' not in data:
		return None

	if data['market_value'] == None or data['book_value'] == None:
		return None

	market_value = data['market_value']
	book_value = data['book_value']
	priceToBook = market_value/book_value
	priceToBook = fixDecimal(priceToBook)
	return priceToBook

def getStockData(ticker, data_arr=None):
	if data_arr == None:
		data_arr = ['a','b','o','p','j1','j2','v','a2','m3', 'm4','b4','j4', 'x']
	url = createURL(ticker,data_arr)
	data = getData(url,data_arr)
	# print data
	if 'j1' in data_arr and 'j2' in data_arr:
		data["market_value"] = getMarketValue(data)
	if 'price_to_book' in data and data['price_to_book'] == None:
		data['price_to_book'] = getPriceToBook(data)
	return data


def getMultiLineData(url,data_arr):
	result = []
	response = requests.get(url)
	content = response.content.replace('\t', '')#.replace('\n', '')
	# print content
	for line in content.splitlines():
		data = cleanData(line, data_arr)
		data["market_value"] = getMarketValue(data)
		result.append(data)
	return result

def getMultipleStockData(tickerList, data_arr=None):
	if data_arr == None:
		data_arr = ['a','b','o','p','j1','j2','v','a2','m3', 'm4','b4','j4']
	url = createURL(tickerList,data_arr)
	# print url
	data = getMultiLineData(url,data_arr)
	for index in range(len(data)):
		data[index]['symbol'] = tickerList[index]
	# print data
	return data

# def getEarningsEstimate(data):
# 	eps = data['eps']
# 	shares = data['shares_outstanding']
# 	earnings_estimate = eps*shares
# 	earnings_estimate = fixDecimal(earnings_estimate)
# 	return earnings_estimate

# ticker = "OMCM"
# data = getStockData(ticker)
# data['PE_ratio'] = getPE_ratio(data)
# data["fair_value"] = getFairValue(data)

# pp(data)
# pp(getFairValue_estimates(data))

# symbols = ['ACPW', 'ATEC', 'AMRS', 'APRI', 'BIOC', 'BIOD', 'BLIN']
# getMultipleStockData(symbols)



