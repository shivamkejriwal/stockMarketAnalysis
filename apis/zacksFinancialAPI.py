import sys
from lxml import html
import requests
import json
import decimal
import numpy as np
import math
from pprint import pprint as pp
from datetime import datetime,timedelta


urls_Complete = [
	
	# ratios
	'https://widget3.zacks.com/data/zrs/json/{0}/debt_to_equity/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/book_value_per_share/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/pe_ratio/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/peg_ratio/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/ps_ratio/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/price_to_book_value/www.zacks.com?periodicity=weekly',

	# totals
	'https://widget3.zacks.com/data/zrs/json/{0}/debt_lt_total_ttm/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/liabilities_total/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/expenses_total/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/assets_total/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/market_cap/www.zacks.com?periodicity=weekly',

	# financials
	'https://widget3.zacks.com/data/zrs/json/{0}/revenue/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/revenue_ttm/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/share_holders_equity/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/dividend/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/net_income/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/enterprise_value/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/eps_diluted/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/q_profit_margin/www.zacks.com?periodicity=weekly'

	# cash
	'https://widget3.zacks.com/data/zrs/json/{0}/cash/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/cash_from_financing/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/cash_from_investing/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/cash_from_operations/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/free_cash_flow/www.zacks.com?periodicity=weekly',

	'https://widget3.zacks.com/data/zrs/json/{0}/roe/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/return_on_assets/www.zacks.com?periodicity=weekly'
]

urls_Basic = [
	'https://widget3.zacks.com/data/zrs/json/{0}/enterprise_value/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/book_value_per_share/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/revenue_ttm/www.zacks.com?periodicity=weekly'
]

# RealisticGrowthRate = (Net Income - Dividends - Depreciation & Amortization) / (Shareholders' Equity + Long-Term Debt)
urls_RealisticGrowthRate = urls_Basic + [

	'https://widget3.zacks.com/data/zrs/json/{0}/net_income/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/net_income_ttm/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/dividend/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/share_holders_equity/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/debt_lt_total_ttm/www.zacks.com?periodicity=weekly',

]

urls_growth = urls_RealisticGrowthRate + [
	'https://widget3.zacks.com/data/zrs/json/{0}/debt_to_equity/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/roe/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/return_on_assets/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/q_profit_margin/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/pe_ratio/www.zacks.com?periodicity=weekly',
	'https://widget3.zacks.com/data/zrs/json/{0}/eps_diluted/www.zacks.com?periodicity=weekly'
]

def getUnit(name):
	units = {
		'market_cap':1000000,
		'free_cash_flow':1000000,
		'net_income_ttm':1000000,
		'net_income':1000000,
		'share_holders_equity':1000000,
		'debt_lt_total_ttm':1000000,
		'enterprise_value':1000000,
		'q_profit_margin':1000000,
		'revenue':1000000,
		'revenue_ttm':1000000

	}
	if name in units.keys():
		return units[name]
	return 1


def fixDecimal(value,limit):
	if value == None or value == '':
		return None
	result = decimal.Decimal(value)
	result = round(result,limit)
	return result


def getData(symbol, url_template):

	symbol = symbol.upper()
	url = url_template.format(symbol)
	headers = {
		'Origin': 'https://www.zacks.com',
		'Host': 'widget3.zacks.com',
		'Referer': 'https://www.zacks.com/stock/quote/{0}/financial-overview'.format(symbol),
		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
	}

	response = requests.get(url, headers=headers)
	json_data = response.content
	data = json.loads(json_data)
	return data


def fixValues(values):
	result = []
	valueMap = {}
	for value in values:
		date = value[0]
		dateStr = date.strftime("%Y-%B")
		if dateStr not in valueMap:
			valueMap[dateStr] = {'count':0, 'value':0}
		valueMap[dateStr]['count']+=1
		if value[1] == 'N/A':
			valueMap[dateStr]['value']=value[1]
		else:
			valueMap[dateStr]['value']+=value[1]
	
	for dateStr, value in valueMap.iteritems():
		date = datetime.strptime(dateStr+'-30', '%Y-%B-%d')
		actual_value = 'N/A'
		if value['value'] != 'N/A':
			actual_value = value['value']/value['count']
			actual_value = fixDecimal(actual_value,3)
		result.append([date,actual_value])

	return result

