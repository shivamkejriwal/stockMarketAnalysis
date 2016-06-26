import numpy as np
import pandas as pd
import cPickle
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
import quandl
from pandas_datareader import data, wb
quandl.ApiConfig.api_key = ""


'''
======================
 Data ETL
======================
'''

def getStock(symbol, start, end):
    """
    Downloads Stock from Yahoo Finance.
    Computes daily Returns based on Adj Close.
    Returns pandas dataframe.
    """
    df =  data.DataReader(symbol, 'yahoo', start, end)

    df.columns.values[-1] = 'AdjClose'
    df.columns = df.columns + '_' + symbol
    df['Return_%s' %symbol] = df['AdjClose_%s' %symbol].pct_change()
    
    return df


def getStockFromQuandl(symbol, name, start, end):
    """
    Downloads Stock from Quandl.
    Computes daily Returns based on Adj Close.
    Returns pandas dataframe.
    """
    
    df =  quandl.get(symbol, trim_start=start, trim_end=end)

    df.columns.values[-1] = 'AdjClose'
    df.columns = df.columns + '_' + name
    df['Return_%s' %name] = df['AdjClose_%s' %name].pct_change()
    
    return df


def getWorldExchangeData(fout, start, end):
    
    nasdaq = getStock('^IXIC', start, end)
    frankfurt = getStock('^GDAXI', start, end)
    london = getStock('^FTSE', start, end)
    paris = getStock('^FCHI', start, end)
    hkong = getStock('^HSI', start, end)
    nikkei = getStock('^N225', start, end)
    australia = getStock('^AXJO', start, end)
    djia = getStockFromQuandl("YAHOO/INDEX_DJI", 'Djia', start, end)
    
    return [nasdaq, djia, frankfurt, london, paris, hkong, nikkei, australia]


def getExchangeData(exchange="nyse"):
	# exchange_list = ["nasdaq", "nyse", "amex"]
	url = "http://www.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange="+exchange+"&render=download"
	data = pd.read_csv(url)
	header = data.columns.values
	symbols = data["Symbol"].tolist()

	print header
	# data['LastSale'] = pd.to_numeric(data['LastSale'], errors='ignore')
	data = data.convert_objects(convert_numeric=True)
	filtered = data[data['LastSale'] <= 10]
	# print data['LastSale'].values
	# print filtered
	return filtered

'''
check chnage in volume
ema 200 vs 50
'''


'''
======================
 Technical Indicators
======================
'''
def moving_average(values, window, type = "simple"):
    if type == 'simple':
        weights = np.ones(window)
    else:
        weights = np.exp(np.linspace(-1., 0., window))
    weights /= weights.sum()
    ave = np.convolve(values, weights, 'full')[:len(values)]
    ave[:window] = ave[window]
    return ave

def moving_average_convergence(values, nslow=26, nfast=12):
    """
    compute the MACD (Moving Average Convergence/Divergence) using a fast and slow exponential moving avg'
    return value is emaslow, emafast, macd which are len(x) arrays
    """
    emaslow = moving_average(values, nslow, type='exponential')
    emafast = moving_average(values, nfast, type='exponential')
    # rem_size = len(emafast) - len(emaslow)
    # emaslow = np.append(np.zeros(rem_size), emaslow, axis=0)
    return emaslow, emafast, emafast - emaslow


def relative_strength(prices, n=14):
    """
    compute the n period relative strength indicator
    http://stockcharts.com/school/doku.php?id=chart_school:glossary_r#relativestrengthindex
    http://www.investopedia.com/terms/r/rsi.asp
    """

    deltas = np.diff(prices)
    seed = deltas[:n+1]
    up = seed[seed >= 0].sum()/n
    down = -seed[seed < 0].sum()/n
    rs = up/down
    rsi = np.zeros_like(prices)
    rsi[:n] = 100. - 100./(1. + rs)

    for i in range(n, len(prices)):
        delta = deltas[i - 1]  # cause the diff is 1 shorter

        if delta > 0:
            upval = delta
            downval = 0.
        else:
            upval = 0.
            downval = -delta

        up = (up*(n - 1) + upval)/n
        down = (down*(n - 1) + downval)/n

        rs = up/down
        rsi[i] = 100. - 100./(1. + rs)

    return rsi


'''
======================
         Main
======================
'''

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


# getExchangeData()
start = datetime.now() - timedelta(days=50)
end = datetime.now()
stock_data =  quandl.get("WIKI/SGY",start_date = start)
days = stock_data.index
prices = stock_data["Close"].values
print "prices:",prices

rsi = relative_strength(prices)

emaslow, emafast, macd = moving_average_convergence(prices)
ema9 = moving_average(macd, 9, type='exponential')
length = len(macd)
dayList = getDays(days, length)

lines = {
    "prices": prices,
    "emaslow": emaslow,
    "emafast": emafast,
    "macd": macd,
    "ema9": ema9,
    "rsi":rsi
}
plotData(dayList, lines)




