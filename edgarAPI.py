from lxml import html
import requests
import json
import xmltodict
import config as config
from pprint import pprint as pp
from datetime import datetime,timedelta
EDGAR_Key = config.EDGAR_Key

# symbols = ['YHOO', 'MU', 'AA', 'CI', 'EOG', 'ZMH', 'G', 'HON', 'IWM', 'WYE', 'JCP', 'OXY', 'AAPL', 'SBUX', 'MO', 'KLAC', 'SIRI', 'GDT', 'WMT', 'LLTC', 'PALM', 'EA', 'SUN', 'CL', 'JAVA', 'SMH', 'NBR', 'JNJ', 'GCI', 'SHLD', 'AMD', 'ORCL', 'ERIC', 'LEH', 'WLP', 'CAH', 'LXK', 'CAR', 'CVX', 'GE', 'DE', 'NTAP', 'BSC', 'VRSN', 'DNA', 'GENZ', 'ASKJ', 'BRCM', 'TGT', 'MCD', 'CMCS', 'KBH', 'SYMC', 'BAC', 'NCC', 'BSX', 'IR', 'UNH', 'F', 'ADBE', 'MDY', 'CCL', 'TASR', 'SCHW', 'GS', 'T', 'ADI', 'MON', 'HOG', 'DIA', 'SEPR', 'BTU', 'X', 'D', 'GILD', 'NEM', 'BUD', 'MET', 'CMX', 'AVP', 'MDT', 'QCOM', 'XLNX', 'XOM', 'AMGN', 'OSTK', 'AXP', 'AET', 'GLW', 'KMG', 'GM', 'MXIM', 'APOL', 'SGP', 'IBM', 'MS', 'SNDK', 'BA', 'KO', 'MER', 'RTH', 'M', 'FDC', 'PD', 'XLE', 'XLF', 'FLEX', 'KRB', 'UTX', 'TZOO', 'FDX', 'NKE', 'NXTL', 'DOW', 'HES', 'KSS', 'BP', 'BIIB', 'BBBY', 'SII', 'DELL', 'AIG', 'HIG', 'BBY', 'EBAY', 'RD', 'GPS', 'MERQE', 'PEP', 'IGT', 'CECO', 'ALL', 'NE', 'NOC', 'NVDA', 'JNPR', 'SLB', 'CBS', 'IMCL', 'PRU', 'BR', 'PFE', 'FITB', 'CME', 'PG', 'MMC', 'OSIP', 'VLO', 'C', 'MMM', 'VRTS', 'PGR', 'DVN', 'LEN', 'ALTR', 'PSFT', 'NSM', 'RIG', 'CFC', 'PHM', 'XMSR', 'DIS', 'BHI', 'BBH', 'NT', 'TWX', 'IACI', 'SPY', 'CSCO', 'FNM', 'MSI', 'INTC', 'NUE', 'TLT', 'HAL', 'ABT', 'BBRY', 'S', 'COF', 'TRV', 'IP', 'NVLS', 'BJS', 'LLY', 'WFT', 'HPQ', 'FCX', 'LMT', 'SPLS', 'NOK', 'WAG', 'TEVA', 'EXC', 'WM', 'PCAR', 'LU', 'MRK', 'COST', 'HD', 'LOW', 'ABC', 'DD', 'FRE', 'JPM', 'WB', 'USB', 'CAT', 'BLS', 'FOXA', 'CTX', 'EFA', 'COP', 'OIH', 'APA', 'CREE', 'ELN', 'MSFT', 'FRX', 'APC', 'SINA', 'AMZN', 'UPS', 'MRVL', 'QLGC', 'QQQ', 'GOOG', 'JDSU', 'BMY', 'EMC', 'WFC', 'VZ', 'ADSK', 'STT', 'AMAT', 'KMB', 'TXU', 'ITW', 'STJ', 'TXN', 'CCU', 'HCA', 'TYC', 'SYK', 'MAY', 'HOT', 'GD', 'TAP', 'AT', 'UCL', 'BMET', 'MRO', 'CVS', 'UNP', 'NOV', 'MHS', 'PBR', 'GIS', 'SLM', 'BK', 'DUK', 'SEBL', 'BNI', 'TOL', 'MCIP', 'XTO', 'IYR', 'TOT', 'OMC', 'AMX', 'HET', 'VALE', 'CA', 'BZH', 'ADP', 'MBI', 'ANF', 'WY', 'GSF', 'YRCW', 'AMTD', 'AGN', 'DHR', 'MGM', 'EEM', 'CHK', 'DO', 'SDS', 'EMR', 'EWJ', 'PCO', 'CELG', 'RKH', 'WFM', 'WYNN', 'IVV', 'ACI', 'PXD', 'ESV', 'SWN', 'TSO', 'A', 'SU', 'LM', 'MEE', 'ETR', 'MAR', 'WEN', 'GDW', 'RX', 'DHI', 'ECA', 'WHR', 'PTEN', 'N', 'CNX', 'UPL', 'RYL', 'ESRX', 'WMB', 'GLD', 'ABS', 'YUM', 'ACE', 'AMR', 'XL', 'CEPH', 'RMBS', 'EWZ', 'ADM', 'STX', 'SCCO', 'MNST', 'VIAB', 'RDC', 'ISRG', 'ATI', 'NSC', 'ABX', 'LRCX', 'CX', 'CHS', 'BOL', 'NIHD', 'LVS', 'AL', 'JOY', 'PEIX', 'BEN', 'BHP', 'TIE', 'NEE', 'LVLT', 'SUNE', 'ETFC', 'XLB', 'IWO', 'BIDU', 'NYX', 'COH', 'USG', 'GG', 'CSX', 'IBB', 'CMI', 'AKAM', 'Q', 'BAX', 'FTO', 'XLU', 'CAL', 'PEG', 'GRMN', 'ATYT', 'RHT', 'EOP', 'CAM', 'LUV', 'AEO', 'DTV', 'SWY', 'ICE', 'CC', 'MA', 'UAL', 'HUM', 'QID', 'POT', 'EWW', 'ALU', 'MDLZ', 'SPG', 'FXI', 'MEDI', 'MHFI', 'IMB', 'MTG', 'TMO', 'MCO', 'USO', 'BXP', 'VNO', 'CCJ', 'KR', 'CTSH', 'LTD', 'ASN', 'NMX', 'FWLT', 'DNDN', 'IWN', 'TSM', 'CROX', 'NRG', 'AV', 'STI', 'IPS', 'ABK', 'FSLR', 'FLR', 'RTN', 'TWM', 'LYO', 'UBB', 'XLI', 'JWN', 'HLT', 'QLD', 'PCP', 'PLD', 'DRYS', 'CHL', 'CF', 'PTR', 'SKF', 'EWY', 'SPWR', 'IWD', 'IWF', 'LDK', 'LFC', 'CNQ', 'STP', 'SSO', 'DXD', 'MOS', 'CBH', 'VMW', 'MT', 'PNC', 'NVT', 'CY', 'AEM', 'AFL', 'FXP', 'BEAS', 'BBT', 'SRS', 'AGU', 'AUY', 'IYF', 'BBD', 'UBS', 'EWT', 'XLY', 'TJX', 'NLY', 'BG', 'GDX', 'SLV', 'WWY', 'PM', 'IWS', 'ANR', 'UYG', 'DUG', 'EP', 'RF', 'ETN', 'AKS', 'EDS', 'MTL', 'V', 'NBL', 'SOHU', 'TRA', 'WLT', 'CLF', 'WDC', 'VNQ', 'FDG', 'UNG', 'KBE', 'NTRS', 'DIG', 'DDM', 'XRT', 'HK', 'HBC', 'UST', 'PX', 'EEV', 'VTI', 'ROH', 'IWR', 'PSA', 'AVB', 'SMN', 'SO', 'IWB', 'RDS', 'BRK', 'AMT', 'XLK', 'XLV', 'COV', 'CB', 'EQR', 'OEF', 'SPXS', 'ESI', 'AON', 'FAZ', 'SPXL', 'TNA', 'AZO', 'KGC', 'FAS', 'TBT', 'HCP', 'SH', 'TZA', 'ATVI', 'PCL', 'LNC', 'RIO', 'VWO', 'ERX', 'KEY', 'ITUB', 'ACN', 'TCK', 'GNW', 'PCLN', 'XME', 'BRCD', 'UPRO', 'UYM', 'ACL', 'DAL', 'VXX', 'XLP', 'BUCY', 'NFLX', 'FXE', 'XOP', 'SPXU', 'CRM', 'VOD', 'MCK', 'INTU', 'CTXS', 'JCI', 'BLK', 'SLW', 'NVS', 'CMG', 'FFIV', 'AGQ', 'MCP', 'LYB', 'ZSL', 'LULU', 'CTL', 'IAU', 'RL', 'GMCR', 'JNK', 'HYG', 'GR', 'LQD', 'TVIX', 'LNKD', 'MMI', 'SHW', 'HSH', 'RRC', 'EXPE', 'UVXY', 'ZNGA', 'AGNC', 'XHB', 'EQIX', 'DG', 'MPC', 'ARNA', 'KORS', 'XIV', 'FB', 'NXY', 'PSX', 'DLTR', 'TWC', 'KRFT', 'DFS', 'KMI', 'HLF', 'DDD', 'ABBV', 'LBTY', 'HNZ', 'HFC', 'VMED', 'PPG', 'HTZ', 'TSLA', 'LIFE', 'DXJ', 'REGN']
# symbols = ['HEB']