def getYearFromStr(dateStr):
	year = dateStr[-2:]
	if year == '00': 
		year = '20' + year
	elif year[0] == '0' or year[0] == '1':
		year = '20' + year
	else:
		year = '19' + year
	dateStr = dateStr[:-2]+year
	date = datetime.strptime(dateStr, '%m/%d/%Y')
	return date

def getValues(data):
	name = data.keys()[0]
	values = data.values()[0]
	dataSet = []
	for key,value in values.iteritems():
		# print key,value
		date = getYearFromStr(key)
		if value !='N/A':
			unit = getUnit(name)
			value = float(value)*unit

		if date.month in [3,6,9,12] :
			dataSet.append([date,value])
		# print date,value

	dataSet = fixValues(dataSet)
	# sortedData = sorted(dataSet, key=lambda obj: obj[0])
	return sorted(dataSet, key=lambda obj: obj[0]),name

def getLatestValue(data):
	oldMonth = datetime.now() - timedelta(days=31*3)
	index = len(data.keys())-1
	name = data.keys()[index]
	values = data.values()[index]
	if len(values) == 0:
		return [None,None], name
	# print data.keys()
	# pp(values)
	# print name
	dates = values.keys()
	sortedDates = sorted(dates, key=lambda obj: getYearFromStr(obj), reverse=True)
	# pp(sortedDates)
	latestDate = sortedDates[0]
	latestValue = values[latestDate]
	if latestValue !='N/A':
		unit = getUnit(name)
		latestValue = float(latestValue)*unit
	latestDate = getYearFromStr(latestDate)
	if latestDate < oldMonth:
		latestValue = 'N/A'
	return [latestDate,latestValue], name


def getDataMap(symbol,max_count):
	symbol = symbol.upper()
	dataMap = {}
	for url in urls_growth:
		data = getData(symbol, url)
		if max_count>1:
			values, name = getValues(data)
			# print name
			dataMap[name] = values[-1*max_count:]
		if max_count == 1:
			value, name = getLatestValue(data)
			# print name
			dataMap[name] = [value]
	return dataMap


def getReturnOnCapital(data,index):
	net_income = data['net_income_ttm'][index][1]
	dividend = data['dividend'][index][1]
	share_holders_equity = data['share_holders_equity'][index][1]
	long_term_debt = data['debt_lt_total_ttm'][index][1]
	if 'N/A' in [net_income,dividend,share_holders_equity,long_term_debt]:
		return None
	# print net_income,dividend,share_holders_equity,long_term_debt
	capital = share_holders_equity+long_term_debt
	ReturnOnCapital = (net_income-dividend)/capital
	return ReturnOnCapital

def getReturnOnEquityRatio(data,index):
	net_income = data['net_income_ttm'][index][1]
	share_holders_equity = data['share_holders_equity'][index][1]
	if 'N/A' in [net_income,share_holders_equity]:
		return None
	ReturnOnEquityRatio = float(net_income)/float(share_holders_equity)
	return ReturnOnEquityRatio


def getMaxSustainableGrowthRate(data,index):
	roe = getReturnOnEquityRatio(data,index)
	dividend = data['dividend'][index][1]
	if 'N/A' in [roe,dividend]:
		return None
	if None in [roe,dividend]:
		return None
	MaxSustainableGrowthRate = roe*(1-dividend)
	return MaxSustainableGrowthRate

def getCapitalizationRatio(data,index):
	long_term_debt = data['debt_lt_total_ttm'][index][1]
	share_holders_equity = data['share_holders_equity'][index][1]
	if 'N/A' in [long_term_debt,share_holders_equity]:
		return None
	return_on_capital = share_holders_equity+long_term_debt
	capitalizationRatio = float(long_term_debt)/ float(return_on_capital)
	return capitalizationRatio

def getProfitMarginRatio(data,index):
	net_income = data['net_income_ttm'][index][1]
	revenue = data['revenue_ttm'][index][1]
	if 'N/A' in [net_income,revenue]:
		return None
	profitMarginRatio = float(net_income)/ float(revenue)
	return profitMarginRatio

