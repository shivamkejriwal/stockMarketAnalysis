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

def createURL(symbol,reportType='is',period=12):
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

def fixValues(values):
	result = []
	for value in values:
		if value == '':
			result.append(None)
		else:
			result.append(fixDecimal(float(value)))
	return result

def cleanData(rows):
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


def getData(url):
	response = requests.get(url)
	content = response.content
	if len(content) == 0:
		return {'Error':'Bad Request'}
	rows = content.splitlines()[1:]
	periods = rows[0].split(',')[1:]
	data = cleanData(rows[1:])
	data['periods'] = periods
	return data

url = createURL('gss', 'is', 12)
print url
data = getData(url)
pp(data)