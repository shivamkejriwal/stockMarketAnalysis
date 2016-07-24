# import sys
# sys.path.append("../")
import decimal
from pprint import pprint as pp

from apis import yahooFinanceAPI as yahoo
from apis import zacksAPI as zacks

def fixDecimal(value):
	result = decimal.Decimal(value)
	result = round(result,4)
	return result

def fixDictionary(obj):
	for key in obj.keys():
		if obj[key]==None:
			obj[key]="-"
		elif type(obj[key]) == type(obj):
			obj[key] = fixDictionary(obj[key])
	return obj


def getCurrentPortfolio(myPortfolio):
	print "\n=================\nCurrent Portfolio\n=================\n"
	current_portfolio = {
		"stocks":[],
		"total_cost":0,
		"total_value":0,
		"total_gains":0
	}
	for symbol, value in myPortfolio.iteritems():
		current_data = yahoo.getStockData(symbol)
		zacks_opinion = zacks.getZacksOpinion(symbol)
		zacks_opinion = fixDictionary(zacks_opinion)
		shares = value["number_of_shares"]
		price = value["ave_price"]
		lastPrice = current_data["market_value"]

		stock = {
			"ticker":symbol,
			"number_of_shares":shares,
			"market_value":lastPrice,
			"zacks_rank":zacks_opinion["Rank"],
			"zacks_suggestion":zacks_opinion["Suggestion"],
			"zacks_score":zacks_opinion["Style_Score"]
		}

		current_portfolio["stocks"].append(stock)
		current_portfolio["total_cost"]+=shares*price
		current_portfolio["total_value"]+=shares*lastPrice

	current_portfolio["total_gains"] = current_portfolio["total_value"]-current_portfolio["total_cost"]
	current_portfolio["total_cost"] = fixDecimal(current_portfolio["total_cost"])
	current_portfolio["total_value"] = fixDecimal(current_portfolio["total_value"])
	current_portfolio["total_gains"] = fixDecimal(current_portfolio["total_gains"])
	return current_portfolio

def printPortfolio(myPortfolio):
	print "Symbol\tCount\tMarket Value\tZacks_Score(V,G,M:VGM)"
	template = '{0:5}\t{1:4}\t{2:10}\t{3:1}-{4}({5},{6},{7}:{8})'
	for stock in myPortfolio["stocks"]:
		print template.format(stock["ticker"],stock["number_of_shares"],stock["market_value"]
			,stock["zacks_rank"],stock["zacks_suggestion"],stock["zacks_score"]["Value"]
			,stock["zacks_score"]["Growth"],stock["zacks_score"]["Momentum"],stock["zacks_score"]["VGM"])
	print "Total Cost:",myPortfolio["total_cost"]
	print "Total Value:",myPortfolio["total_value"]
	print "Total Gains:",myPortfolio["total_gains"]

# import config as config
# portfolio = getCurrentPortfolio(config.portfolio)
# pp(portfolio)