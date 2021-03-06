import sys
from lxml import html
import requests
import json
import decimal
from pprint import pprint as pp
from datetime import datetime


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
	if value == None or value == '':
		return None
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

def tableToData(box):
	data = {}
	for row in box:
		if len(row)>1:
			key = None
			value = None
			if len(row[0]) > 0:
				key = row[0][0].text
				if len(row[1])==1:
					value = row[1][0].text
				else:
					value = row[1][1].text
			else:
				key = row[0].text
				value = row[1].text
				if value == None : value = row[1][0].text
			if value == 'NA': value = None
			if value != None:
				value = value.replace(',','')
				if '%' in value: value = value[:-1]
				elif '/' in value: value = str(value)
				else: value = fixDecimal(value,3)
			data[key] = value
	# pp(data)
	return data

def getZacksOpinion(symbol):
	opinon = {
		"Rank": None,
		"Suggestion":None,
		"Industry":None,
		"Beta":None,
		"PE_Forward": None,
		"EPS_Curr_Qtr": None,
		"EPS_Curr_Yr": None,
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

	earningsbox = tree.xpath('//section[@id="stock_key_earnings"]/table/tbody/tr')
	earningsData = tableToData(earningsbox)
	if len(earningsData.keys())>0:
		opinon['PE_Forward'] = earningsData['Forward PE']
		opinon['EPS_Curr_Qtr'] = earningsData['Current Qtr Est']
		opinon['EPS_Curr_Yr'] = earningsData['Current Yr Est']

	stockActivityBox = tree.xpath('//section[@id="stock_activity"]/table/tbody/tr')
	stockActivityData = tableToData(stockActivityBox)

	if len(stockActivityData.keys())>0:
		opinon['Beta'] = stockActivityData['Beta']

	industrybox = tree.xpath('//section[@id="stock_industry_analysis"]/p[@class="premium"]/a')
	if len(industrybox)>0:
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

		obj = {
			'Date':str(value[0]),
			'Period_Ending':value[1],
			'Estimate':None,
			'Reported':None,
			'Surprise':None,
		}

		if '--' in value[2]:
			estimate = None
		else:
			estimate = fixDecimal(value[2].replace("$", ""),2)

		if '--' in value[3]:
			reported = None
		else:
			reported = fixDecimal(value[3].replace("$", ""),2)

		if estimate == None or reported == None:
			surprise = None
		else:
			surprise = (reported-estimate)/abs(estimate) if estimate!=0 else 0
			surprise = fixDecimal(surprise*100,2)

		obj['Estimate'] = estimate
		obj['Reported'] = reported
		obj['Surprise'] = surprise
		earnings_data.append(obj)

	# revisions_data
	# =============
	revisions_data = []
	for value in revisions_table:
		date = datetime.strptime(value[0], '%m/%d/%Y')
		period_ending = value[1]
		if period_ending !=None:
			start_index = period_ending.find('>')
			end_index = period_ending.find('<',start_index)
			period_ending = period_ending[start_index+1:end_index-1].replace('(Q)','').replace('(FY)','')[:-1]
			period_ending = datetime.strptime(period_ending, '%b %Y')
		orig = fixDecimal(value[2].replace("$", ""), 3) if '--' not in value[2] else None
		revision = value[3] if '--'not in value[2] else None
		if revision !=None:
			start_index = revision.find('>')
			end_index = revision.find('<',start_index)
			revision = revision[start_index+1:end_index]
			revision = fixDecimal(revision.replace("$", ""), 3) if '--' not in revision else None
		obj = {
			'Date':date,
			'Period_Ending':period_ending,
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
			start_index = trades_all_text.find(start_text)
			start_index+=len(start_text)+2

			end_text1 = '};'
			end_text2 = 'window.app_data_buy='
			end_index1 = trades_all_text.find(end_text1,start_index)
			end_index2 = trades_all_text.find(end_text2,start_index)
			end_index = end_index1
			end_index+=len(end_text1)-1
			if end_index1>end_index2:
				end_index = end_index2
				# end_index+=len(end_text2)-2

			json_data = trades_all_text[start_index:end_index]
			json_data = json_data.replace('\r\n', "").replace("columns:","\"columns\":")
			# print json_data
			data = None
			if len(json_data)!=0:
				data = json.loads(json_data)
			trades['all']=data
			# pp(data)
		if 'window.app_data_buy =' in script_text:
			trades_buys_text = script_text.replace(" ", "")
			start_text = 'window.app_data_buy='
			start_index = trades_buys_text.find(start_text)
			start_index+=len(start_text)+2

			end_text1 = '};'
			end_text2 = 'window.app_data_sell='
			end_index1 = trades_buys_text.find(end_text1,start_index)
			end_index2 = trades_buys_text.find(end_text2,start_index)
			end_index = end_index1
			end_index+=len(end_text1)-1
			if end_index1>end_index2:
				end_index = end_index2
				# end_index+=len(end_text2)

			json_data = trades_buys_text[start_index:end_index]
			json_data = json_data.replace('\r\n', "").replace("columns:","\"columns\":")
			# print json_data
			data = None
			if len(json_data)!=0:
				data = json.loads(json_data)
			trades['buys']=data
			# pp(data)
		if 'window.app_data_sell =' in script_text:
			trades_sells_text = script_text.replace(" ", "")

			start_text = 'window.app_data_sell='
			start_index = trades_sells_text.find(start_text)
			start_index+=len(start_text)+2

			end_text1 = '};'
			end_text2 = 'window.app_data_option='
			
			end_index1 = trades_sells_text.find(end_text1,start_index)
			end_index2 = trades_sells_text.find(end_text2,start_index)
			end_index = end_index1
			end_index+=len(end_text1)-1
			if end_index1>end_index2:
				end_index = end_index2
				# end_index+=len(end_text2)-2

			json_data = trades_sells_text[start_index:end_index]
			json_data = json_data.replace('\r\n', "").replace("columns:","\"columns\":")
			# print json_data
			data = None
			if len(json_data)!=0:
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
			# if json_data
			data = None
			if len(json_data)!=0:
				data = json.loads(json_data)
			trades['options'] = data
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

def addRankToObj(industryRanks, rank_type, rank_list):
	for industry, rank in rank_list.items():
			industryRanks[industry]['rank'][rank_type] = rank

def getIndustryRanks():
	industryRanks = {}
	ranks = {}
	data = getIndustryDetails()

	for industry in data:
		name = industry['name']
		industryRanks[name] = industry.copy()
		industryRanks[name]['rank'] = {}
		industryRanks[name]['rank']['ByZacks'] = int(industryRanks[name]['zRank'])
		# del industryRanks[name]['name']
		del industryRanks[name]['zRank']

	# sortedByZacks = sorted(data, key=lambda obj: rankByZacks(obj)) # lower is better
	sortedByZacksScore = sorted(data, key=lambda obj: rankByZacksScore(obj)) # lower is better
	sortedByZacksScoreChange = sorted(data, key=lambda obj: rankByZacksScoreChange(obj)) # lower is better
	sortedBySentiment = sorted(data, key=lambda obj: rankBySentiment(obj), reverse=True) # higher is better
	sortedByGenralSentiment = sorted(data, key=lambda obj: rankByGenralSentiment(obj), reverse=True) # higher is better
	sortedByOptimism = sorted(data, key=lambda obj: rankByOptimism(obj), reverse=True) # higher is better
	sortedByPositiveRevisions = sorted(data, key=lambda obj: rankByPositiveRevisions(obj), reverse=True) # higher is better
	# ranks['ByZacks'] = getRank(sortedByZacks)
	ranks['ByZacksScore'] = getRank(sortedByZacksScore)
	ranks['ByZacksScoreChange'] = getRank(sortedByZacksScoreChange)
	ranks['BySentiment'] = getRank(sortedBySentiment)
	ranks['ByGenralSentiment'] = getRank(sortedByGenralSentiment)
	ranks['ByOptimism'] = getRank(sortedByOptimism)
	ranks['ByPositiveRevisions'] = getRank(sortedByPositiveRevisions)

	for rank_type, rank_list in ranks.items():
		addRankToObj(industryRanks, rank_type, rank_list)
		# for industry, rank in rank_list.items():
		# 	industryRanks[industry]['rank'][rank_type] = rank

	weight = {
		'ByZacks': .2 ,
		'ByZacksScore': .0 ,
		'ByZacksScoreChange': .2 ,
		'BySentiment': .1 ,
		'ByGenralSentiment': .2 ,
		'ByOptimism': .1 ,
		'ByPositiveRevisions': .2
	}

	for industry, rank_obj in industryRanks.items():
		total = sum(rank_obj['rank'].values())
		size = len(rank_obj['rank'].values())
		weighted_average = 0
		for key, value in rank_obj['rank'].items():
			weighted_average+=value*weight[key]

		industryRanks[industry]['rank_average'] = total/size
		industryRanks[industry]['rank_weighted_average'] = fixDecimal(weighted_average, 3)

	sortedByAverage = sorted(industryRanks.values(), key=lambda obj: obj['rank_average'])
	sortedByWeightedAverage = sorted(industryRanks.values(), key=lambda obj: obj['rank_weighted_average'])
	ranks['ByAverage'] = getRank(sortedByAverage)
	ranks['ByWeightedAverage'] = getRank(sortedByWeightedAverage)
	addRankToObj(industryRanks, 'ByAverage', ranks['ByAverage'])
	addRankToObj(industryRanks, 'ByWeightedAverage', ranks['ByWeightedAverage'])

	return industryRanks


def getSecondInnerDivData(string):
	start_index = string.find('>')
	start_index = string.find('>',start_index+1)
	end_index = string.find('<',start_index)
	return string[start_index+1:end_index]



def getIndustryWideEPS():

	headers = {
		'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36',
		'Host':'www.zacks.com'
		# ,'Referer':'https://www.zacks.com/stocks/industry-rank?icid=zpiq-pb-irm'
	}

	industryData = {}
	# companyList = []
	for i in range(1,290): #1-244

		result = {}
		# premium_string=1&
		page = requests.get('https://www.zacks.com/zrank/zacks_industry_rank_data_handler.php?i='+str(i),headers=headers)
		contentStr = page.content
		end_index = contentStr.find('^')
		result['industry'] = contentStr[0:end_index]
		# print result['industry'], i
		if result['industry'] != 'NA':
			# print contentStr
			start_text = '"data"  : '
			start_index = contentStr.find(start_text)
			start_index+=len(start_text)
			end_index = contentStr.find(']',start_index)
			dataStr = contentStr[start_index:end_index+1]
			data = json.loads(dataStr);
			result['data'] = []
			for company in data:
				symbol = str(company['Symbol'])
				name = str(company['Company'])
				EPS_Estimate = str(company['EPS Estimate<br>(Current Yr)'])[1:]
				EPS_Suprise = getDivData(str(company['EPS Suprise<br>(Last Qtr)'])).split('%')[0]
				EPS_Suprise = EPS_Suprise.replace(',','')
				# print EPS_Suprise
				if 'no_report' in EPS_Suprise:
					EPS_Suprise = ''
				if 'no_report' in EPS_Estimate:
					EPS_Estimate = ''
				obj = {}
				obj['Symbol'] = getSecondInnerDivData(symbol)
				obj['Name'] = name
				obj['EPS_Estimate_Current_Yr'] = fixDecimal(EPS_Estimate,3)
				obj['EPS_Suprise_Last_Qtr'] = fixDecimal(EPS_Suprise,3)
				result['data'].append(obj)
				# companyList.append(obj)
			industryData[result['industry']] = result


	# print len(industryData.keys())
	# pp(industryData)
	return industryData

def getScoresFromBoxes(box):
	data = {}
	for row in box:
		key = row[0].text
		stock_value = row[1].text
		industry_value = row[2].text

		if stock_value==None and len(row[1])>0:stock_value = row[1][0].text
		if industry_value==None and len(row[2])>0:industry_value = row[2][0].text
		if key[-1]==' ': key=key[:-1]
		if key[-1]==' ': key=key[:-1]
		key = key.replace('.','').replace(' ','_')
		if stock_value == 'NA':stock_value=None
		if industry_value == 'NA':industry_value=None
		data[key] = {}
		data[key]['stock'] = stock_value
		data[key]['industry'] = industry_value
	return data

def populateScoreCards(scoreCard,data,scoreType):
	for key,value in data.iteritems():
		scoreCard['StockStyleScorecard'][scoreType][key]=value['stock']
		scoreCard['IndustryStyleScorecard'][scoreType][key]=value['industry']


def getStyleScorecard(symbol):
	symbol = symbol.upper()
	headers = {
		'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36',
		'Host':'www.zacks.com',
		'Referer':'https://www.zacks.com/stock/quote/'+symbol
	}
	scoreCard = {
		'StockStyleScorecard': {
			'Growth':{},'Value':{},'Momentum':{}
		},
		'IndustryStyleScorecard': {
			'Growth':{},'Value':{},'Momentum':{}
		}
	}
	page = requests.get('https://www.zacks.com/stock/research/'+symbol+'/stock-style-scores',headers=headers)
	tree = html.fromstring(page.content)

	valuebox = tree.xpath('//section[@id="value_vw2"]/table/tbody/tr')
	growthbox = tree.xpath('//section[@id="growth_vw2"]/table/tbody/tr')
	momentumbox = tree.xpath('//section[@id="momentum_vw2"]/table/tbody/tr')

	valueData = getScoresFromBoxes(valuebox)
	growthData = getScoresFromBoxes(growthbox)
	momentumData = getScoresFromBoxes(momentumbox)

	populateScoreCards(scoreCard,valueData,'Value')
	populateScoreCards(scoreCard,growthData,'Growth')
	populateScoreCards(scoreCard,momentumData,'Momentum')
	return scoreCard





# industryData,companyList = getIndustryWideEPS()

# symbolList = []
# for company in companyList:
# 	symbolList.append(company['Symbol'])

# print symbolList

# getIndustryDetails()
# pp(getIndustryDetails())
# ranks = getIndustryRanks()
# pp(ranks)

# def getSortValue(obj,key):
# 	return obj[1][key]

# sortedRanks= sorted(ranks.items(), key=lambda obj: getSortValue(obj,'average'))[:10]
# pp(sortedRanks)
# getInsiderTransactions('BXE')
# getPriceConsensus('gss')
# data = getEarnings('PPHM')
# pp(data)
# ========
# 	Main
# ========
# ticker = 'pfmt'
# print getZacksOpinion(ticker)
# print getZacksRank(ticker)
# print getZacksStyleScore(ticker)
# data = getStyleScorecard(ticker)
# pp(data)




