import sys
from lxml import html
import requests
import json
import decimal
from pprint import pprint as pp


def getSuggestion(rank):
	suggestion_mapping = {
		None:None,
		1:"Strong Buy",
		2:"Buy",
		3:"Hold",
		4:"Sell",
		5:"Strong Sell"
	}
	return suggestion_mapping[rank]

def fixDecimal(value,limit):
	result = decimal.Decimal(value)
	result = round(result,limit)
	return result

def isInteger(s):
	if s==None:
		return False
	try:
		int(s)
		return True
	except ValueError:
		return False

def getZacksRank(symbol):
	rank = {
		"Rank": None,
		"Suggestion":None
	}

	symbol = symbol.upper()
	page = requests.get('https://www.zacks.com/stock/quote/'+symbol)
	tree = html.fromstring(page.content)

	rankbox = tree.xpath('//div[@class="zr_rankbox"]/span')
	for value in rankbox:
		if isInteger(value.text):
			rank["Rank"] = int(value.text)
			rank["Suggestion"] = getSuggestion(rank["Rank"])

	return rank


def getZacksStyleScore(symbol):
	symbol = symbol.upper()
	style_score  = {
		"Value":None,
		"Growth":None,
		"Momentum":None,
		"VGM":None,
	}

	symbol = symbol.upper()
	page = requests.get('https://www.zacks.com/stock/quote/'+symbol)
	tree = html.fromstring(page.content)
	stylebox = tree.xpath('//div[@class="composite_group"]/p/span')
	if len(stylebox) > 1:
		style_score  = {
			"Value":stylebox[1].text,
			"Growth":stylebox[2].text,
			"Momentum":stylebox[3].text,
			"VGM":stylebox[4].text,
		}
	return style_score


def getZacksOpinion(symbol):
	opinon = {
		"Rank": None,
		"Suggestion":None,
		"Industry":None,
		"Style_Score": {
			"Value":None,
			"Growth":None,
			"Momentum":None,
			"VGM":None,
		}
	}
	symbol = symbol.upper()
	page = requests.get('https://www.zacks.com/stock/quote/'+symbol)
	tree = html.fromstring(page.content)
	rankbox = tree.xpath('//div[@class="zr_rankbox"]/span')
	stylebox = tree.xpath('//div[@class="composite_group"]/p/span')

	industrybox = tree.xpath('//section[@id="stock_industry_analysis"]/p[@class="premium"]/a')
	industry = industrybox[0].text[len('See all '):-len(' Peers>> ')]
	opinon["Industry"] = industry
	for value in rankbox:
		if isInteger(value.text):
			opinon["Rank"] = int(value.text)
			opinon["Suggestion"] = getSuggestion(opinon["Rank"])

	if len(stylebox) > 1:
		opinon["Style_Score"]  = {
			"Value":'',
			"Growth":'',
			"Momentum":'',
			"VGM":'',
		}
		if len(stylebox)>=2 : opinon["Style_Score"]["Value"] = stylebox[1].text
		if len(stylebox)>=3 : opinon["Style_Score"]["Growth"] = stylebox[2].text
		if len(stylebox)>=4 : opinon["Style_Score"]["Momentum"] = stylebox[3].text
		if len(stylebox)>=5 : opinon["Style_Score"]["VGM"] = stylebox[4].text

	return opinon


def getPriceConsensus(symbol):
	symbol = symbol.upper()
	page = requests.get('https://www.zacks.com/stock/chart/'+symbol+'/price-consensus-chart')
	print page.content
	# tree = html.fromstring(page.content)

def cleanEarningsData(data):

	# valid_tables = ['earnings_announcements_earnings_table','earnings_announcements_revisions_table']
	earnings_table = data['earnings_announcements_earnings_table']
	revisions_table = data['earnings_announcements_revisions_table']

	# earnings_data
	# =============
	earnings_data = []
	for value in earnings_table:
		estimate = fixDecimal(value[2].replace("$", ""),2)
		reported = fixDecimal(value[3].replace("$", ""),2)
		surprise = (reported-estimate)/abs(estimate) if estimate!=0 else 0
		surprise = fixDecimal(surprise*100,2)
		obj = {
			'Date':str(value[0]),
			'Period_Ending':value[1],
			'Estimate':estimate,
			'Reported':reported,
			'Surprise':surprise,
		}
		earnings_data.append(obj)

	# revisions_data
	# =============
	revisions_data = []
	for value in revisions_table:
		date = value[0]
		period_ending = value[1]
		if period_ending !=None:
			start_index = period_ending.find('>')
			end_index = period_ending.find('<',start_index)
			period_ending = period_ending[start_index+1:end_index-1]
		orig = fixDecimal(value[2].replace("$", ""),2) if '--'not in value[2] else None
		revision = value[3] if '--'not in value[2] else None
		if revision !=None:
			start_index = revision.find('>')
			end_index = revision.find('<',start_index)
			revision = revision[start_index+1:end_index-1]
			revision = fixDecimal(revision.replace("$", ""),2) if '--'not in revision else None
		obj = {
			'Date':str(date),
			'Period_Ending':str(period_ending),
			'Previous':orig,
			'Current':revision
		}
		revisions_data.append(obj)

	return earnings_data, revisions_data

