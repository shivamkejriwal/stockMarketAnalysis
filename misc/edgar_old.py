import urllib2
import re
from BeautifulSoup import *
from datetime import *

# symbols = ['YHOO', 'MU', 'AA', 'CI', 'EOG', 'ZMH', 'G', 'HON', 'IWM', 'WYE', 'JCP', 'OXY', 'AAPL', 'SBUX', 'MO', 'KLAC', 'SIRI', 'GDT', 'WMT', 'LLTC', 'PALM', 'EA', 'SUN', 'CL', 'JAVA', 'SMH', 'NBR', 'JNJ', 'GCI', 'SHLD', 'AMD', 'ORCL', 'ERIC', 'LEH', 'WLP', 'CAH', 'LXK', 'CAR', 'CVX', 'GE', 'DE', 'NTAP', 'BSC', 'VRSN', 'DNA', 'GENZ', 'ASKJ', 'BRCM', 'TGT', 'MCD', 'CMCS', 'KBH', 'SYMC', 'BAC', 'NCC', 'BSX', 'IR', 'UNH', 'F', 'ADBE', 'MDY', 'CCL', 'TASR', 'SCHW', 'GS', 'T', 'ADI', 'MON', 'HOG', 'DIA', 'SEPR', 'BTU', 'X', 'D', 'GILD', 'NEM', 'BUD', 'MET', 'CMX', 'AVP', 'MDT', 'QCOM', 'XLNX', 'XOM', 'AMGN', 'OSTK', 'AXP', 'AET', 'GLW', 'KMG', 'GM', 'MXIM', 'APOL', 'SGP', 'IBM', 'MS', 'SNDK', 'BA', 'KO', 'MER', 'RTH', 'M', 'FDC', 'PD', 'XLE', 'XLF', 'FLEX', 'KRB', 'UTX', 'TZOO', 'FDX', 'NKE', 'NXTL', 'DOW', 'HES', 'KSS', 'BP', 'BIIB', 'BBBY', 'SII', 'DELL', 'AIG', 'HIG', 'BBY', 'EBAY', 'RD', 'GPS', 'MERQE', 'PEP', 'IGT', 'CECO', 'ALL', 'NE', 'NOC', 'NVDA', 'JNPR', 'SLB', 'CBS', 'IMCL', 'PRU', 'BR', 'PFE', 'FITB', 'CME', 'PG', 'MMC', 'OSIP', 'VLO', 'C', 'MMM', 'VRTS', 'PGR', 'DVN', 'LEN', 'ALTR', 'PSFT', 'NSM', 'RIG', 'CFC', 'PHM', 'XMSR', 'DIS', 'BHI', 'BBH', 'NT', 'TWX', 'IACI', 'SPY', 'CSCO', 'FNM', 'MSI', 'INTC', 'NUE', 'TLT', 'HAL', 'ABT', 'BBRY', 'S', 'COF', 'TRV', 'IP', 'NVLS', 'BJS', 'LLY', 'WFT', 'HPQ', 'FCX', 'LMT', 'SPLS', 'NOK', 'WAG', 'TEVA', 'EXC', 'WM', 'PCAR', 'LU', 'MRK', 'COST', 'HD', 'LOW', 'ABC', 'DD', 'FRE', 'JPM', 'WB', 'USB', 'CAT', 'BLS', 'FOXA', 'CTX', 'EFA', 'COP', 'OIH', 'APA', 'CREE', 'ELN', 'MSFT', 'FRX', 'APC', 'SINA', 'AMZN', 'UPS', 'MRVL', 'QLGC', 'QQQ', 'GOOG', 'JDSU', 'BMY', 'EMC', 'WFC', 'VZ', 'ADSK', 'STT', 'AMAT', 'KMB', 'TXU', 'ITW', 'STJ', 'TXN', 'CCU', 'HCA', 'TYC', 'SYK', 'MAY', 'HOT', 'GD', 'TAP', 'AT', 'UCL', 'BMET', 'MRO', 'CVS', 'UNP', 'NOV', 'MHS', 'PBR', 'GIS', 'SLM', 'BK', 'DUK', 'SEBL', 'BNI', 'TOL', 'MCIP', 'XTO', 'IYR', 'TOT', 'OMC', 'AMX', 'HET', 'VALE', 'CA', 'BZH', 'ADP', 'MBI', 'ANF', 'WY', 'GSF', 'YRCW', 'AMTD', 'AGN', 'DHR', 'MGM', 'EEM', 'CHK', 'DO', 'SDS', 'EMR', 'EWJ', 'PCO', 'CELG', 'RKH', 'WFM', 'WYNN', 'IVV', 'ACI', 'PXD', 'ESV', 'SWN', 'TSO', 'A', 'SU', 'LM', 'MEE', 'ETR', 'MAR', 'WEN', 'GDW', 'RX', 'DHI', 'ECA', 'WHR', 'PTEN', 'N', 'CNX', 'UPL', 'RYL', 'ESRX', 'WMB', 'GLD', 'ABS', 'YUM', 'ACE', 'AMR', 'XL', 'CEPH', 'RMBS', 'EWZ', 'ADM', 'STX', 'SCCO', 'MNST', 'VIAB', 'RDC', 'ISRG', 'ATI', 'NSC', 'ABX', 'LRCX', 'CX', 'CHS', 'BOL', 'NIHD', 'LVS', 'AL', 'JOY', 'PEIX', 'BEN', 'BHP', 'TIE', 'NEE', 'LVLT', 'SUNE', 'ETFC', 'XLB', 'IWO', 'BIDU', 'NYX', 'COH', 'USG', 'GG', 'CSX', 'IBB', 'CMI', 'AKAM', 'Q', 'BAX', 'FTO', 'XLU', 'CAL', 'PEG', 'GRMN', 'ATYT', 'RHT', 'EOP', 'CAM', 'LUV', 'AEO', 'DTV', 'SWY', 'ICE', 'CC', 'MA', 'UAL', 'HUM', 'QID', 'POT', 'EWW', 'ALU', 'MDLZ', 'SPG', 'FXI', 'MEDI', 'MHFI', 'IMB', 'MTG', 'TMO', 'MCO', 'USO', 'BXP', 'VNO', 'CCJ', 'KR', 'CTSH', 'LTD', 'ASN', 'NMX', 'FWLT', 'DNDN', 'IWN', 'TSM', 'CROX', 'NRG', 'AV', 'STI', 'IPS', 'ABK', 'FSLR', 'FLR', 'RTN', 'TWM', 'LYO', 'UBB', 'XLI', 'JWN', 'HLT', 'QLD', 'PCP', 'PLD', 'DRYS', 'CHL', 'CF', 'PTR', 'SKF', 'EWY', 'SPWR', 'IWD', 'IWF', 'LDK', 'LFC', 'CNQ', 'STP', 'SSO', 'DXD', 'MOS', 'CBH', 'VMW', 'MT', 'PNC', 'NVT', 'CY', 'AEM', 'AFL', 'FXP', 'BEAS', 'BBT', 'SRS', 'AGU', 'AUY', 'IYF', 'BBD', 'UBS', 'EWT', 'XLY', 'TJX', 'NLY', 'BG', 'GDX', 'SLV', 'WWY', 'PM', 'IWS', 'ANR', 'UYG', 'DUG', 'EP', 'RF', 'ETN', 'AKS', 'EDS', 'MTL', 'V', 'NBL', 'SOHU', 'TRA', 'WLT', 'CLF', 'WDC', 'VNQ', 'FDG', 'UNG', 'KBE', 'NTRS', 'DIG', 'DDM', 'XRT', 'HK', 'HBC', 'UST', 'PX', 'EEV', 'VTI', 'ROH', 'IWR', 'PSA', 'AVB', 'SMN', 'SO', 'IWB', 'RDS', 'BRK', 'AMT', 'XLK', 'XLV', 'COV', 'CB', 'EQR', 'OEF', 'SPXS', 'ESI', 'AON', 'FAZ', 'SPXL', 'TNA', 'AZO', 'KGC', 'FAS', 'TBT', 'HCP', 'SH', 'TZA', 'ATVI', 'PCL', 'LNC', 'RIO', 'VWO', 'ERX', 'KEY', 'ITUB', 'ACN', 'TCK', 'GNW', 'PCLN', 'XME', 'BRCD', 'UPRO', 'UYM', 'ACL', 'DAL', 'VXX', 'XLP', 'BUCY', 'NFLX', 'FXE', 'XOP', 'SPXU', 'CRM', 'VOD', 'MCK', 'INTU', 'CTXS', 'JCI', 'BLK', 'SLW', 'NVS', 'CMG', 'FFIV', 'AGQ', 'MCP', 'LYB', 'ZSL', 'LULU', 'CTL', 'IAU', 'RL', 'GMCR', 'JNK', 'HYG', 'GR', 'LQD', 'TVIX', 'LNKD', 'MMI', 'SHW', 'HSH', 'RRC', 'EXPE', 'UVXY', 'ZNGA', 'AGNC', 'XHB', 'EQIX', 'DG', 'MPC', 'ARNA', 'KORS', 'XIV', 'FB', 'NXY', 'PSX', 'DLTR', 'TWC', 'KRFT', 'DFS', 'KMI', 'HLF', 'DDD', 'ABBV', 'LBTY', 'HNZ', 'HFC', 'VMED', 'PPG', 'HTZ', 'TSLA', 'LIFE', 'DXJ', 'REGN']
symbols = ['HEB']

