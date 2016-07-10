from lxml import html
import requests

def getConsensusRating(symbol):
	symbol = symbol.upper()
	page = requests.get('https://closingbell.co/stocks/'+symbol)
	tree = html.fromstring(page.content)
	result = {
		"Rating":None,
		"Price_Target":None,
		"Analysts_Polled":None
	}
	consensus = tree.xpath('//div[@class="widget widget-consensus with-title group-top"]/ul/li/label/span/text()')

	if len(consensus) < 1:
		return result

	Rating = consensus[1].replace('\t', '').replace('\n', '')
	Price_Target = consensus[3].replace('\t', '').replace('\n', '')
	Analysts_Polled = consensus[5].replace('\t', '').replace('\n', '')

	if Rating == "":
		Rating = None

	if Price_Target == "" or Price_Target == "Price Target":
		Price_Target = None

	if Analysts_Polled == "Analysts Polled":
		Analysts_Polled = consensus[6].replace('\t', '').replace('\n', '')
	if Analysts_Polled == "":
		Analysts_Polled = None

	result = {
		"Rating":Rating,
		"Price_Target":Price_Target,
		"Analysts_Polled":Analysts_Polled
	}
	return result


print getConsensusRating("appl")