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


def getZacksRank(symbol):
	rank = {
		"Rank": None,
		"Suggestion":None
	}

	symbol = symbol.upper()
	page = requests.get('https://www.zacks.com/stock/quote/'+symbol)
	tree = html.fromstring(page.content)

	rankbox = tree.xpath('//div[@class="zr_rankbox"]/span')
	if len(rankbox) > 1:
		rank["Rank"] = int(rankbox[0].text)
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
	if len(rankbox) > 1:
		opinon["Rank"] = int(rankbox[0].text)
		opinon["Suggestion"] = getSuggestion(opinon["Rank"])

	if len(stylebox) > 1:
		opinon["Style_Score"]  = {
			"Value":stylebox[1].text,
			"Growth":stylebox[2].text,
			"Momentum":stylebox[3].text,
			"VGM":stylebox[4].text,
		}
	return opinon

# ========
# 	Main
# ========
# ticker = 'scon'
# print getZacksOpinion(ticker)
# print getZacksRank(ticker)
# print getZacksStyleScore(ticker)