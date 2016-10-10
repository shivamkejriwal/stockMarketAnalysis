
import requests
import json
from pprint import pprint as pp




def getData(count):

	headers = {
		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
	}

	response = requests.get('https://www.zacks.com/proxy.php?proxy_url=widget3.zacks.com/commentary/archive/json/'+str(count)+'/BLOG/1', headers=headers)
	json_data = response.content
	data = json.loads(json_data)
	return data


for count in range(200,500):
	data = getData(count)
	try:
		print count,":",data[0]['type']
	except: pass