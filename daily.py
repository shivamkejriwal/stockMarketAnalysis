import config as config
from apis import zacksAPI as zacks
from apis import stockTwitsAPI as stockTwits
from apis import yahooFinanceAPI as yahoo
from services import dataETL as dataETL
from models import portfolioModel as portfolio
from models import stockModel as StockModel
from pprint import pprint as pp
import itertools

skipList = config.skipList
# zacksTickerList = config.zacksTickerList


def isValidStock(basicData):
	price = ''
	if 'price' in basicData:
		price = basicData['price']
	else:
		price = basicData['market_value']
	marketCap = basicData['market_capitalization']
	if price > 5 : return False
	if price < 1 : return False
	if marketCap < 1000000 : return False
	return True

def isValidRank(zacks_opinion):
	rank = zacks_opinion["Rank"]
	validRanks = [1, 2, 3]
	if rank not in  validRanks:
		return  False
	return True


def isGoodStock(zacks_opinion):
	valueScore = zacks_opinion["Style_Score"]["Value"]
	growthScore = zacks_opinion["Style_Score"]["Growth"]
	validScores = ['A', 'B']

	if not isValidRank(zacks_opinion):
		return False

	if valueScore not in  validScores:
		return  False
	if growthScore not in  validScores: 
		return  False
	return True


def isGrowthStock(zacks_opinion):
	growthScore = zacks_opinion["Style_Score"]["Growth"]
	validScores = ['A', 'B']
	if not isValidRank(zacks_opinion):
		return False
	if growthScore not in  validScores: 
		return  False
	return True

def isUnderValuedStock(zacks_opinion):
	valueScore = zacks_opinion["Style_Score"]["Value"]
	validScores = ['A', 'B']
	if not isValidRank(zacks_opinion):
		return False
	if valueScore not in  validScores:
		return  False
	return True

def isMomentumStock(zacks_opinion):
	momentumScore = zacks_opinion["Style_Score"]["Momentum"]
	validScores = ['A', 'B']
	if not isValidRank(zacks_opinion):
		return False
	if momentumScore not in  validScores: 
		return  False
	return True


def hasGoodEarnings(earningsData):
	if earningsData['Earnings']['past_surprise']<0:
		return False
	return True

def hasPositiveRevisions(earningsData):
	pos_rev = earningsData['Revisions']['pos_revs']
	neg_rev = earningsData['Revisions']['neg_revs']
	ave_change = earningsData['Revisions']['ave_change']
	if pos_rev<neg_rev:
		return False
	if ave_change < 0:
		return False
	return True

def hasPositiveInsiderSignal(insiderTransactions):
	buys = insiderTransactions['buys']['Count']
	sells = insiderTransactions['sells']['Count']
	if sells > buys:
		return False
	return True

def hasPositiveGrowth(Analysis, growth_multiple=1):
	by_PE = None
	by_ReturnOnCapital = None
	keys = Analysis['growth_multiple'].keys()
	if 'by_PE' in keys:
		by_PE = Analysis['growth_multiple']['by_PE']
	if 'by_ReturnOnCapital' in keys:
		by_ReturnOnCapital = Analysis['growth_multiple']['by_ReturnOnCapital']
	if by_PE == None and by_ReturnOnCapital == None:
		return False

	if by_ReturnOnCapital!= None and by_ReturnOnCapital < growth_multiple:
		return False

	if by_PE != None and by_PE < growth_multiple:
		return False

	# if by_PE == None or by_PE < growth_multiple:
	# 	return False

	return True



def stockFilter(stock):
	stock.getZacksOpinion()
	validRank = isValidRank(stock.zacksOpinion)
	goodStock = isGoodStock(stock.zacksOpinion)
	growthStock = isGrowthStock(stock.zacksOpinion)
	underValuedStock = isUnderValuedStock(stock.zacksOpinion)
	momentumStock = isMomentumStock(stock.zacksOpinion)
	count = stock.stocksCount
	starStr = '*'*len(str(count))


	template = '({0}) {1:5}\t=== {2}'
	if not goodStock or not validRank:
		print template.format(count,stock.symbol,"Bad Stock")
		return False
	else:
		print template.format(count,stock.symbol,"Potential Stock")

	template = '({0}) {1:5}\t====> {2}'
	stock.getBasicData()
	if stock.basicData['price'] == None:
		print template.format(starStr,stock.symbol,"No Price Data")
		return False
	# if not isValidStock(stock.basicData):
	# 	print stock.symbol, "\t====> Not Valid Stock"
	# 	return False

	stock.getEarnings()
	if not hasGoodEarnings(stock.earningsData):
		print template.format(starStr,stock.symbol,"Bad Earnings Data") 
		return False
	if not hasPositiveRevisions(stock.earningsData):
		print template.format(starStr,stock.symbol,"Bad Positive Revisions Data")
		return False

	stock.getInsiderTransactions()
	if not hasPositiveInsiderSignal(stock.insiderTransactions):
		print template.format(starStr,stock.symbol,"Bad Insider Data")
		return False

	stock.getFinancials()
	stock.getAnalysis()
	if not hasPositiveGrowth(stock.Analysis, 1):
		print template.format(starStr,stock.symbol,"Bad Growth Data")
		return False

	return True



def getShortlist(symbols,industryRanks=None):
	print "\n==================\nGetting Short List\n==================\n"

	count = len(symbols)
	print "Number of Stocks being Analyzed:",count

	result = {
		'valueAndGrowth' : [],
		'growth' : [],
		'underValued' : [],
		'momentum' : [],
		'complete' : []
	}

	for symbol in symbols:
		stock  = StockModel.Stock(symbol)
		if stockFilter(stock):
			if industryRanks != None:
				stock.setIndustryDetails(industryRanks)
			stock.getRecentSentiment()
			# stock.getTechnicals()
			result['complete'].append(stock)

	# print "skipList:",skipList
	return result

