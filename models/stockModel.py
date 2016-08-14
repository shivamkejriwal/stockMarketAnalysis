import decimal
from datetime import datetime
from pprint import pprint as pp
from apis import yahooFinanceAPI as yahoo
from apis import zacksAPI as zacks
from apis import stockTwitsAPI as stockTwits

class Stock:
	'A basic model for stock data'
	stocksCount = 0

	def __init__(self, symbol):
		self.symbol = symbol.upper()
		self.currentPrice = 0
		self.Sector = ''
		self.Industry = ''
		self.zacksOpinion = {}
		self.Fundamentals = {}
		self.earningsData = {}
		self.insiderTransactions = {}
		self.recentSentiment = {}
		self.currentDate = datetime.now()

		Stock.stocksCount += 1
   
	def getCurrentPrice(self):
		self.currentDate = datetime.now()
		print "CurrentPrice : ", self.currentPrice

	def getFundamentals(self):
		print "Fundamentals  : ", self.Fundamentals

	def getZacksOpinion(self):
		print "zacksOpinion : ", self.zacksOpinion

	def getEarnings(self):
		print "earningsData  : ", self.earningsData 

	def getInsiderTransactions(self):
		print "insiderTransactions  : ", self.insiderTransactions 

	def getRecentSentiment(self):
		print "insiderTransactions  : ", self.recentSentiment 