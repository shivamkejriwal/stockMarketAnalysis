import decimal
from datetime import datetime,timedelta
from pprint import pprint as pp
from apis import yahooFinanceAPI as yahoo
from apis import zacksAPI as zacks
from apis import zacksFinancialAPI as zacksFinancial
from apis import stockTwitsAPI as stockTwits
from apis import morningstarAPI as morningstar
from pprint import pprint as pp


def fixDecimal(value,limit):
	if value == None:
		return None
	if str(value) == 'NA':
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
		self.Analysis = {}
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
		# self.Fundamentals['keyRatios_yearly'] = morningstar.getKeyRatios(self.symbol)
		# self.Fundamentals['financials_yearly'] = morningstar.getFinancials(self.symbol,12)
		# self.Fundamentals['financials_quaterly'] = morningstar.getFinancials(self.symbol,3)
		data = zacksFinancial.getLatesDataset(self.symbol)
		for key,value in data.iteritems():
			self.Fundamentals[key] = value
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
		today = datetime.now()
		lastMonth = datetime.now() - timedelta(days=31)
		earningsData = zacks.getEarnings(self.symbol)

		# pp(earningsData['revisions_data'])
		# pp(earningsData)

		self.earningsData = {
			'Earnings': { 'last_surprise': 0,'past_surprise': 0 },
			'Revisions': { 'ave_change': 0, 'pos_revs': 0, 'neg_revs': 0 }
		}

		count = 0
		foundOne = False
		for surpise in earningsData['earnings_data'][:4]:
			if surpise['Surprise'] != None:
				if not foundOne:
					self.earningsData['Earnings']['last_surprise'] = surpise['Surprise']
					foundOne = True
				self.earningsData['Earnings']['past_surprise']+=surpise['Surprise']
				count+=1
		if count>0:
			self.earningsData['Earnings']['past_surprise'] = fixDecimal(self.earningsData['Earnings']['past_surprise']/count, 3)

		count = 0
		for surpise in earningsData['revisions_data']:
			previous = surpise['Previous']
			current = surpise['Current']
			isRecent = surpise['Period_Ending'] > today and surpise['Date'] > lastMonth
			# print surpise['Period_Ending'], surpise['Date'], isRecent
			if previous != None and current != None and isRecent:
				change = (current-previous)
				if abs(previous)!=0:
					change = change/abs(previous)
				# change = fixDecimal(change,3)
				if change > 0:
					self.earningsData['Revisions']['pos_revs']+=1
				if change < 0:
					self.earningsData['Revisions']['neg_revs']+=1
				# print previous, current, change
				self.earningsData['Revisions']['ave_change']+=change
				count+=1
		if count>0:
			self.earningsData['Revisions']['ave_change'] = fixDecimal(self.earningsData['Revisions']['ave_change']/count,3)

		# pp(self.earningsData)
		# print "earningsData  : ", self.earningsData

	def getAnalysis(self):
		self.Analysis['target_price'] = {
			'by_PE':None, 'by_RealisticGrowthRate': None
		}
		self.Analysis['growth_multiple'] = {
			'by_PE':None, 'by_RealisticGrowthRate': None
		}
		# Price x ((current P/E) / (forward P/E)) = future price (or price target)
		price = self.basicData['price']
		PE_Current = self.Fundamentals['pe_ratio']
		PE_Forward = self.zacksOpinion['PE_Forward']
		RealisticGrowthRate = self.Fundamentals['RealisticGrowthRate']
		if None not in [price, PE_Forward, PE_Current]:
			growth = float(PE_Current)/float(PE_Forward)
			target_price = price*growth
			self.Analysis['growth_multiple']['by_PE'] = fixDecimal(growth,3)
			self.Analysis['target_price']['by_PE'] = fixDecimal(target_price,3)
		if None not in [price, RealisticGrowthRate]:
			growth = (1+RealisticGrowthRate)
			target_price = price*growth
			self.Analysis['growth_multiple']['by_RealisticGrowthRate'] = fixDecimal(growth,3)
			self.Analysis['target_price']['by_RealisticGrowthRate'] = fixDecimal(target_price,3)

		# print "Analysis  : ", self.Analysis


	def getInsiderTransactions(self):
		insiderTransactions = zacks.getInsiderTransactions(self.symbol)

		# print insiderTransactions

		fourMonthsBack = datetime.now() - timedelta(days=31*4)

		weights = {
			'Director': .1,
			'Other': .05,
			'SeeRemarks': .05,
			'FormerChiefFinancialOfficer': .2,
			'VPAdmin': .2,
			'GeneralCounselandSVP': .2,
			'GeneralCounselandSecretary':.2,
			'PrincipalAccountingOfficer':.2,
			'EVP&ChiefLegalOfficer':.2,
			'VicePresident':.2,
			'VicePresident-Geosciences':.2,
			'ChiefOperatingOfficer': .2,
			'ChiefComplianceOfficer': .2,
			'EVP,ChiefOperatingOfficer': .2,
			'V.P.,IntellectualProperty':.2,
			'VP,ClinicalandRegAffairs':.2,
			'SVP,ChiefDevelopmentOfficer':.2,
			'SVP,ChiefBusinessOfficer':.2,
			'VPFinance&CAO': .2,
			'SVP,Ops&BusDev':.2,
			'SeniorVicePresident': .2,
			'VP-PresidentMaslandContract': .2,
			'EVP,ChiefMarketingOfficer': .2,
			'EVP&PresidentOnlineDiv': .2,
			'VPSpecialtySteelOperations': .2,
			'VPCarbonSteelOperations': .2,
			'VP,ResearchandInnovation': .2,
			'VPGenCounsel&CorpSec': .2,
			'VPLitigation,Labor&ExtAff': .2,
			'COO,RadiantGlobalLogistics': .2,
			'VP-ChiefTechnicalOfficer': .2,
			'VP--FilmandElectrolytics': .2,
			'SrVP,GeneralCounsel&Sec': .2,
			'SeniorVicePresident,Ceramic': .2,
			'VP-ChiefTechnicalOfficer': .2,
			'EVP-Planning&Allocations': .2,
			'Exec.VicePres.-Merchandising': .2,
			'ChiefAccountingOfficer': .2,
			'ChiefProductOfficer': .2,
			'SVP,Secretary,GenCounsel': .2,
			'ChiefMarketingOfficer': .2,
			'SVP,Operations': .2,
			'CorporateSecretary': .2,
			'VicePresident,Treasurer': .2,
			'SrVP&ChiefInfoOfficer': .2,
			'VicePresident,Treasurer': .2,
			'Sr.VP,ChiefGlobalDev.Ofc.': .2,
			'President,FinancialServices': .2,
			'Corp.Secretary': .2,
			'President,EmployeeServices': .2,
			'President,FinancialServices': .2,
			'Sr.VP,GeneralCounsel&CLO': .2,
			'Treasurer': .2,
			'Corp.Secretary': .2,
			'GeneralCounsel': .2,
			'SVP,GlobalSales': .2,
			'VP,CoreTechnologies': .2,
			'VicePresidentofOperations': .2,
			'SVP,CorpDevelopment&IR': .2,
			'VicePresident,Finance': .2,
			'SVPGerneralCounsel&Corpora': .2,
			'SVPofOperations': .2,
			'EVP,GC&Secretary': .2,
			'VICEPRESIDENTGLOBALPRODUCT': .2,
			'EVP,ChiefOperationsOfficer': .2,
			'GlobalBrandPresident-AE': .2,
			'GlobalBrandPresident-aerie': .2,
			'ExecVicePres/HumanResources': .3,
			'SVP-InforrmationServices': .3,
			'ExecVP-GlobalSupplyChain': .3,
			'EVPChiefFinancialOfficer': .3,
			'EVPWorldwideSalesServicesa': .3,
			'VP&ChiefFinancialOfficer': .3,
			'ExecutiveChairman':.3,
			'VP-Sales': .3,
			'SRVPofR&DandCSO': .3,
			'SrVP&SrMedDirector': .3,
			'PresidentofR&D':.3,
			'ChiefCommercialOfficer':.3,
			'VPQuality,CCO': .3,
			'VP--FilmandElectrolytics': .3,
			'SeniorVP,SalesMarketing': .3,
			'VP,ChiefHumanResources': .3,
			'VPQuality,CCO': .3,
			'VP,ChiefHumanResources': .3,
			'ExecutiveVPofOperations': .3,
			'ExecutiveVPandCFO': .3,
			'EVP-Compliance&GenCounsel': .3,
			'Exec.VicePres-Marketing': .3,
			'EVP-Planning&Allocations': .3,
			'VP&ChiefAccountingOfficer': .3,
			'SVPDevelopment': .3,
			'EVP,CFO&Treasurer': .4,
			'C.F.O.': .4,
			'CFO&Secretary': .4,
			'Exec.VPandCFO': .4,
			'ExecutiveVicePresident&CFO': .4,
			'ExecVPandCFO': .4,
			'EVP&CFO': .4,
			'EVP,ChiefFinancialOfficer': .4,
			'SVP,Controller&Treasurer': .4,
			'President&COO': .4,
			'ManagingDirector,Investments': .4,
			'ChiefMedicalOfficer': .4,
			'SeniorVicePresident&CFO': .4,
			'ExecutiveVicePresident&COO': .4,
			'CFO,Secretary,Treasurer': .4,
			'ExecutiveVPandCFO/COO':.4,
			'ChiefFinancialOfficer': .4,
			'CFOandCorporateSecretary':.4,
			'Treasurer&Exec.VP,Finance':.4,
			'SVP,CFO,TREAS.&SECRETARY':.4,
			'CFO,SrV.P.Operations&Sec.':.4,
			'CFOandTreasurer': .4,
			'CFOandCAO': .4,
			'CFO':.4,
			'President': .4,
			'SVP,CFO': .4,
			'CFO,ExecutiveVicePresident': .4,
			'President,ChairmanandCEO': .5,
			'Chairman,PresidentandCEO': .5,
			'ExecutiveVP,CFOandSec':.5,
			'President,RetailDivision': .5,
			'CFO,ExecutiveVicePresident':.5,
			'President,RetailDivision': .5,
			'President,EasternRetailOP': .5,
			'Chairman&CEO': .5,
			';President,COO,andCFO': .5,
			'President,EmployeeServices': .5,
			'President,FinancialServices': .5,
			'CEOandPresident': .5,
			'CEO&President':.5,
			'CEO&Secretary': .5,
			'PresidentandCOO':.5,
			'PresidentandCEO': .5,
			'President&CEO': .5,
			'ChiefExecutiveOfficer':.5,
			'CEO,CFOandPresident': .5,
			'CEO': .5
		}

		if insiderTransactions == None:
			insiderTransactions = {}

		# if insiderTransactions['buys'] == None :
			insiderTransactions['buys'] = {}
		if 'data' not in insiderTransactions['buys']:
			insiderTransactions['buys']['data'] = []

		# print insiderTransactions.keys()
		# print insiderTransactions['buys']

		if insiderTransactions['sells'] == None:
			insiderTransactions['sells'] = {}
		
		if  'data' not in insiderTransactions['sells']:
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
				value = fixDecimal(transaction['Price'],3)
				if value!= None:
					buyDetails['Price']+=value
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
				value = fixDecimal(transaction['Price'],3)
				if value != None:
					sellDetails['Price']+= value
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
		
		sentimentStr = ''
		if self.recentSentiment != None:
			sentimentStr = '({0},{1},{2})'.format(self.recentSentiment['total'],self.recentSentiment['Bullish']
					,self.recentSentiment['Bearish'])

		insiderStr = '({0},{1},{2}):({3},{4},{5})'.format(self.insiderTransactions['buys']['Count'],self.insiderTransactions['buys']['Price']
				,self.insiderTransactions['buys']['WeightedCount']
				,self.insiderTransactions['sells']['Count'],self.insiderTransactions['sells']['Price']
				,self.insiderTransactions['sells']['WeightedCount'])

		earningsStr = '({0}%, {1}%)'.format(self.earningsData['Earnings']['last_surprise'],self.earningsData['Earnings']['past_surprise'])
		revisionStr = '({0}, {1}, {2}%)'.format(self.earningsData['Revisions']['pos_revs']
				,self.earningsData['Revisions']['neg_revs'],self.earningsData['Revisions']['ave_change']*100)

		forcastStr = '({0},{1}):({2},{3})'.format(self.Analysis['target_price']['by_RealisticGrowthRate'],self.Analysis['target_price']['by_PE']
			,self.Analysis['growth_multiple']['by_RealisticGrowthRate'],self.Analysis['growth_multiple']['by_PE'])
		# print revisionStr

		if len(self.industryDetails.keys()) == 0:
			# print('Symbol\tIndustry\t\tZacks_Score(V,G,M)\tPrice\tMarketCap\tBeta\tSentiment(To,Bu,Be)\tInsider Transactions\tEarningsSurprise(Last,Past5) - Revision(pos,neg,ave)')
			template = '{0}\t{1:20}\t{2:20}\t{3}\t{4}\t{5}\t{6:20}\t{7}\t{8} - {9}\n\t\t\t======>\t{10}'
			print(template.format(self.symbol,self.zacksOpinion['Industry']
					,zacksStr,self.basicData['price'],self.basicData['market_capitalization']
					,self.zacksOpinion['Beta'],sentimentStr,insiderStr,earningsStr, revisionStr,forcastStr))
		if len(self.industryDetails.keys()) > 0:
			# print('Symbol\tIndustry\t\tIndustry Rank(Z,A,W)\tZacks_Score(V,G,M)\tPrice\tMarketCap\tBeta\tSentiment(To,Bu,Be)\tInsider Transactions\tEarningsSurprise(Last,Past5) - Revision(pos,neg,ave)')
			template = '{0}\t{1:20}\t({2},{3},{4})\t\t{5:20}\t{6}\t{7}\t{8}\t{9:20}\t{10:30}\t{11} - {12}\n\t\t\t======>\t{13}'
			print(template.format(self.symbol,self.zacksOpinion['Industry'][:20]
					,self.industryDetails["rank"]['ByZacks'],self.industryDetails['rank']['ByAverage']
					,self.industryDetails['rank']['ByWeightedAverage']
					,zacksStr,self.basicData['price'],self.basicData['market_capitalization'],self.zacksOpinion['Beta']
					,sentimentStr,insiderStr,earningsStr, revisionStr,forcastStr))


# industryRanks = zacks.getIndustryRanks()
# stock = Stock('hlth')

# print stock.symbol
# stock.getBasicData()
# stock.getZacksOpinion()
# stock.getEarnings()
# stock.getInsiderTransactions()
# stock.getRecentSentiment()
# stock.getFundamentals()
# stock.getAnalysis()
# stock.getTechnicals()
# stock.setIndustryDetails(industryRanks)
# stock.getEarnings()
# stock.printData()


