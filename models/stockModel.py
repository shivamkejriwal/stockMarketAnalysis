import decimal
from datetime import datetime,timedelta
from pprint import pprint as pp
from apis import yahooFinanceAPI as yahoo
from apis import zacksAPI as zacks
from apis import stockTwitsAPI as stockTwits
from apis import morningstarAPI as morningstar
from pprint import pprint as pp


def fixDecimal(value,limit):
	if value == None:
		return None
	result = decimal.Decimal(value)
	result = round(result,limit)
	return result

def getDivData(string):
	# print string
	start_str = 'tooltip.show('
	start_index = string.find(start_str)
	end_index = string.find(')',start_index)
	start_index = start_index+len(start_str)
	# print string[start_index+1:end_index-1]
	return string[start_index+1:end_index-1]

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
		data_request_arr = ['j1','j2','v','a2','m3', 'm4','b4','p5','p6','k','j']
		stockData = yahoo.getStockData(self.symbol,data_request_arr)
		# print stockData
		self.Technicals['price_to_book'] = stockData['price_to_book']
		self.Technicals['price_to_sales'] = stockData['price_to_sales']
		self.Technicals['ave_daily_volume'] = stockData['ave_daily_volume']
		self.Technicals['macd_200'] = stockData['macd_200']
		self.Technicals['macd_50'] = stockData['macd_50']
		self.Technicals['52_week_high'] = stockData['52_week_high']
		self.Technicals['52_week_low'] = stockData['52_week_low']
		# print "Technicals  : ", self.Technicals

	def getZacksOpinion(self):
		self.zacksOpinion = zacks.getZacksOpinion(self.symbol)
		# print "zacksOpinion : ", self.zacksOpinion

	def getEarnings(self):
		self.earningsData = zacks.getEarnings(self.symbol)
		# print "earningsData  : ", self.earningsData

	def getInsiderTransactions(self):
		insiderTransactions = zacks.getInsiderTransactions(self.symbol)
		fourMonthsBack = datetime.now() - timedelta(days=31*4)

		weights = {
			'Director': .1,
			'Other': .05,
			'FormerChiefFinancialOfficer': .2,
			'GeneralCounselandSVP': .2,
			'GeneralCounselandSecretary':.2,
			'PrincipalAccountingOfficer':.2,
			'VicePresident':.2,
			'VicePresident-Geosciences':.2,
			'ChiefOperatingOfficer': .2,
			'V.P.,IntellectualProperty':.2,
			'VP,ClinicalandRegAffairs':.2,
			'SVP,Ops&BusDev':.2,
			'SeniorVicePresident&CFO': .4,
			'SRVPofR&DandCSO': .3,
			'SrVP&SrMedDirector': .3,
			'PresidentofR&D':.3,
			'ExecutiveVicePresident&COO': .4,
			'ExecutiveVPandCFO/COO':.4,
			'ChiefFinancialOfficer': .4,
			'CFOandCorporateSecretary':.4,
			'Treasurer&Exec.VP,Finance':.4,
			'SVP,CFO,TREAS.&SECRETARY':.4,
			'CFO,SrV.P.Operations&Sec.':.4,
			'CFOandCAO': .4,
			'CEO&President':.5,
			'PresidentandCOO':.5,
			'PresidentandCEO': .5,
			'President&CEO': .5,
			'ChiefExecutiveOfficer':.5
		}

		if 'data' not in insiderTransactions['buys']:
			insiderTransactions['buys']['data'] = []
		if 'data' not in insiderTransactions['sells']:
			insiderTransactions['sells']['data'] = []

		buys = insiderTransactions['buys']['data']
		sells = insiderTransactions['sells']['data']

		# print buys
		# print sells

		buyDetails = { 'Price':0,'Count':0, 'WeightedCount':0 }
		sellDetails = { 'Price':0,'Count':0, 'WeightedCount':0 }
		for transaction in buys:
			if 'Tran_Date' not in transaction:
				continue
			date_object = datetime.strptime(transaction['Tran_Date'], '%m/%d/%Y')
			if date_object > fourMonthsBack:
				# print transaction
				# print transaction['Tran_Date']
				buyer = transaction['Relationship_Title']
				if '<' in buyer:
					buyer = getDivData(buyer)
				# print buyer
				buyDetails['Count']+=1
				if buyer in weights:
					buyDetails['WeightedCount']+=1*weights[buyer]
				else:
					print "buyer:", buyer
				buyDetails['Price']+=fixDecimal(transaction['Price'],3)
		if buyDetails['Count']>0:
			buyDetails['Price']=buyDetails['Price']/buyDetails['Count']
			buyDetails['Price']=fixDecimal(buyDetails['Price'],3)

		for transaction in sells:
			if 'Tran_Date' not in transaction:
				continue
			date_object = datetime.strptime(transaction['Tran_Date'], '%m/%d/%Y')
			if date_object > fourMonthsBack:
				# print transaction
				# print transaction['Tran_Date']
				seller = transaction['Relationship_Title']
				if '<' in seller:
					seller = getDivData(seller)
				# print seller
				sellDetails['Count']+=1
				if seller in weights:
					sellDetails['WeightedCount']+=1*weights[seller]
				else:
					print "seller:", seller
				sellDetails['Price']+=fixDecimal(transaction['Price'],3)
		if sellDetails['Count']>0:
			sellDetails['Price']=sellDetails['Price']/sellDetails['Count']
			sellDetails['Price']=fixDecimal(sellDetails['Price'],3)


		# print buyDetails
		# print sellDetails
		self.insiderTransactions = {
			'buys' : buyDetails,
			'sells' : sellDetails
		}
		# pp(self.insiderTransactions)
		# print "insiderTransactions  : ", self.insiderTransactions

	def getRecentSentiment(self):
		self.recentSentiment = stockTwits.getSentiment(self.symbol)
		# print "recentSentiment  : ", self.recentSentiment

	def setIndustryDetails(self,industryDetailList):
		name = self.zacksOpinion['Industry']
		self.industryDetails = industryDetailList[name]
		# print "industryDetails  : ", self.industryDetails

	def printData(self):

		zacksStr = '{0}-{1}({2},{3},{4})'.format(self.zacksOpinion["Rank"],self.zacksOpinion['Suggestion']
				,self.zacksOpinion['Style_Score']["Value"],self.zacksOpinion['Style_Score']["Growth"]
				,self.zacksOpinion['Style_Score']["Momentum"])
		
		sentimentStr = '({0},{1},{2})'.format(self.recentSentiment['total'],self.recentSentiment['Bullish']
				,self.recentSentiment['Bearish'])

		insiderStr = '({0},{1},{2}):({3},{4},{5})'.format(self.insiderTransactions['buys']['Count'],self.insiderTransactions['buys']['Price']
				,self.insiderTransactions['buys']['WeightedCount']
				,self.insiderTransactions['sells']['Count'],self.insiderTransactions['sells']['Price']
				,self.insiderTransactions['sells']['WeightedCount'])

		if len(self.industryDetails.keys()) == 0:
			# print('Symbol\tIndustry\t\tZacks_Score(V,G,M)\tPrice\tMarketCap\tBeta\tSentiment(To,Bu,Be)\tInsider Transactions')
			template = '{0}\t{1:20}\t{2:20}\t{3}\t{4}\t{5}\t{6:20}\t{7}'
			print(template.format(self.symbol,self.zacksOpinion['Industry']
					,zacksStr,self.basicData['price'],self.basicData['market_capitalization']
					,self.zacksOpinion['Beta'],sentimentStr,insiderStr))
		if len(self.industryDetails.keys()) > 0:
			# print('Symbol\tIndustry\t\tIndustry Rank(Z,A,W)\tZacks_Score(V,G,M)\tPrice\tMarketCap\tBeta\tSentiment(To,Bu,Be)\tInsider Transactions')
			template = '{0}\t{1:20}\t({2},{3},{4})\t\t{5:20}\t{6}\t{7}\t{8}\t{9:20}\t{10}'
			print(template.format(self.symbol,self.zacksOpinion['Industry']
					,self.industryDetails["rank"]['ByZacks'],self.industryDetails['rank']['ByAverage']
					,self.industryDetails['rank']['ByWeightedAverage']
					,zacksStr,self.basicData['price'],self.basicData['market_capitalization'],self.zacksOpinion['Beta']
					,sentimentStr,insiderStr))


# industryRanks = zacks.getIndustryRanks()
# stock = Stock('fes')
# # print stock.symbol
# stock.getZacksOpinion()
# stock.getEarnings()
# stock.getInsiderTransactions()
# stock.getRecentSentiment()
# stock.getBasicData()
# stock.getTechnicals()
# stock.setIndustryDetails(industryRanks)
# stock.printData()


