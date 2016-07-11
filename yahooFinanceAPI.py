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
	'r2':'PE_ratio_realtime',
	'r5':'PEG_ratio',
	'r6':'price_eps_current_yr',
	'r7':'price_eps_next_yr',
	't8':'1_yr_target_price',
	'm3':'macd_50',
	'm4':'macd_200',
	'p5':'price_to_sales',
	'p6':'price_to_book',
	's6':'revenue'
}

def fixDecimal(value):
	result = decimal.Decimal(value)
	result = round(result,4)
	return result

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

# def getMarketValue(data):
# 	m_cap = data['market_capitalization']
# 	shares = data['shares_outstanding']
# 	market_value = m_cap/shares
# 	market_value = fixDecimal(market_value)
# 	return market_value

# def getEarningsEstimate(data):
# 	eps = data['eps']
# 	shares = data['shares_outstanding']
# 	earnings_estimate = eps*shares
# 	earnings_estimate = fixDecimal(earnings_estimate)
# 	return earnings_estimate

ticker = "scon"
# data_arr = ['a','b','o','e','e7','e8','e9','r','r5','r6','r7','t8','p']
data_arr = mapping.keys()
url = createURL(ticker,data_arr)
data = getData(url,data_arr)
# data['PE_ratio'] = getPE_ratio(data)
# data["fair_value"] = getFairValue(data)

pp(data)
# pp(getFairValue_estimates(data))


