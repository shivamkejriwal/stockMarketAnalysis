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
		self.industryDetails = {}
		self.currentDate = datetime.now().strftime("%Y-%m-%d")
		self.currentTime = datetime.now().strftime("%H-%M")

		Stock.stocksCount += 1

	def getBasicData(self):
		data_request_arr = ['p','j1','j2','j3','v','j4','p5','p6','t8']
		stockData = yahoo.getStockData(self.symbol,data_request_arr)
		self.basicData['price'] = stockData['market_value']
		self.basicData['volume'] = stockData['volume']
		self.basicData['shares_outstanding'] = stockData['shares_outstanding']
		self.basicData['market_capitalization'] = stockData['market_capitalization']
		self.basicData['yr_target_price'] = stockData['yr_target_price']
		# print "basicData : ", self.basicData

	def getFundamentals(self):
		# data_request_arr = ['j4','b4']
		# stockData = yahoo.getStockData(self.symbol,data_request_arr)
		# self.Fundamentals['EBITDA'] = stockData['EBITDA']
		# self.Fundamentals['book_value'] = stockData['book_value']
		self.Fundamentals['keyRatios_yearly'] = morningstar.getKeyRatios(self.symbol)
		self.Fundamentals['financials_yearly'] = morningstar.getFinancials(self.symbol,12)
		self.Fundamentals['financials_quaterly'] = morningstar.getFinancials(self.symbol,3)
		# print "Fundamentals  : ", self.Fundamentals

	def getTechnicals(self):
		data_request_arr = ['j1','j2','v','a2','m3', 'm4','b4','p5','p6']
		stockData = yahoo.getStockData(self.symbol,data_request_arr)
		# print stockData
		self.Technicals['price_to_book'] = stockData['price_to_book']
		self.Technicals['price_to_sales'] = stockData['price_to_sales']
		self.Technicals['ave_daily_volume'] = stockData['ave_daily_volume']
		self.Technicals['macd_200'] = stockData['macd_200']
		self.Technicals['macd_50'] = stockData['macd_50']
		# print "Technicals  : ", self.Technicals

	def getZacksOpinion(self):
		self.zacksOpinion = zacks.getZacksOpinion(self.symbol)
		# print "zacksOpinion : ", self.zacksOpinion

	def getEarnings(self):
		self.earningsData = zacks.getEarnings(self.symbol)
		# print "earningsData  : ", self.earningsData

	def getInsiderTransactions(self):
		self.insiderTransactions = zacks.getInsiderTransactions(self.symbol)
		# print "insiderTransactions  : ", self.insiderTransactions

	def getRecentSentiment(self):
		self.recentSentiment = stockTwits.getSentiment(self.symbol)
		# print "recentSentiment  : ", self.recentSentiment

	def setIndustryDetails(self,industryDetailList):
		name = self.zacksOpinion['Industry']
		self.industryDetails = industryDetailList[name]
		# print "industryDetails  : ", self.industryDetails

	def printData(self):
		if len(self.industryDetails.keys()) == 0:
			# print('Symbol\tIndustry\t\tZacks_Score(V,G,M)\tPrice\tMarketCap')
			template = '{0}\t{1:20}\t{2}-{3}({4},{5},{6})\t\t{7}\t{8}'
			print(template.format(self.symbol,self.zacksOpinion['Industry']
					,self.zacksOpinion["Rank"],self.zacksOpinion['Suggestion']
					,self.zacksOpinion['Style_Score']["Value"],self.zacksOpinion['Style_Score']["Growth"],self.zacksOpinion['Style_Score']["Momentum"]
					,self.basicData['price'],self.basicData['market_capitalization']))
		if len(self.industryDetails.keys()) > 0:
			# print('Symbol\tIndustry\t\tIndustry Rank(Z,A,W)\tZacks_Score(V,G,M)\tPrice\tMarketCap')
			template = '{0}\t{1:20}\t({2},{3},{4})\t\t{5}-{6}({7},{8},{9})\t\t{10}\t{11}'
			print(template.format(self.symbol,self.zacksOpinion['Industry']
					,self.industryDetails["rank"]['ByZacks'],self.industryDetails['rank']['ByAverage'],self.industryDetails['rank']['ByWeightedAverage']
					,self.zacksOpinion["Rank"],self.zacksOpinion['Suggestion']
					,self.zacksOpinion['Style_Score']["Value"],self.zacksOpinion['Style_Score']["Growth"],self.zacksOpinion['Style_Score']["Momentum"]
					,self.basicData['price'],self.basicData['market_capitalization']))



# stock = Stock('ACPW')
# # print stock.symbol
# stock.getZacksOpinion()
# stock.getEarnings()
# stock.getInsiderTransactions()
# stock.getRecentSentiment()
# stock.getBasicData()
# stock.getTechnicals()
# stock.printData()