def getAuthorizedURL(url):
	AuthorizedURL = url+'&appkey='+EDGAR_Key
	return AuthorizedURL

def fixData(data):
	result = []
	# print "totalrows:",data['result']['totalrows']
	# print "row count:",len(data['result']['rows'])
	for rows in data['result']['rows']:
		obj = {}
		for item in rows['values']:
			key =  item['field']
			value = item['value']
			obj[key] = value
		result.append(obj)
	return result


def getData(url):
	response = requests.get(getAuthorizedURL(url))
	json_data = response.content
	data = json.loads(json_data)
	if 'result' in data:
		data = fixData(data)
	return data


def create_insider_trade_URL(ticker, data_type='filers'):
	# data_type='filers' or 'issues'
	ticker = ticker.upper()
	url = 'http://edgaronline.api.mashery.com/v2/insiders/'
	data_type_str = data_type+'?'
	ticker_str = 'issuetickers='+ticker
	return url+data_type_str+ticker_str


def getInsiderTrades(ticker):
	ticker = ticker.upper()
	url = create_insider_trade_URL(ticker,'issues')
	data = getData(url)
	return data

def getInsiderSignal(ticker):
	data = getInsiderTrades(ticker)
	count = 0
	buy_signals = 0
	sell_signals = 0
	past_date = datetime.now() - timedelta(days=31*4)
	for row in data:
		date_object = datetime.strptime(row['transactiondate'], '%m/%d/%Y')
		if date_object > past_date:
			# print row['transactiondate'],row['relationship'],row['transactiontype'],row['price']#,row['transactionpricefrom']
			# pp(row)
			count+=1
			if row['transactiontype'] in ['Buy', 'Acquisition (Non Open Market)', 'Automatic Buy']:
				buy_signals+=1
			if row['transactiontype'] in ['Sell', 'Disposition (Non Open Market)', 'Automatic Sell']:
				sell_signals+=1
	# print "signal:",buy_signals, sell_signals
	total = max(buy_signals+sell_signals,1)
	signal = float(buy_signals - sell_signals)/float(total)
	return signal

print getInsiderSignal("gevo")



