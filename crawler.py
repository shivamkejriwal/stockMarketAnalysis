from lxml import html
import requests

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


def isInteger(s):
    try: 
        int(s)
        return True
    except ValueError:
        return False


def getZacksRank(symbol):
	'''
	This is zacks short term rating system that 
	serves as a timeliness indicator for stocks 
	over the next 1 to 3 months.
	Strong Buy ==> 25.71 percent Annualized Return
	Buy ==> 18.12 percent Annualized Return
	'''
	rank = None
	suggestion = None

	symbol = symbol.upper()
	page = requests.get('https://www.zacks.com/stock/quote/'+symbol)
	tree = html.fromstring(page.content)

	rankbox = tree.xpath('//div[@class="zr_rankbox"]/span')
	if len(rankbox) > 1:
		rank = int(rankbox[0].text)
		suggestion = getSuggestion(rank)

	return rank, suggestion

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
	rank = {
		"Rank": None,
		"Suggestion":None
	}
	style_score  = {
		"Value":None,
		"Growth":None,
		"Momentum":None,
		"VGM":None,
	}
	symbol = symbol.upper()
	page = requests.get('https://www.zacks.com/stock/quote/'+symbol)
	tree = html.fromstring(page.content)
	rankbox = tree.xpath('//div[@class="zr_rankbox"]/span')
	stylebox = tree.xpath('//div[@class="composite_group"]/p/span')
	if len(rankbox) > 1:
		rank["Rank"] = int(rankbox[0].text)
		rank["Suggestion"] = getSuggestion(rank["Rank"])

	if len(stylebox) > 1:
		style_score  = {
			"Value":stylebox[1].text,
			"Growth":stylebox[2].text,
			"Momentum":stylebox[3].text,
			"VGM":stylebox[4].text,
		}
	return rank, style_score


'''
import concurrent.futures
workers_data = None
results = {}

def worker(symbol):
	print symbol+" : Started"
	rank, rank_type = getZacksRank(symbol)
	# print symbol, rank, rank_type
	# row_index = workers_data[workers_data["Symbol"] == symbol].index
	# print symbol, ": index:",row_index
	global results
	results[symbol] = {
		'zacks_rank': rank,
		'zacks_rank_type':rank_type
	}
	# workers_data.set_value(row_index, 'zacks_rank', rank)
	# workers_data.set_value(row_index, 'zacks_rank_type', rank_type)
	print symbol+" : Done"

def getZacksRankInParallel(data):
	global workers_data
	workers_data = data
	workers_data["zacks_rank"] = ""
	workers_data["zacks_rank_type"] = ""
	symbols = workers_data["Symbol"].tolist()
	with concurrent.futures.ProcessPoolExecutor(max_workers=len(symbols)) as executor:
		for symbol in symbols:
			executor.submit(worker, symbol)
	print results
	return workers_data
'''



# ticker = 'scon'
# print getZacksOpinion(ticker)
# print getZacksRank(ticker)
# print getZacksStyleScore(ticker)
