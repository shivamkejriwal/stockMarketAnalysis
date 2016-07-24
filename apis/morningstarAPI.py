import urllib
import requests
import decimal
from pprint import pprint as pp
# https://gist.github.com/hahnicity/45323026693cdde6a116
# "http://financials.morningstar.com/ajax/exportKR2CSV.html?t=FB"
# "http://financials.morningstar.com/ajax/ReportProcess4CSV.html?t=TWTR&reportType=is&period=12&dataType=A&order=asc&columnYear=5&number=3"

def fixDecimal(value):
	result = decimal.Decimal(value)
	result = round(result,4)
	return result

def getData(url):
	response = requests.get(url)
	content = response.content
	if len(content) == 0:
		return {'Error':'Bad Request'}
	return content

def fixValues(values):
	result = []
	for value in values:
		if value == '':
			result.append(None)
		else:
			result.append(fixDecimal(float(value)))
	return result

def clean_financials_data(rows):
	obj = {}
	parent_keys = ['']
	for row in rows:
		split_quote = row.split('"')
		if len(split_quote)>1:
			split_quote[1] = split_quote[1].replace(",","-")
			row = split_quote[1]+split_quote[2]
		items = row.split(',')
		key = items[0].replace(' ','_')
		values = items[1:]
		if len(values) == 0:
			parent_keys.append(key+"_")
		else:
			if key != 'EBITDA':
				key = parent_keys[-1]+key
			obj[key]=fixValues(values)
	# pp(obj)
	result = {}
	for parent_key in parent_keys[1:]:
		result[parent_key[:-1] ] = {}
	for key, value in obj.items():
		foundKey = False
		for parent_key in parent_keys[1:]:
			if parent_key in key:
				foundKey = True
				newkey = key.replace(parent_key,'')
				result[parent_key[:-1]][newkey] = value
		if not foundKey:
				result[key] = value	
	return result

def create_Financials_URL(symbol,reportType='is',period=12):
	# reportType: is = Income Statement, cf = Cash Flow, bs = Balance Sheet
	# period: 12 for annual reporting, 3 for quarterly reporting
	# columnYear: 5 or 10 are the only two values supported/
	# number: The units of the response data. 1 = None 2 = Thousands 3 = Millions 4 = Billions
	url = 'http://financials.morningstar.com/ajax/ReportProcess4CSV.html?'
	params = {
		't': symbol.upper(),
		'reportType': reportType,
		'period': period,
		'dataType': 'A',
		'order': 'asc',
		'columnYear': 5,
		'number':1		
	}
	param_str =  urllib.urlencode(params)
	return url+param_str

def getFinancials(symbol,period=12):
	financials = {}
	financials['ticker'] = symbol
	reportTypes = {
		'is': 'Income_Statement',
		'cf': 'Cash_Flow',
		'bs': 'Balance_Sheet'
	}

	for reportType in reportTypes.keys():
		url = create_Financials_URL(symbol,reportType, period)
		data = getData(url)
		if 'Error' in data:
			return data
		rows = data.splitlines()[1:]
		periods = rows[0].split(',')[1:]
		report = clean_financials_data(rows[1:])
		report['periods'] = periods
		financials[reportTypes[reportType]] = report
	return financials

def create_dict(obj, key_str):
	# obj = {}
	keys = key_str.split('*')[:-1]
	curObj = obj
	# print keys
	for key in keys:
		if key not in curObj:
			curObj[key] = {} 
		curObj = curObj[key]
	return obj

def create_key_ratios_URL(symbol):
	url = "http://financials.morningstar.com/ajax/exportKR2CSV.html?t="+symbol.upper()
	return url

def clean_key_ratios_data(rows):
	obj = {}
	flag = 0
	parent_keys = ['']
	parent_periods = {}
	last_parent = ''
	for row in rows:
		items = row.split(',')
		key = items[0].replace(' ','_')
		values = items[1:]

		if flag == 0 and len(items)==1:
			if key == '':
				flag=1
			if key != '':
				parent_keys.append(last_parent+"*"+key+"*")
		elif flag == 1:
			if len(items)==1:
				flag=2
				last_parent = key
				parent_keys.append(key+"*")	
			if len(items)!=1:
				parent_keys.append(last_parent+"*"+key+"*")
				parent_periods[last_parent] = items[1:]
				flag = 0
		elif flag == 2:
			parent_periods[last_parent] = items[1:]
			# parent_periods.append(items[1:])
			flag = 0
		else:
			key = parent_keys[-1]+key
			obj[key] = fixValues(values)

	# Create dictionary stub for result
	result = {}
	for parent_key in parent_keys[1:]:
		result = create_dict(result, parent_key)
		

	# Add Values
	for key, value in obj.items():
		sub_keys = key.split('*')
		# print value
		if len(sub_keys)==1:result[sub_keys[0]]=value
		if len(sub_keys)==2:result[sub_keys[0]][sub_keys[1]]=value
		if len(sub_keys)==3:result[sub_keys[0]][sub_keys[1]][sub_keys[2]]=value
	
	# Add Dates
	for key, value in parent_periods.items():
		result[key]["period"]=value

	return result

def getKeyRatios(symbol):
	url = create_key_ratios_URL(symbol)
	print url
	data = getData(url)
	rows = data.splitlines()[1:]
	rows = ['']+rows
	result = clean_key_ratios_data(rows)
	return result

# keyRatios = getKeyRatios('gss')
# pp(keyRatios)
# financials = getFinancials('gss')
# pp(financials)