import requests
import json
from pprint import pprint as pp


def createURL(symbol):
	url = "https://api.stocktwits.com/api/2/streams/symbol/"+symbol.upper()+".json"
	return url

def getData(url):
	response = requests.get(url)
	json_data = response.content
	data = json.loads(json_data)
	return data

def getRecentSentiment(data):
	if "messages" not in data:
		return None
	messages = data["messages"]
	sentiment = {}
	sentiment['Bullish'] = 0
	sentiment['Bearish'] = 0
	sentiment['total'] = 0
	for message in messages:
		current = message['entities']['sentiment']
		if current != None:
			current = current['basic']
		# print '{0:10}\t{1}'.format(current,message['body'])
		if current == 'Bullish':
			sentiment['Bullish']+=1
		if current == 'Bearish':
			sentiment['Bearish']+=1
		sentiment['total']+=1
	return sentiment

def getSentiment(symbol):
	url = createURL(symbol.upper())
	data = getData(url)
	sentiment = getRecentSentiment(data)
	return sentiment