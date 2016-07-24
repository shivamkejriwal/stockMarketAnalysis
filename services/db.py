from pymongo import MongoClient
import apis.intrinioAPI as intrinio
from pprint import pprint as pp
import config as config


# client = MongoClient('mongodb://127.0.0.1:27017')
client = MongoClient('mongodb://localhost')
db = client['stockmarket']
finacials = db['finacials']
stocks = db['stocks']


def saveFinacials(ticker, year, data):
	print "Saveing Finacials"
	obj = {
		"ticker": ticker.upper(),
		"year": year,
		"data":data
	}
	pp(obj)
	response = finacials.insert_one(obj)
	print response

def getFinacials(ticker,year):
	print "Getting Finacials"
	query = {
		"ticker": ticker.upper(),
		"year": year
	}
	results = []
	for finacial in finacials.find(query):
		results.append(finacial)
	return results

def getCompanyList():
	print "Getting Company List"
	ticker_list = []
	for ticker in finacials.find().distinct('ticker'):
		ticker_list.append(str(ticker))
	return ticker_list

def gerReportsAvailable(ticker):
	print "Getting List of Reports Available"
	query = {
		"ticker": ticker.upper()
	}
	year_list = []
	for year in finacials.find(query).distinct('year'):
		year_list.append(str(year))
	return year_list

def saveStocks(ticker,date):
	print "Saveing Stocks"

def getStocks(ticker,date):
	print "Getting Stocks"


def refreshDBCompanyList():
	myTickerList =  config.portfolio.keys()
	savedTickerList = getCompanyList()
	years = ['2013','2014','2015','2016']
	for ticker in myTickerList:
		if ticker not in savedTickerList:
			# print ticker
			for year in years:
				data = intrinio.getFinancials(ticker, year)
				saveFinacials(ticker, year, data)

def cleanFinacials(dataList):
	results = []
	for data in dataList:
		result = {}
		result['data'] = {}
		result['year'] = data['year']
		result['ticker'] = data['ticker']
		result['_id'] = data['_id']

		for report_type in data['data']:
			result['data'][report_type] = {}
			for segment in data['data'][report_type]:
				report = data['data'][report_type][segment]
				obj = {}
				for item in report:
					key =  item['xbrl_tag']
					value = item['value']
					obj[key] = value
				result['data'][report_type][segment] = obj
		results.append(result)
	return results



# ticker = 'heb'
# years = ['2013','2014','2015','2016']
# for year in years:
# 	data = intrinio.getFinancials(ticker, year)
# 	saveFinacials(ticker, year, data)

# refreshDBCompanyList()
# print gerReportsAvailable(ticker)
# print getCompanyList()

# year = '2015'
# results = getFinacials(ticker,year)

# print results[0].keys()
# pp(results[0])
# data = cleanFinacials(results)
# pp(data)