def printList(stockList, listName=None):
	print "Printing List : ", listName
	print "Stocks in list : ", len(stockList)
	# symbols = [stock.symbol for stock in stockList]
	# print symbols

	print('Symbol\tIndustry\t\tIndustry Rank(Z,A,W)\tZacks_Score(V,G,M)\tPrice\tMarketCap\tBeta\tSentiment(To,Bu,Be)\tInsider Transactions\tEarningsSurprise(Last,Past5) - Revision(pos,neg,ave)')
	print('\t\t\t======>\tTarget Price(by_ReturnOnCapital,by_PE): Growth Multiple(by_ReturnOnCapital,by_PE)\tDebt Ratios(CapitalizationRatio,DebtRatio,Debt_to_equity)\nValuation Ratios(ps_ratio,ProfitMarginRatio,AssetUtilizationRatio)\n')
	for stock in stockList:
		# print stock.symbol
		stock.printData()
		# print stock.symbol,stock.basicData['price'],stock.zacksOpinion,stock.recentSentiment

def chunks(l, n):
	"""Yield successive n-sized chunks from l."""
	data = []
	for i in range(0, len(l), n):
		data.append(l[i:i + n])
	return data

def getTickerListFromNasdaq():
	data = dataETL.getExchangeData(convert=True)
	# print len(data["Symbol"].tolist())
	filters = {
		'min_MarketCap':1000000, # $1,000,000 Mil
		'max_LastSale':1.00,
		'min_LastSale':.10,
	}
	data = dataETL.filterData(filters=filters, data=data)
	symbols = data["Symbol"].tolist()
	for i in range(len(symbols)):
		symbols[i] = symbols[i].replace(" ", "")	
	for ticker in skipList:
		if ticker in symbols:
			symbols.remove(ticker)

	return symbols

def getTickerList():
	zacksTickerList = config.zacksTickerList
	data_err = ['j1','j2','x']
	veto_exchanges = ['PNK', '/', 'OBB']
	dataList = []
	print "Zacks ticker list:", len(zacksTickerList)
	for chunk in chunks(zacksTickerList,500):
		# print "chunk"
		res = yahoo.getMultipleStockData(chunk,data_err)
		for obj in res:
			if obj['stock_exchange'] not in veto_exchanges and isValidStock(obj): 
				dataList.append(obj)

	print "Found prospective stocks:", len(dataList)

	symbols = []

	for ticker in dataList:
		symbols.append(ticker['symbol'])

	return symbols

def doJob(symbols=None, getIndustry=False):
	industryRanks = None

	if symbols == None:
		symbols = getTickerList()
	if getIndustry == True:
		industryRanks = zacks.getIndustryRanks()
		sortedByZacksRank = sorted(industryRanks.values(), key=lambda obj: obj['rank_weighted_average'], reverse=True)
		pp(sortedByZacksRank)

	shortList = getShortlist(symbols,industryRanks)
	sortedByPrice = sorted(shortList['complete'], key=lambda stock: stock.basicData['price'])
	printList(sortedByPrice, 'Potential Stock List')



# symbols = ['ACPW', 'ATEC', 'AMRS', 'APRI', 'BIOC', 'BIOD', 'BLIN'
# 		, 'CPRX', 'CYTR', 'ETRM', 'GNVC', 'NVCN', 'ORIG', 'PPHM'
# 		, 'REXX', 'SGNL', 'ANY', 'SSH', 'WGBS', 'XOMA', 'BAS', 'BXE', 'HK'
# 		, 'ROX', 'LODE', 'DNN', 'ESNC', 'GMO', 'AUMN', 'GSS', 'IMUC', 'NSPR'
# 		, 'JRJR', 'LIQT', 'NCQ', 'PTN', 'PLM', 'PLX', 'RNN', 'XPL', 'TGB'
# 		, 'TGD', 'TAT', 'HTM']

# symbols = ['VEND', 'HK', 'CTIC', 'NEPH'
# 		, 'CMLS', 'INVS', 'BIOD', 'TGB', 'GEVO', 'SGNL', 'NCQ', 'XOMA', 'REXX', 'GNVC', 'AUMN'
# 		, 'GSS', 'XPL', 'SSH', 'PBMD', 'BLRX', 'LIQT', 'ROX', 'BCEI', 'WGBS', 'FCSC', 'RMGN']

# symbols = ['SXE', 'SORL', 'JTPY', 'PFMT', 'LEE', 'CIG', 'HLTH', 'PRTS', 'EXTR', 'DXYN', 'HCHC']
# symbols = ['PFMT', 'LEE', 'HLTH', 'PRTS']
# symbols = ['PFMT', 'DVD', 'CRNT', 'LEE', 'EXFO', 'HLTH', 'PIR', 'IEC', 'FIG', 'DRAD', 'PRTS', 'ELMD', 'STB', 'AUDC', 'MPX', 'TLYS', 'SIM']
# symbols = ['atec', 'gss', 'rox', 'lee','cmls','hlth']

# industryRanks = None
# industryRanks = zacks.getIndustryRanks()
# sortedByZacksRank = sorted(industryRanks.values(), key=lambda obj: obj['rank_weighted_average'], reverse=True)
# pp(sortedByZacksRank)
# symbols = getTickerList()

# print symbols
# shortList = getShortlist(symbols,industryRanks)
# sortedByPrice = sorted(shortList['complete'], key=lambda stock: stock.basicData['price'])
# printList(sortedByPrice, 'Potential Stock List')

# current_portfolio = portfolio.getCurrentPortfolio(config.portfolio)
# portfolio.printPortfolio(current_portfolio)
# getShortList()

# doJob(None,True)