agg_purchase_dates = dict()

for symbol in symbols:
  # find cik
	response1 = urllib2.urlopen('http://www.sec.gov/cgi-bin/browse-edgar?owner=exclude&action=getcompany&CIK='+symbol)
	search_results = response1.read()
	
	try:
		cik = re.findall('<input type="hidden" name="CIK" value="(.+?)">', search_results)[0]
	except:
		continue

	darray = []

	# find purchases
	i = 0
	while i >= 0 and i < 10000:
		print symbol+' - '+str(i) # log
		sresponse = urllib2.urlopen('http://www.sec.gov/cgi-bin/own-disp?action=getissuer&CIK='+cik+'&start='+str(i))
		transactions_page = sresponse.read()
		
		try:
			html_table = re.findall('<table border="0" cellspacing="1">(.+?)</table>', transactions_page, re.S)[0].strip()
		except:
			continue

		soup = BeautifulSoup(html_table)

		rows = soup.findAll('tr')
		for tr in rows:
			cols = tr.findAll('td')
			temp = []
			for td in cols:
				try:
					text = ''.join(td.find(text=True))
					temp.append(text)
				except:
					pass
			darray.append(temp)

		i += 80
		
		# detect when to stop searching
		if "Next 80" not in transactions_page:
			i = -1
	
	purchase_dates = []
	for item in darray[2:]:
		try:
			# convert string to datetime and add 2 days to account for filing delay
			if len(item) > 3:
				if 'Purchase' in item[4] and item[3] == '4':
					# convert string to datetime and add 2 days to account for filing delay
					datetime = datetime.strptime(item[1], '%Y-%m-%d') + timedelta(days=2)
					purchase_dates.append(datetime.date())
		except:
			pass
	
	agg_purchase_dates[symbol] = purchase_dates

# start writing file
f = open('edgar_data.csv','w')
f.truncate()
f.write('date,'+','.join(symbols)+'\n')

# go from 1/1/2005 to 8/5/2013
date_cycle = datetime.strptime('2005-01-01', '%Y-%m-%d')
while date_cycle != datetime.strptime('2013-08-05', '%Y-%m-%d'):
	line = str(date_cycle.date())+','
	for symbol in symbols:
		try:
			line += agg_purchase_dates[symbol].count(date_cycle.date())+','
		except:
			line += '0,'
	line = line[:-1] # remove last ,
	f.write(line+'\n')
	date_cycle = date_cycle + timedelta(days=1)