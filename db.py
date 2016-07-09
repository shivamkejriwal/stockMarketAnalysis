from pymongo import MongoClient

# client = MongoClient('mongodb://127.0.0.1:27017')
client = MongoClient('mongodb://localhost')
db = client['stockmarket']
finacials = db['finacials']
stocks = db['stocks']


def saveFinacials(data,year):
	print "Saveing Finacials"

def getFinacials(ticker,year):
	print "Getting Finacials"

def saveStocks(ticker,date):
	print "Saveing Stocks"

def getStocks(ticker,date):
	print "Getting Stocks"