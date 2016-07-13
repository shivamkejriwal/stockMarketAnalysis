import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import quandl
from pandas_datareader import data as pd_data
import config as config
quandl.ApiConfig.api_key = config.quandl_api_key


def getStockFromYahoo(symbol, start, end=None):
    """
    Downloads Stock from Yahoo Finance.
    Computes daily Returns based on Adj Close.
    Returns pandas dataframe.
    """
    symbol = symbol.upper()
    df =  pd_data.DataReader(symbol, 'yahoo', start, end)
    return df

def getStockFromQuandl(symbol, start, end=None):
    """
    Downloads Stock from Quandl.
    Computes daily Returns based on Adj Close.
    Returns pandas dataframe.
    """
    symbol = symbol.upper()
    df =  quandl.get("WIKI/"+symbol, trim_start=start, trim_end=end)
    return df

def getStock(symbol, start, end=None):
    stock_data = None
    try:
        stock_data =  getStockFromQuandl(symbol, start, end)
    except:
        print "Data Not Found in Quandl: Trying Yahoo"
        try:
            stock_data = getStockFromYahoo(symbol, start, end)
        except:
            print "Data Not Found"
            return None
    return stock_data

def getWorldExchangeData(start, end):
    
    exchanges = {
        "nasdaq":getStockFromYahoo('^IXIC', start, end),
        "frankfurt":getStockFromYahoo('^GDAXI', start, end),
        "london":getStockFromYahoo('^FTSE', start, end),
        "paris":getStockFromYahoo('^FCHI', start, end),
        "hkong":getStockFromYahoo('^HSI', start, end),
        "nikkei":getStockFromYahoo('^N225', start, end),
        "australia":getStockFromYahoo('^AXJO', start, end),
        "djia":getStockFromQuandl("YAHOO/INDEX_DJI", 'Djia', start, end),
    }
    
    return exchanges

def getExchangeData(convert=False):
    exchange_list = ["nasdaq", "nyse" ] #+ ["amex"]

    dataset = []
    for exchange in exchange_list:
        url = "http://www.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange="+exchange+"&render=download"
        # print url
        data = pd.read_csv(url)
        print exchange, "shape:",data.shape
        dataset.append(data)

    data = pd.concat(dataset)
    data = data.convert_objects(convert_numeric=True)

    if convert == True:
        for index, row in data.iterrows():
            if row['MarketCap'] != 'n/a':
                mult = 0
                if row['MarketCap'][-1] =='M': mult = 1000000
                if row['MarketCap'][-1] =='B': mult = 1000000000
                value = float(row['MarketCap'][1:-1])*mult
                data.set_value(index,'MarketCap',value)
            else :
                data.set_value(index,'MarketCap',-1)

    # header = data.columns.values
    # symbols = data["Symbol"].tolist()
    # print "header", header

    return data

def filterData(filters={}, data=None):
    if data is None:
        return None
        # data = getExchangeData(convert=True)

    # print "shape:",data.shape
    filter_types = ['max_MarketCap', 'min_MarketCap', 
                        'max_LastSale', 'min_LastSale']

    for flt_type in filter_types:
        if flt_type not in filter_types:
            filters[flt_type]=None

    for key, value in filters.iteritems():
        if value != None:
            limit_type = key[:3]
            selector_type = key[4:]
            if limit_type == "max":
                data = data[data[selector_type] <= value]
            if limit_type == 'min':
                data = data[data[selector_type] >= value]
            print limit_type, selector_type, data.shape

    return data


def getDataBySector(sectors = [], data=None):
    '''
    sectors = ['Finance', 'Consumer Services', 'Technology', 'Public Utilities', 
        'Capital Goods', 'Basic Industries', 'Health Care', 'Energy', 
        'Miscellaneous', 'n/a', 'Transportation', 'Consumer Non-Durables', 
        'Consumer Durables']
    '''
    if data is None:
        return None

    dataset = []
    for sector in sectors:
        filtered = data[data["Sector"] == sector]
        dataset.append(filtered)

    data = pd.concat(dataset)
    return data



'''
==============
    Main
==============
'''
# def printData(data):
#     print('Symbol\tLastSale\tMarketCap\tName\tSector\tindustry\t')
#     for index, row in data.iterrows():
#         # print('{Symbol:4}\t{LastSale:10}\t{Name:20}\t{Sector:20}\t{industry:20}'.format(row['Symbol'], row['LastSale'], row['Name'], row['Sector'], row['industry']))
#         print row['Symbol'], row['LastSale'], row['MarketCap'], row['Name'], row['Sector'], row['industry']


# data = getExchangeData(convert=True)
# data = filterData(filters={
#     'min_MarketCap':0,
#     'max_LastSale':1
#     }, data)
# data  = getDataBySector(['Finance', 'Consumer Services'], data)
# printData(data)


