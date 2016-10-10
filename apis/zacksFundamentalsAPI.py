import sys
from lxml import html
import requests
import json
import decimal
from pprint import pprint as pp
from datetime import datetime


'''
https://www.zacks.com/stock/quote/TLYS/financial-overview
https://www.zacks.com/stock/quote/TLYS/income-statement
https://www.zacks.com/stock/quote/TLYS/balance-sheet
https://www.zacks.com/stock/quote/TLYS/cash-flow-statements
'''




def getDataFromURL(symbol,data_type=None):
	symbol = symbol.upper()

	headers = {
		'Host': 'www.zacks.com',
		'Referer': 'https://www.zacks.com/stock/quote/{0}'.format(symbol),
		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
	}

	url_map = {
		'financial-overview' : 'https://www.zacks.com/stock/quote/{0}/financial-overview'.format(symbol),
		'balance-sheet' : 'https://www.zacks.com/stock/quote/{0}/balance-sheet'.format(symbol),
		'income-statement' : 'https://www.zacks.com/stock/quote/{0}/income-statement'.format(symbol),
		'cash-flow-statements' : 'https://www.zacks.com/stock/quote/{0}/cash-flow-statements'.format(symbol)
	}

	if data_type == None: data_type = 'financial-overview'
	url = url_map[data_type]
	print url
	response = requests.get(url, headers=headers)
	data = response.content
	return data


def fixDecimal(value,limit):
	if value == None or value == '' or value =='NA':
		return None
	value = value.replace(',','')
	result = decimal.Decimal(value)
	result = round(result,limit)
	return result

def fixValues(values):

	result = []
	for value in values:
		value = fixDecimal(value,3)
		if value != None:
			value = value * 1000000
		result.append(value)
	# print values,result
	return result

def populateTableData(table, table_names, index, period, result):
	head = table[0]
	body = table[1]
	table_name = table_names[index]
	result[period][table_name] = {}
	for row in body:
		values = []
		for col in row:
			value = col.text
			# print value
			if value is None and len(col)>0:
				# print value,len(col)
				value = col[0].text
			if value is None: value =''
			# print value,value.encode('ascii', 'ignore')
			values.append(value.encode('ascii', 'ignore'))
		key = values[0]
		valueList = fixValues(values[1:])
		if key not in table_names:
			result[period][table_name][key] = valueList


def getBalanceSheet(pageContent):
	result = {
		'quarterly': { 'dates':[] },
		'annual': { 'dates':[] }
	}
	table_names = [
		'Assets',
		'Liabilities & Shareholders Equity',
		'Shareholders Equity'
	]

	tree = html.fromstring(pageContent)
	periods = result.keys()
	for period in periods:
		tables = tree.xpath('//div[@id="{0}_income_statement"]/table'.format(period))

		for row in tables[0][0][0]:
				if row.text is not None:
					result[period]['dates'].append(row.text)

		for index in range(len(tables)):
			table = tables[index]
			populateTableData(table, table_names, index, period, result)
	return result


def getIncomeStatement(pageContent):
	result = {
		'quarterly': { 'dates':[] },
		'annual': { 'dates':[] }
	}
	table_names = [
		'Overall',
		'Depreciation Footnote',
		'Earnings Per Share Data'
	]
	tree = html.fromstring(pageContent)
	periods = result.keys()
	for period in periods:
		tables = tree.xpath('//div[@id="{0}_income_statement"]/table'.format(period))

		for row in tables[0][0][0]:
				if row.text is not None:
					result[period]['dates'].append(row.text)
		for index in range(len(tables)):
			table = tables[index]
			populateTableData(table, table_names, index, period, result)

	return result


def getCashFlowStatements(pageContent):
	result = {
		'annual': { 'dates':[] }
	}
	table_names = [
		'Cash Flow From Operations, Investments & Financial Activities',
		'Uses of Funds',
	]
	tree = html.fromstring(pageContent)
	periods = result.keys()
	for period in periods:
		cash_flow_operation = tree.xpath('//section[@id="cash_flow_operation"]/table')[0]
		cash_flow_use = tree.xpath('//section[@id="cash_flow_use"]/table')[0]

		# print 'cash_flow_operation:', cash_flow_operation
		for row in cash_flow_operation[0][0]:
				if row.text is not None:
					result[period]['dates'].append(row.text)

		populateTableData(cash_flow_operation, table_names, 0, period, result)
		populateTableData(cash_flow_use, table_names, 1, period, result)
	return result


def getData(symbol,data_type=None):
	pageContent = getDataFromURL(symbol,data_type)
	data = None
	if data_type == 'balance-sheet': data = getBalanceSheet(pageContent)
	elif data_type == 'income-statement': data = getIncomeStatement(pageContent)
	elif data_type == 'cash-flow-statements': data = getCashFlowStatements(pageContent)
	else: data = None

	return data


# symbol='lee'
# data = getData(symbol,'balance-sheet')
# pp(data)





'''
ebita =		Net Income
			+ Minority Interest
			+ Income Taxes
			+ Depreciation & Amortization (Cash Flow)


			or
			
			Net Cash From Operating Activities
			+
'''


