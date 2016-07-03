from lxml import html
import requests
# import sys
# reload(sys)
# sys.setdefaultencoding('utf-8')


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
	interpretation = None

	symbol = symbol.upper()
	page = requests.get('https://www.zacks.com/stock/quote/'+symbol)
	tree = html.fromstring(page.content)
	rankbox = tree.xpath('//div[@class="zr_rankbox"]/span/text()')

	for item in rankbox:
		value = str(item.encode('utf-8').strip())
		if isInteger(value):
			rank = int(value)

	interpretation_mapping = {
		1:"Strong Buy",
		2:"Buy",
		3:"Hold",
		4:"Sell",
		5:"Strong Sell"
	}

	if rank != None:
		interpretation = interpretation_mapping[rank]

	return rank, interpretation

# print getZacksRank("thld")