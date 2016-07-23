import json
import requests
import config as config
import urllib
from pprint import pprint as pp
google_server_key = config.google_server_key
google_browser_key = config.google_browser_key

# "https://kgsearch.googleapis.com/v1/entities:search?query=taylor+swift&key=API_KEY&limit=1&indent=True"
# "https://kgsearch.googleapis.com/v1/entities:search?ids=/m/03p386x"

def getAuthorizedURL(url):
	AuthorizedURL = url+'&key='+google_server_key
	return AuthorizedURL

def getData(url):
	AuthorizedURL = getAuthorizedURL(url)
	print AuthorizedURL
	response = requests.get(AuthorizedURL)
	json_data = response.content
	data = json.loads(json_data)
	# if 'error' in data:
	# 	print data['error']
	return data

def createURL(query,limit=None,indent=None):
	# f = { 'eventName' : 'myEvent', 'eventDescription' : "cool event"}
	# urllib.urlencode(f)
	host = "https://kgsearch.googleapis.com/v1/entities:search?"
	query_str="query="+urllib.quote_plus(query)
	if limit != None:
		limit_str = "limit="+limit
	if indent != None:
		indent_str = "indent="+indent
	return host+query_str

url =  createURL("taylor swift")
print getData(url)