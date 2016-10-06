from pprint import pprint as pp
import numpy as np
import pandas as pd
import quandl
from pandas_datareader import data as pd_data
from datetime import datetime,timedelta
import decimal
import math

from data import etfList as etfList
import config as config

quandl.ApiConfig.api_key = config.quandl_api_key
etf_map = etfList.etfs_zacks


def fixDecimal(value,limit):
	if value == None or value == '':
		return None
	result = decimal.Decimal(value)
	result = round(result,limit)
	return result

def getStockFromQuandl(symbol, start, end=None):
    symbol = symbol.upper()
    df =  quandl.get("YAHOO/"+symbol, trim_start=start, trim_end=end)
    prices = df["Adjusted Close"].tolist()
    prices = [fixDecimal(price,3) for price in prices]
    return prices



def getEtfFromQuandl(symbol, start, end=None):
	symbol = symbol.upper()
	exchanges = ["NYSE","AMEX", "LON"]
	df = None
	for exchange in exchanges:
		try:
			query = 'GOOG/{0}_{1}'.format(exchange,symbol)
			df =  quandl.get(query, trim_start=start, trim_end=end)
			flag = True
		except:pass
	return df

def getEtfData(symbol, start, end=None):
	symbol = symbol.upper()
	prices = None
	try:
		df =  pd_data.DataReader(symbol, 'yahoo', start, end)
		prices = df["Close"].tolist()
		prices = [fixDecimal(price,3) for price in prices]
	except:pass
	return prices



 # uses a modified variant of Hausdorff Distance
 # needs to be faster and improved   
def distanceBetweenCurves(A, B):
    C1 = np.split(A,15)
    C2 = np.split(B,15)

    D = sp.spatial.distance.cdist(C1, C2, 'euclidean')

    #none symmetric Hausdorff distances
    H1 = np.max(np.min(D, axis=1))
    H2 = np.max(np.min(D, axis=0))
    return (H1 + H2) / 2.



def getCorrelation(first,second):
	min_val = min(len(first),len(second))
	first = first[:min_val]
	second = second[:min_val]
	correlation_matrix = np.corrcoef(first,second)
	correlation = correlation_matrix[1][0]
	return correlation



def getBestMatchingEtfs(symbol):
	correlations = {}
	print "Comparing {0} against {1} etfs".format(symbol,len(etfs))
	for etf in etfs:
		print etf
		data_etf = getEtfData(etf, start, end=None)
		if data_etf!=None:
			correlation = getCorrelation(data_stock,data_etf)
			# print '({0} , {1}): {2}'.format(symbol,etf,correlation)
			if not math.isnan(correlation):
				correlations[etf] = correlation
	sorted_correlations = sorted(correlations.items(), key=lambda x: x[1], reverse=True)[:20]
	return sorted_correlations
		

symbol = "atec"
start = datetime.now() - timedelta(days=31*12*3)
etfs = etf_map.keys()
data_stock = getStockFromQuandl(symbol, start, end=None)
correlations = getBestMatchingEtfs(symbol)
pp(correlations)

# print getEtfData('DBSP', start, end=None)














