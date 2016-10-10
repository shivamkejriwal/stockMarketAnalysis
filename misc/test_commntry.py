import requests
import json
from pprint import pprint as pp




'''
__gads=ID=0fe9b19e0f3aefc5:T=1472615995:S=ALNI_MZBRv84DMzUNSUg-rKCpDBtc9YriQ; 
__qca=P0-871025690-1466656050886; 
new_zacks_username=shivamkejriwal%40gmail.com; 
optimizelyEndUserId=oeu1466654907525r0.39951506575272533; 
__atssc=google%3B1; 
__atuvc=0%7C35%2C0%7C36%2C0%7C37%2C0%7C38%2C1%7C39; 
s_cpc=0; 
etf_sv_scr_id=4154639; 
optimizelySegments=%7B%22160853778%22%3A%22search%22%2C%22160853779%22%3A%22none%22%2C%22160905530%22%3A%22false%22%2C%22160957294%22%3A%22gc%22%2C%226358043473%22%3A%22none%22%2C%226197520739%22%3A%22direct%22%2C%226189120877%22%3A%22false%22%2C%226187601133%22%3A%22gc%22%7D; 
optimizelyBuckets=%7B%7D; 
_mkto_trk=id:589-ZEA-685&token:_mch-zacks.com-1466654908239-57427; 
30ab6b980ea72ab67bdeef438a48bd12=cdaeeeba9b4a4c5ebf042c0215a7bb0e; 
screener_client=zacksredesign; 
ss_sv_scr_id=4161709; 
user_session=c853f10efe7123239d3d142eaa7fe9d7; 
ZUCSZID=Q0M3MUUzNTg4ODExMTAyREYzRQ%3D%3D; 
ZCCSUID=c7ff1804d6373641c0d4b2994ddc44b1; 
CUSTOMER_ID=358881110; 
USER_EMAIL=shivamkejriwal%40gmail.com; 
IS_PREMIUM_USER=1; 
scr_app=ss; 
s_evar10=Repeat; 
randDefinitionindex=22; 
s_prdcts=%5B%5B%271425%27%2C%271467965150544%27%5D%2C%5B%271651%27%2C%271475897282133%27%5D%2C%5B%271597%27%2C%271475908025530%27%5D%5D; 
com.silverpop.iMAWebCookie=3c4a5410-8014-c829-ea85-57c08a176242; 
s_campaign=361; 
__utma=181928748.1272482839.1466656051.1475903866.1475907933.10; __utmc=181928748; 
__utmz=181928748.1475907933.10.7.utmcsr=zacks.com|utmccn=(referral)|utmcmd=referral|utmcct=/research/screening/tracks/screen_details.php; 
s_evar7=1%3A30AM; s_evar8=Saturday; s_vnum=1478147215772%26vn%3D8; s_evar11=8; 
s_evar12=First%20Visit; s_sq=%5B%5BB%5D%5D; 
recentQuotes=AVID%2CAXTI%2CPRTS%2CHCHC%2CUAM; 
__unam=8b9872-1557b834fa7-527214e0-162; 
s_cm=Other%20Natural%20Referrersundefinedwww.google.com; 
PHPSESSID=14ova2457oajj2dp078d79krh2; 
ZTOKENID=bb922ba56b68b83fc8354e9cf43a1c0c; 
_gat=1; 
_sdsat_External Campaign Code=; 
_ga=GA1.2.1272482839.1466656051; 
s_v17=TOP_ONLINE_NAV; 
s_cc=true; 
s_fid=66D8C317EF59D125-02D504DE21F88B22; 
s_nr=1475969068203-Repeat; s_p42=%2Fvalueinvestor%2F; 
undefined_s=First%20Visit
'''



headers = {
	'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
}

cookie = {
	'IS_PREMIUM_USER': '1',
	'screener_client': 'zacksredesign',
	's_v17': 'TOP_ONLINE_NAV',
	's_cc': 'true',
	's_campaign': '361',
	'ZUCSZID': 'Q0M3MUUzNTg4ODExMTAyREYzRQ%3D%3D',
	'ZCCSUID': 'c7ff1804d6373641c0d4b2994ddc44b1',
	'ZTOKENID': '23520313a90c4554cb627ee70ca75cd0',
	'user_session': 'c853f10efe7123239d3d142eaa7fe9d7',
	'PHPSESSID': '14ova2457oajj2dp078d79krh2',
	'__gads': 'ID=0fe9b19e0f3aefc5:T=1472615995:S=ALNI_MZBRv84DMzUNSUg-rKCpDBtc9YriQ',
	'__qca': 'P0-871025690-1466656050886',
	'optimizelyEndUserId':'oeu1466654907525r0.39951506575272533',
	'__atuvc': '0%7C35%2C0%7C36%2C0%7C37%2C0%7C38%2C1%7C39',
	'etf_sv_scr_id': '4154639',
	's_cpc': '0'


}


index_url = 'https://www.zacks.com/valueinvestor/index.php'
commentary_url = 'https://www.zacks.com/valueinvestor/commentary.php'

response = requests.get(index_url, headers=headers, cookies=cookie)
data = response.content
pp(data)






