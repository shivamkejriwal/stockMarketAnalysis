import requests
import json
import decimal
from pprint import pprint as pp
import numpy as np


def fixDecimal(value,limit):
	if value == None or value == '':
		return None
	result = decimal.Decimal(value)
	result = round(result,limit)
	return result

def getDivData(string):
	# print string
	start_index = string.find('>')
	end_index = string.find('<',start_index)
	# print string[start_index+1:end_index]
	return string[start_index+1:end_index]

def getSecondInnerDivData(string):
	start_index = string.find('>')
	start_index = string.find('>',start_index+1)
	end_index = string.find('<',start_index)
	return string[start_index+1:end_index]

def getIndustryDetails():
	headers = {
		'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36',
		'Host':'www.zacks.com',
		'Referer':'https://www.zacks.com/stocks/industry-rank?icid=zpiq-pb-irm'
	}
	page = requests.get('https://www.zacks.com/zrank/zrank_industry_data_handler.php?premium_string=1',headers=headers)
	content = json.loads(page.content);
	# pp(content)
	industryRanks = []
	for industry in content['data']:
		obj = {}
		name  = getDivData(str(industry[2]))

		start_index = name.find('(')
		if name.find('(',start_index+1) > 0:
			start_index = name.find('(',start_index+1)
		end_index = name.find(')',start_index)
		numberOfCompanies = fixDecimal(name[start_index+1:end_index],3)
		name = name[:start_index]

		obj['zRank'] = fixDecimal(industry[0],3)
		obj['1_week_change'] = fixDecimal(getDivData(industry[1]),3)
		obj['name'] = name
		obj['avg_zScore'] = fixDecimal(industry[3],3)
		obj['avg_zScore_1_week_ago'] = fixDecimal(industry[4],3)
		obj['number_of_companies'] = numberOfCompanies
		obj['%_pos_rev'] = fixDecimal(getDivData(industry[5])[:-1],3)
		obj['pos_rev'] = fixDecimal(industry[6],3)
		obj['neg_rev'] = fixDecimal(industry[7],3)
		industryRanks.append(obj)

	return industryRanks


data = getIndustryDetails()
industry_list = []

for elem in data:
	name = elem['name']
	splits =  None
	print "name:",name

	index_a = name.find('-')
	index_b = name.find('/')

	if index_a>=0 and index_b>=0:
		if index_a < index_b:
			splits =  name.split('-')
		else:
			splits =  name.split('/')
	elif '-' in name:
		splits =  name.split('-')
	elif '/' in name:
		splits =  name.split('/')
	else:
		splits = [name]

	industry_name = splits[0]
	industry_sector = splits[1] if len(splits)>1 else None
	# print "industry_name:",industry_name
	# print "industry_sector:",industry_sector
	if industry_name not in industry_list:
		industry_list.append(industry_name)
	# print industry_name, industry_sector
	
# pp(data)
pp(industry_list)
# print "count:",len(industry_list)



