import requests
import json
from pprint import pprint as pp



def getData(rank):

	headers = {
		'Referer':'https://www.zacks.com/funds/top-etfs',
		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
	}

	response = requests.get('https://www.zacks.com/funds/top_etf_ajax_datahelper.php?category_id=all&rank_id='+str(rank), headers=headers)
	json_data = response.content
	data = json.loads(json_data)
	return data


def getSecondInnerDivData(string):
	start_index = string.find('>')
	start_index = string.find('>',start_index+1)
	end_index = string.find('<',start_index)
	result = string[start_index+1:end_index]
	result = result.encode("ISO-8859-1")
	return result


def getTooltipData(string):
	start_index = string.find('tooltip.show(')
	str_len = len('tooltip.show(')+1
	end_index = string.find(')',start_index)
	# print string[start_index+1:end_index]
	result = string[start_index+str_len:end_index-1]
	result = result.encode("ISO-8859-1")
	# result = result.replace('?','')
	return result


etfs = {}
for rank in range(1,6):
	print rank
	data = getData(rank)
	etfsList = data['data']
	for etf in etfsList:
		ticker = None
		name = None
		for string in etf:
			if 'Quote' in string:
				ticker = getSecondInnerDivData(string)
			if 'tooltip.show' in string:
				name = getTooltipData(string)
		if ticker == 'SPYD':
			pp(etf)
		etfs[ticker]=name

pp(etfs)