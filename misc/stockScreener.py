import numpy as np
import pandas as pd
from pprint import pprint as pp
import cPickle
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
import dataETL as dataETL
import technicalIndicators as tech_indicators
import crawler as crawler


def getDays(days, length = 0):
    dayList = []
    for day in days:
        dayList.append(datetime.strftime(day, '%d'))
    return dayList[-length:]

def plotData(days,lines):
    length = len(days)
    keys = lines.keys()
    for key in keys:
        value = lines[key]
        print key+":",value
        plt.plot(value)

    plt.xticks(np.arange(length),days)
    plt.xlabel('Days')
    plt.ylabel('Values')
    plt.legend(keys, loc='upper left')
    plt.show()

def printData(data):
    print('Symbol\tLastSale\tMarketCap\tName\tSector\tindustry\t')
    for index, row in data.iterrows():
        # print('{Symbol:4}\t{LastSale:10}\t{Name:20}\t{Sector:20}\t{industry:20}'.format(row['Symbol'], row['LastSale'], row['Name'], row['Sector'], row['industry']))
        print row['Symbol'], row['LastSale'], row['MarketCap'], row['Name'], row['Sector'], row['industry']



def populateZacksResearch(data, max_rank=2):
    symbols = data["Symbol"].tolist()
    data["zacks_rank"] = ""
    data["zacks_suggestion"] = ""
    for symbol in symbols:
        rank, rank_type = crawler.getZacksRank(symbol)
        row_index = data[data["Symbol"] == symbol].index
        if rank == None or rank>max_rank:
            data = data.drop(row_index)
        else :
            print symbol, rank, rank_type
            data.set_value(row_index, 'zacks_rank', rank)
            data.set_value(row_index, 'zacks_suggestion', rank_type)
    return data


def generateIndicators(symbol):
    start = datetime.now() - timedelta(days=60)
    end = datetime.now()
    stock_data = dataETL.getStock(symbol, start, end)
    if stock_data is None : return
    # print "stock_data:",stock_data
    days = stock_data.index
    prices = stock_data["Close"].values
    volumes = stock_data["Volume"].values
    vroc_line = tech_indicators.vroc(volumes,1)
    # print stock_data
    # print "prices:",prices

    rsi = tech_indicators.relative_strength(prices)

    emaslow, emafast, macd = tech_indicators.moving_average_convergence(prices)
    ema9 = tech_indicators.moving_average(macd, 9, type='exponential')
    length = len(macd)
    dayList = getDays(days, length)

    lines = {
        "prices": prices,
        "emaslow": emaslow,
        "emafast": emafast,
        "macd": macd,
        "ema9": ema9,
        "vroc": vroc_line
        # ,"rsi":rsi
    }
    plotData(dayList, lines)

def getShortList():
    data = dataETL.getExchangeData(convert=True)
    filters = {
        'min_MarketCap':1000000, # $1,000,000 Mil
        'max_LastSale':1,
        'min_LastSale':.05,
    }
    #100,000 as the minimum average volume amount.
    #Enter positive growth and sales qualifiers to find companies that are earning income
    #Check to see that the growth and sales are increasing, and that the earnings per share are positive. 
    #Make sure the company has enough cash to conduct its daily operations and is not swimming in debt.
    #If you are interested in buying stocks that technically are not penny stocks but are trading below $1, here are two options:
    #These two stocks sport favorable Zacks Rank, have market capitalization of at least $1 billion and are also seeing positive earnings estimate revision of late.
    print data.shape
    data = dataETL.filterData(filters=filters, data=data)
    print "Filtered:", data.shape
    # data = crawler.getZacksRankInParallel(data)
    data = populateZacksResearch(data)
    print "With Zacks Rank:",  data.shape
    print data.sort(['MarketCap','LastSale'], ascending=[0, 0])
    # printData(data)

getShortList()
# generateIndicators("AMRS")
# print crawler.getZacksRank("AMRS")

