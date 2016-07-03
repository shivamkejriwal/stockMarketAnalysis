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
        'min_MarketCap':1000000000, # $1,000,000,000 Bil
        'max_LastSale':1
    }
    print data.shape
    data = dataETL.filterData(filters=filters, data=data)
    symbols = data["Symbol"].tolist()
    print data.index.values
    for symbol in symbols:
        rank, meaning = crawler.getZacksRank(symbol)
        print symbol, rank, meaning
        if rank == None:
            data = data.drop(data[data["Symbol"] == symbol].index)
    print data.shape

    # printData(data)

getShortList()
# generateIndicators("AMRS")
# print crawler.getZacksRank("AMRS")

