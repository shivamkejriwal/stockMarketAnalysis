import decimal
from datetime import datetime
from pprint import pprint as pp
from apis import yahooFinanceAPI as yahoo
from apis import zacksAPI as zacks
from apis import stockTwitsAPI as stockTwits

class Stock:
	'A basic model for stock data'
	stocksCount = 0

	def __init__(self, symbol, sector = '', industry = ''):
		self.symbol = symbol.upper()
		self.Sector = sector
		self.Industry = industry
		self.basicData = {}
		self.Fundamentals = {}
		self.Technicals = {}
		self.zacksOpinion = {}
		self.earningsData = {}
		self.insiderTransactions = {}
		self.recentSentiment = {}
		self.currentDate = datetime.now().strftime("%Y-%m-%d")
		self.currentTime = datetime.now().strftime("%H-%M")

		Stock.stocksCount += 1

	def getYahooData(self):
		stockData = yahoo.getStockData(self.symbol)
		print stockData
		self.basicData['price'] = stockData['market_value']
		self.basicData['volume'] = stockData['volume']
		self.basicData['shares_outstanding'] = stockData['shares_outstanding']
		self.basicData['market_capitalization'] = stockData['market_capitalization']
		self.basicData['EBITDA'] = stockData['EBITDA']

		print "basicData : ", self.basicData

	def getFundamentals(self):
		print "Fundamentals  : ", self.Fundamentals

	def getTechnicals(self):
		stockData = yahoo.getStockData(self.symbol)
		self.Technicals['ave_daily_volume'] = stockData['ave_daily_volume']
		self.Technicals['macd_200'] = stockData['macd_200']
		self.Technicals['macd_50'] = stockData['macd_50']

		print "Technicals  : ", self.Technicals

	def getZacksOpinion(self):
		self.zacksOpinion = zacks.getZacksOpinion(self.symbol)
		print "zacksOpinion : ", self.zacksOpinion

	def getEarnings(self):
		self.earningsData = zacks.getEarnings(self.symbol)
		print "earningsData  : ", self.earningsData

	def getInsiderTransactions(self):
		self.insiderTransactions = zacks.getInsiderTransactions(self.symbol)
		print "insiderTransactions  : ", self.insiderTransactions

	def getRecentSentiment(self):
		self.recentSentiment = stockTwits.getSentiment(self.symbol)
		print "recentSentiment  : ", self.recentSentiment

stock  = Stock('GSS')
print stock.symbol
# stock.getZacksOpinion()
# stock.getEarnings()
# stock.getInsiderTransactions()
# stock.getRecentSentiment()
stock.getBasicData()
