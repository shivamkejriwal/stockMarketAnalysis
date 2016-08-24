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
	if price > 1 : return False
	if price < .1 : return False
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

# def printData(data):
# 	print('IPOyear\tSymbol\tLastSale\tZacks_Score(V,G,M)\tMarketCap\tSector\t\t\tIndustry')
# 	# print "Headers:", data.columns.values
# 	template_small = '{0:7}\t{1:4}\t{2:6}\t\t{3}-{4}({5},{6},{7})\t\t{8:10}\t{9:20}\t\t{10:<}'
# 	template_big = '{0:7}\t{1:4}\t{2:6}\t\t{3}-{4}({5},{6},{7})\t{8:10}\t{9:20}\t\t{10:<}'
# 	for index, row in data.iterrows():
# 		template = template_small
# 		if row['zacks_rank']==1 or row['zacks_rank']==5:
# 			template = template_big 
# 		print(template.format(row['IPOyear'],row['Symbol'],row['LastSale']
# 			,row['zacks_rank'],row['zacks_suggestion']
# 			,row['zacks_score_Value'],row['zacks_score_Growth'],row['zacks_score_Momentum']
# 			,row['MarketCap'],row['Sector'],row['industry']))
# 
# def populateZacksResearch(data, max_rank=3):
#     symbols = data["Symbol"].tolist()
#     data["zacks_rank"] = ""
#     data["zacks_suggestion"] = ""
#     for symbol in symbols:
#         # rank, rank_type = crawler.getZacksRank(symbol)
#         zacks_opinion = zacks.getZacksOpinion(symbol)
#         rank = zacks_opinion["Rank"]
#         row_index = data[data["Symbol"] == symbol].index
#         if not isValidStock(zacks_opinion):
#             data = data.drop(row_index)
#         else :
#             data.set_value(row_index, 'zacks_rank', zacks_opinion["Rank"])
#             data.set_value(row_index, 'zacks_suggestion', zacks_opinion["Suggestion"])
#             data.set_value(row_index, 'zacks_score_Value', zacks_opinion["Style_Score"]["Value"])
#             data.set_value(row_index, 'zacks_score_Growth', zacks_opinion["Style_Score"]["Growth"])
#             data.set_value(row_index, 'zacks_score_Momentum', zacks_opinion["Style_Score"]["Momentum"])
#             sentiment = stockTwits.getSentiment(symbol)
#             if sentiment != None:
#             	sentiment_value = (sentiment["Bullish"]-sentiment["Bearish"])/ (sentiment["Bullish"]+sentiment["Bearish"])
#             	data.set_value(row_index, 'sentiment', sentiment_value)
#             print symbol, rank, zacks_opinion["Suggestion"], sentiment
#     return data
#
# def getShortList():
# 	print "\n=================\nBuying Short List\n=================\n"
# 	data = dataETL.getExchangeData(convert=True)
# 	filters = {
# 		'min_MarketCap':1000000, # $1,000,000 Mil
# 		'max_LastSale':1.00,
# 		'min_LastSale':.10,
# 	}
# 	print data.shape
# 	data = dataETL.filterData(filters=filters, data=data)
# 	print "Filtered:", data.shape
# 	data = populateZacksResearch(data)
# 	print "With Zacks Rank:",  data.shape
# 	data.sort(['MarketCap','LastSale'], ascending=[0, 0])
# 	printData(data)