def getEarnings(symbol):
	symbol = symbol.upper()
	page = requests.get('https://www.zacks.com/stock/research/'+symbol+'/earnings-announcements?')
	tree = html.fromstring(page.content)
	table = tree.xpath('//script')
	start_text = 'var obj = {'
	end_text = '};'
	# print table[2].text
	result = {
		'earnings_data': None,
		'revisions_data': None
	}
	for value in table:
		script_text = str(value.text)
		if 'earnings_announcements_earnings_table' in script_text:
			start_index = script_text.find(start_text)
			end_index = script_text.find(end_text,start_index)
			start_index+=len(start_text)-1
			end_index+=len(end_text)-1
			# print start_index, end_index
			json_data = script_text[start_index:end_index]
			# json_data = json_data.replace(" ", "").replace("\n", "")#json_data.strip(' \t\n\r')
			data = json.loads(json_data)
			result['earnings_data'], result['revisions_data'] =  cleanEarningsData(data)
			return result
	return result

def getInsiderTransactions(symbol):
	symbol = symbol.upper()
	page = requests.get('https://www.zacks.com/stock/research/'+symbol+'/insider-transactions')
	# print page.content
	tree = html.fromstring(page.content)
	scripts = tree.xpath('//script')
	trades = {
	'all':{},
	'buys':{},
	'sells':{},
	'options':{}
	}
	for script in scripts:
		script_text = str(script.text)
		if 'window.app_data_all =' in script_text:
			trades_all_text = script_text.replace(" ", "")
			start_text = 'window.app_data_all='
			end_text = '};'
			start_index = trades_all_text.find(start_text)
			end_index = trades_all_text.find(end_text,start_index)
			start_index+=len(start_text)+2
			end_index+=len(end_text)-1
			json_data = trades_all_text[start_index:end_index]
			json_data = json_data.replace('\r\n', "").replace("columns:","\"columns\":")
			# print json_data
			data = json.loads(json_data)
			trades['all']=data
			# pp(data)
		if 'window.app_data_buy =' in script_text:
			trades_buys_text = script_text.replace(" ", "")
			start_text = 'window.app_data_buy='
			end_text = '};'
			start_index = trades_buys_text.find(start_text)
			end_index = trades_buys_text.find(end_text,start_index)
			start_index+=len(start_text)+2
			end_index+=len(end_text)-1
			json_data = trades_buys_text[start_index:end_index]
			json_data = json_data.replace('\r\n', "").replace("columns:","\"columns\":")
			# print json_data
			data = json.loads(json_data)
			trades['buys']=data
			# pp(data)
		if 'window.app_data_sell =' in script_text:
			trades_sells_text = script_text.replace(" ", "")
			start_text = 'window.app_data_sell='
			end_text = '};'
			start_index = trades_sells_text.find(start_text)
			end_index = trades_sells_text.find(end_text,start_index)
			start_index+=len(start_text)+2
			end_index+=len(end_text)-1
			json_data = trades_sells_text[start_index:end_index]
			json_data = json_data.replace('\r\n', "").replace("columns:","\"columns\":")
			# print json_data
			data = json.loads(json_data)
			trades['sells']=data
			# pp(data)
		if 'window.app_data_option =' in script_text:
			trades_option_text = script_text.replace(" ", "")
			start_text = 'window.app_data_option='
			end_text = '};'
			start_index = trades_option_text.find(start_text)
			end_index = trades_option_text.find(end_text,start_index)
			start_index+=len(start_text)+2
			end_index+=len(end_text)-1
			json_data = trades_option_text[start_index:end_index]
			json_data = json_data.replace('\r\n', "").replace("columns:","\"columns\":")
			# print json_data
			data = json.loads(json_data)
			trades['options']=data
			# pp(data)
	# pp(trades)
	# print len(trades['all']['data'])
	# print len(trades['buys']['data'])
	# print len(trades['sells']['data'])
	# print len(trades['options']['data'])
	# pp(trades['sells']['data'])
	return trades

