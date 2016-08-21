import decimal
from datetime import datetime
from pprint import pprint as pp
from apis import yahooFinanceAPI as yahoo
from apis import zacksAPI as zacks
from apis import stockTwitsAPI as stockTwits
from apis import morningstarAPI as morningstar

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

	def getBasicData(self):
		data_request_arr = ['p','j1','j2','v','j4','p5','p6','t8']
		stockData = yahoo.getStockData(self.symbol,data_request_arr)
		# print stockData
		self.basicData['price'] = stockData['market_value']
		self.basicData['volume'] = stockData['volume']
		self.basicData['shares_outstanding'] = stockData['shares_outstanding']
		self.basicData['market_capitalization'] = stockData['market_capitalization']
		self.basicData['yr_target_price'] = stockData['yr_target_price']

		print "basicData : ", self.basicData

	def getFundamentals(self):
		# data_request_arr = ['j4','b4']
		# stockData = yahoo.getStockData(self.symbol,data_request_arr)
		# self.Fundamentals['EBITDA'] = stockData['EBITDA']
		# self.Fundamentals['book_value'] = stockData['book_value']
		self.Fundamentals['keyRatios_yearly'] = morningstar.getKeyRatios(self.symbol)
		self.Fundamentals['financials_yearly'] = morningstar.getFinancials(self.symbol,12)
		self.Fundamentals['financials_quaterly'] = morningstar.getFinancials(self.symbol,3)

		print "Fundamentals  : ", self.Fundamentals

	def getTechnicals(self):
		data_request_arr = ['j1','j2','v','a2','m3', 'm4','b4','p5','p6']
		stockData = yahoo.getStockData(self.symbol)
		self.Technicals['price_to_book'] = stockData['price_to_book']
		self.Technicals['price_to_sales'] = stockData['price_to_sales']
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

# stock  = Stock('GSS')
# print stock.symbol
# stock.getZacksOpinion()
# stock.getEarnings()
# stock.getInsiderTransactions()
# stock.getRecentSentiment()
# stock.getBasicData()
