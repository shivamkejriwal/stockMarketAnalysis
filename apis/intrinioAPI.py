import json
import requests
import config as config

intrinio_API_USERNAME = config.intrinio_API_USERNAME
intrinio_API_PASSWORD = config.intrinio_API_PASSWORD

def getAuthorizedURL(url):
	AuthorizedURL = 'https://'+intrinio_API_USERNAME+':'+intrinio_API_PASSWORD+'@'+url
	return AuthorizedURL

def getData(url):
	# print "url:",getAuthorizedURL(url)
	response = requests.get(getAuthorizedURL(url))
	if 'Internal Server Error' in response.content:
		return {
					'error':'Internal Server Error',
					'data': None
				}
	json_data = response.content
	data = json.loads(json_data)
	return data



def getCompanyData(ticker):
	ticker = ticker.upper()
	url = 'www.intrinio.com/api/companies?ticker='+ticker
	data = getData(url)
	return data

def getCompanyNews(ticker):
	#can use ticker=AAPL,AMZN up to 10 tickers
	ticker = ticker.upper()
	url = 'www.intrinio.com/api/news?ticker='+ticker
	data = getData(url)
	return data

def create_financials_url(ticker,statement_type,year_str,fiscal_period_type):
	url = 'www.intrinio.com/api/financials/reported?'
	ticker = 'ticker='+ticker
	statement = '&statement='+statement_type
	fiscal_year = '&fiscal_year='+year_str
	fiscal_period ='&fiscal_period='+fiscal_period_type
	return url+ticker+statement+fiscal_year+fiscal_period

def getFinancials(ticker,year_str):
	ticker = ticker.upper()
	statement_types = ['income_statement','balance_sheet','cash_flow_statement']
	fiscal_periods = ['Q1','Q2','Q3','FY']
	result = {}
	for statement_type in statement_types:
		result[statement_type] = {}
		for period in fiscal_periods:
			url = create_financials_url(ticker,statement_type,year_str,period)
			data = getData(url)
			result[statement_type][period] = data['data']
	return result


# ========
# 	Main
# ========
# ticker = 'SCON'
# print getFinancials(ticker,'2015')
