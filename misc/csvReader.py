from pprint import pprint as pp
import csv,json

etfs = {}
with open('ETFList_NA.csv') as csvfile:
	reader = csv.DictReader(csvfile)
	for row in reader:
		# print(row['Symbol'], row['Name'])
		etfs[row['Symbol']]=row['Name']



pp(etfs)