import numpy as np
import pandas as pd
from pprint import pprint as pp
from datetime import datetime, timedelta
import dataETL as dataETL
import technicalIndicators as tech_indicators
import zacksAPI as zacks
import config as config
import portfolio as portfolio

def printData(data):
	print('IPOyear\tSymbol\tLastSale\tZacks_Score(V,G,M)\tMarketCap\tSector\t\t\tIndustry')
	# print "Headers:", data.columns.values
	template_small = '{0:7}\t{1:4}\t{2:6}\t\t{3}-{4}({5},{6},{7})\t\t{8:10}\t{9:10}\t\t{10:<}'
	template_big = '{0:7}\t{1:4}\t{2:6}\t\t{3}-{4}({5},{6},{7})\t{8:10}\t{9:10}\t\t{10:<}'
	for index, row in data.iterrows():
		template = template_small
		if row['zacks_rank']==1 or row['zacks_rank']==5:
			template = template_big 
		print(template.format(row['IPOyear'],row['Symbol'],row['LastSale']
			,row['zacks_rank'],row['zacks_suggestion']
			,row['zacks_score_Value'],row['zacks_score_Growth'],row['zacks_score_Momentum']
			,row['MarketCap'],row['Sector'],row['industry']))

def populateZacksResearch(data, max_rank=2):
    symbols = data["Symbol"].tolist()
    data["zacks_rank"] = ""
    data["zacks_suggestion"] = ""
    for symbol in symbols:
        # rank, rank_type = crawler.getZacksRank(symbol)
        zacks_opinion = zacks.getZacksOpinion(symbol)
        rank = zacks_opinion["Rank"]
        row_index = data[data["Symbol"] == symbol].index
        if rank == None or rank>max_rank:
            data = data.drop(row_index)
        else :
            print symbol, rank, zacks_opinion["Suggestion"]
            data.set_value(row_index, 'zacks_rank', zacks_opinion["Rank"])
            data.set_value(row_index, 'zacks_suggestion', zacks_opinion["Suggestion"])
            data.set_value(row_index, 'zacks_score_Value', zacks_opinion["Style_Score"]["Value"])
            data.set_value(row_index, 'zacks_score_Growth', zacks_opinion["Style_Score"]["Growth"])
            data.set_value(row_index, 'zacks_score_Momentum', zacks_opinion["Style_Score"]["Momentum"])
    return data

def getShortList():
	print "\n=================\nBuying Short List\n=================\n"
	data = dataETL.getExchangeData(convert=True)
	filters = {
		'min_MarketCap':1000000, # $1,000,000 Mil
		'max_LastSale':1,
		'min_LastSale':.05,
	}
	print data.shape
	data = dataETL.filterData(filters=filters, data=data)
	print "Filtered:", data.shape
	data = populateZacksResearch(data)
	print "With Zacks Rank:",  data.shape
	data.sort(['MarketCap','LastSale'], ascending=[0, 0])
	printData(data)

current_portfolio = portfolio.getCurrentPortfolio(config.portfolio)
portfolio.printPortfolio(current_portfolio)
getShortList()