def getShortlist(symbols):
	print "\n==================\nGetting Short List\n==================\n"

	print "Number of Stocks being Analyzed:",len(symbols)

	result = {
		'valueAndGrowth' : [],
		'growth' : [],
		'underValued' : [],
		'momentum' : [],
		'complete' : []
	}

	for symbol in symbols:
		stock  = StockModel.Stock(symbol)
		stock.getBasicData()
		
		# if not isValidStock(stock.basicData):
		# 	print stock.symbol, "\t=== Not Valid Stock"
		# 	continue


		stock.getZacksOpinion()
		if stock.zacksOpinion['Industry']==None:
			print stock.symbol, "\t=== No Zacks Data"
			# skipList.append(stock.symbol)
			continue

		goodStock = isGoodStock(stock.zacksOpinion)
		growthStock = isGrowthStock(stock.zacksOpinion)
		underValuedStock = isUnderValuedStock(stock.zacksOpinion)
		momentumStock = isMomentumStock(stock.zacksOpinion)

		if goodStock:
			result['valueAndGrowth'].append(stock)
		if growthStock:
			result['growth'].append(stock)
		if underValuedStock:
			result['underValued'].append(stock)
		if momentumStock:
			result['momentum'].append(stock)

		if growthStock or underValuedStock or momentumStock:
			print stock.symbol, "\t=== Potential Stock"
			# stock.getBasicData()
			stock.getEarnings()
			if stock.basicData['price'] == None:
				print stock.symbol, "\t====> No Price Data"
			elif not hasGoodEarnings(stock.earningsData):
				print stock.symbol, "\t====> Bad Earnings Data" 
			else:
				result['complete'].append(stock)
		else: 
			print stock.symbol, "\t=== Bad Stock"

	# print "skipList:",skipList
	return result


def doAnalysis(stockList, industryRanks, listName=None):
	print "Starting analysis on : ", listName
	print "Stocks in list : ", len(stockList)
	# symbols = [stock.symbol for stock in stockList]
	# print symbols

	print('Symbol\tIndustry\t\tIndustry Rank(Z,A,W)\tZacks_Score(V,G,M)\tPrice\tMarketCap\tBeta\tSentiment(To,Bu,Be)\tInsider Transactions\tEarningsSurprise(Last,Past5)')
	for stock in stockList:
		# print stock.symbol
		stock.setIndustryDetails(industryRanks)
		stock.getFundamentals()
		stock.getTechnicals()
		stock.getInsiderTransactions()
		stock.getRecentSentiment()
		# print stock.recentSentiment
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
	veto_exchanges = ['PNK', '/']
	dataList = []
	print "Zacks ticker list:", len(zacksTickerList)
	for chunk in chunks(zacksTickerList,1000):
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


# symbols = ['ACPW', 'ATEC', 'AMRS', 'APRI', 'BIOC', 'BIOD', 'BLIN'
# 		, 'CPRX', 'CYTR', 'ETRM', 'GNVC', 'NVCN', 'ORIG', 'PPHM'
# 		, 'REXX', 'SGNL', 'ANY', 'SSH', 'WGBS', 'XOMA', 'BAS', 'BXE', 'HK'
# 		, 'ROX', 'LODE', 'DNN', 'ESNC', 'GMO', 'AUMN', 'GSS', 'IMUC', 'NSPR'
# 		, 'JRJR', 'LIQT', 'NCQ', 'PTN', 'PLM', 'PLX', 'RNN', 'XPL', 'TGB'
# 		, 'TGD', 'TAT', 'HTM']

# symbols = ['VEND', 'HK', 'CTIC', 'NEPH'
# 		, 'CMLS', 'INVS', 'BIOD', 'TGB', 'GEVO', 'SGNL', 'NCQ', 'XOMA', 'REXX', 'GNVC', 'AUMN'
# 		, 'GSS', 'XPL', 'SSH', 'PBMD', 'BLRX', 'LIQT', 'ROX', 'BCEI', 'WGBS', 'FCSC', 'RMGN']

industryRanks = zacks.getIndustryRanks()
sortedByZacksRank = sorted(industryRanks.values(), key=lambda obj: obj['rank_weighted_average'], reverse=True)
# pp(sortedByZacksRank)
symbols = getTickerList()


shortList = getShortlist(symbols)
sortedByPrice = sorted(shortList['complete'], key=lambda stock: stock.basicData['price'])

# symbols = []
# for stock in sortedByPrice:
# 	symbols.append(stock.symbol)
# print "symbols:",symbols

doAnalysis(sortedByPrice, industryRanks, 'Potential Stock List')

# current_portfolio = portfolio.getCurrentPortfolio(config.portfolio)
# portfolio.printPortfolio(current_portfolio)
# getShortList()