def getDivData(string):
	# print string
	start_index = string.find('>')
	end_index = string.find('<',start_index)
	# print string[start_index+1:end_index]
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

def rankByZacks(obj):
	return obj['zRank']

def rankByZacksScore(obj):
	avg_zScore = obj['avg_zScore']
	count = obj['number_of_companies']
	return avg_zScore * count

def rankByZacksScoreChange(obj):
	zRank_now = obj['avg_zScore']
	zRank_old = obj['avg_zScore_1_week_ago']
	zRank_change = (zRank_now - zRank_old)/zRank_old
	count = obj['number_of_companies']
	return zRank_change * count

def rankBySentiment(obj):
	total = obj['pos_rev']+obj['neg_rev']
	if total == 0:
		return -1 * sys.maxint

	score = obj['pos_rev']-obj['neg_rev']
	sentiment = score / total
	return sentiment

def rankByGenralSentiment(obj):
	sentiment = rankBySentiment(obj)
	genralSentiment = sentiment * obj['number_of_companies']
	return genralSentiment

def rankByOptimism(obj):
	return obj['pos_rev']

def rankByPositiveRevisions(obj):
	pos_rev = obj['%_pos_rev']/100
	count = obj['number_of_companies']
	return pos_rev * count

def getRank(sorted_data):
	ranks = {}
	for index in range(len(sorted_data)):
		obj = sorted_data[index]
		name = obj['name']
		ranks[name] = index+1
	return ranks

def getIndustryRanks():
	industryRanks = {}
	ranks = {}
	data = getIndustryDetails()

	for industry in data:
		name = industry['name']
		industryRanks[name] = industry.copy()
		industryRanks[name]['rank'] = {}
		industryRanks[name]['rank']['ByZacks'] = int(industryRanks[name]['zRank'])
		del industryRanks[name]['name']
		del industryRanks[name]['zRank']

	# sortedByZacks = sorted(data, key=lambda obj: rankByZacks(obj))
	sortedByZacksScore = sorted(data, key=lambda obj: rankByZacksScore(obj),)
	sortedByZacksScoreChange = sorted(data, key=lambda obj: rankByZacksScoreChange(obj), reverse=True)
	sortedBySentiment = sorted(data, key=lambda obj: rankBySentiment(obj), reverse=True)
	sortedByGenralSentiment = sorted(data, key=lambda obj: rankByGenralSentiment(obj), reverse=True)
	sortedByOptimism = sorted(data, key=lambda obj: rankByOptimism(obj), reverse=True)
	sortedByPositiveRevisions = sorted(data, key=lambda obj: rankByPositiveRevisions(obj), reverse=True)
	# ranks['ByZacks'] = getRank(sortedByZacks)
	ranks['ByZacksScore'] = getRank(sortedByZacksScore)
	ranks['ByZacksScoreChange'] = getRank(sortedByZacksScoreChange)
	ranks['BySentiment'] = getRank(sortedBySentiment)
	ranks['ByGenralSentiment'] = getRank(sortedByGenralSentiment)
	ranks['ByOptimism'] = getRank(sortedByOptimism)
	ranks['ByPositiveRevisions'] = getRank(sortedByPositiveRevisions)

	for rank_type, rank_list in ranks.items():
		for industry, rank in rank_list.items():
			industryRanks[industry]['rank'][rank_type] = rank

	for industry, rank_obj in industryRanks.items():
		total = sum(rank_obj['rank'].values())
		industryRanks[industry]['rank']['average'] = total/len(rank_obj['rank'].values())

	return industryRanks


# getIndustryDetails()
# pp(getIndustryDetails())
# ranks = getIndustryRanks()
# pp(ranks)

# def getSortValue(obj,key):
# 	return obj[1][key]

# sortedRanks= sorted(ranks.items(), key=lambda obj: getSortValue(obj,'average'))[:10]
# pp(sortedRanks)
# getInsiderTransactions('gale')
# getPriceConsensus('gss')
# data = getEarnings('gale')
# pp(data)
# ========
# 	Main
# ========
# ticker = 'GSS'
# print getZacksOpinion(ticker)
# print getZacksRank(ticker)
# print getZacksStyleScore(ticker)
