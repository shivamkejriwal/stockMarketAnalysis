from pymongo import MongoClient
import intrinioAPI as intrinio
from pprint import pprint as pp

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


# ticker = 'otiv'
# # year = '2015'
# years = ['2013','2014','2015','2016']
# for year in years:
# 	data = intrinio.getFinancials(ticker, year)
# 	saveFinacials(ticker, year, data)

# print gerReportsAvailable(ticker)
# print getCompanyList()

# results = getFinacials(ticker,year)
# pp(results[0])