def getCashFlowToDebtRatio(data,index):
	#This coverage ratio compares a company's operating cash flow to its total deb
	print "getCashFlowToDebtRatio"



def getLatesDataset(symbol):
	symbol = symbol.upper()
	data = getDataMap(symbol,1)
	result = {}
	result['ReturnOnCapital'] = getReturnOnCapital(data,0)
	result['CapitalizationRatio'] = getCapitalizationRatio(data,0)
	result['ProfitMarginRatio'] = getProfitMarginRatio(data,0)
	result['MaxSustainableGrowthRate'] = getMaxSustainableGrowthRate(data,0)
	result['ReturnOnEquityRatio'] = getReturnOnEquityRatio(data,0)

	for key,value in data.iteritems():
		value = value[0][1]
		if value == 'N/A': value = None
		result[str(key)] = value

	return result


def getPresentValue(values,rate):
	total = 0
	n = len(values)
	for index in range(n):
		value = values[index]
		discount = (1+rate)**index
		change = 0
		if discount != 0:
			change = float(value)/float(discount)
		# print "{0}\t{1:10}\t{2:10}".format(value, discount, change)
		total+=change
	return total

def getFutureValue(present_value,rate, periods):
	fv =  present_value*(1+rate)**periods
	return fv

def getIRR_simple(values):
	best_rate = 0
	min_pv = sys.maxint
	tolerance = .01
	rates = np.arange(-10, 2, tolerance)
	for rate in rates:
		
		pv = abs(getPresentValue(values,rate))
		# print "{0}\t{1:10}\t{2:10}\t{3:10}".format(rate, pv, best_rate, min_pv)
		if pv < min_pv:
			min_pv = pv
			best_rate = rate
			# print 'found one'
		
	return best_rate


def getFreeCashFlow(symbol,max_count, min_count=0):
	symbol = symbol.upper()
	url = 'https://widget3.zacks.com/data/zrs/json/{0}/free_cash_flow/www.zacks.com?periodicity=weekly'
	data = getData(symbol, url)
	values, name = getValues(data)
	result = [value[1] for value in values[-1*max_count:]]
	print result
	rate1 = getIRR_simple(result)
	pv1 = getPresentValue(result,rate1)
	fv1 = getFutureValue(pv1,rate1,len(result)-1)
	fv2 = getFutureValue(result[0],rate1,len(result)-1)
	print "rate:1", rate1, pv1, fv1, fv2
	# rate2 = np.irr(result)
	# pv2 = getPresentValue(result,rate2)
	# print "rate:2", rate2, pv2
	# flag = False
	# while not flag and max_count>=min_count:
	# 	print rate
	# 	try:
	# 		result = [value[1] for value in values[-1*max_count:]]
	# 		# print len(result)
	# 		rate = np.irr(result)
	# 		if not math.isnan(rate):
	# 			flag = True
	# 	except:
	# 		# print 'exception'
	# 		pass
	# 	max_count-=1






# symbol = 'DYNT'
# pp(getLatesDataset(symbol))
# max_count = 5

# data = getFreeCashFlow(symbol,max_count)
# pp(data)

# data = getDataMap(symbol,max_count)
# pp(data)

# ev_old = 1
# for index in range(max_count):
# 	rgr = getRealisticGrowthRate(data,index)
# 	ev_new = data['enterprise_value'][index][1]
# 	ev_growth = (ev_new-ev_old)/ev_old
# 	ev_old = data['enterprise_value'][index][1]
# 	print ev_growth, rgr



# values = [-100, 60, 60, 60]
# irr = getIRR_simple(values)
# rate = np.irr(values)
# print "Simple:",irr, rate




# symbol = symbol.upper()
# url = 'https://widget3.zacks.com/data/zrs/json/{0}/eps_diluted/www.zacks.com?periodicity=weekly'
# data = getData(symbol, url)
# values, name = getValues(data)
# values, name = getLatestValue(data)
# pp(values)
# data = getDataMap(symbol,1)
# pp(data)
# print getRealisticGrowthRate(data,0)
# print getCapitalizationRatio(data,0)








#================================
#Things To code
#===============================


# Debt-To-Capital Ratio
#Cash Flow To Debt Ratio




