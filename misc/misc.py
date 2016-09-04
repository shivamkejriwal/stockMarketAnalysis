def volumeChange(volumes):

    print "volumes:",volumes
    last_day = volumes[-1]
    last_three_day = np.average(volumes[-3])
    last_week = np.average(volumes[-7])

    one_day = np.average(volumes[-2:-1])
    three_day = np.average(volumes[-4:-1])
    one_week = np.average(volumes[-8:-1])
    two_week = np.average(volumes[-14:-1])
    one_month = np.average(volumes[-31:-1])

    change = {
        "one_day": (last_day-one_day)/last_day,
        "three_day": (last_day-three_day)/last_day,
        "one_week": (last_day-one_week)/last_day,
        "two_week": (last_day-two_week)/last_day,
        "one_month": (last_day-one_month)/last_day
    }

    change_vroc = {
        "one_day": ((last_day/one_day)-1)*100,
        "three_day": ((last_day/three_day)-1)*100,
        "one_week": ((last_day/one_week)-1)*100,
        "two_week": ((last_day/two_week)-1)*100,
        "one_month": ((last_day/one_month)-1)*100
    }
    pp(change)
    pp(change_vroc)
    # print three_day,one_week,two_week,one_month



    # def printData(data):
#   print('IPOyear\tSymbol\tLastSale\tZacks_Score(V,G,M)\tMarketCap\tSector\t\t\tIndustry')
#   # print "Headers:", data.columns.values
#   template_small = '{0:7}\t{1:4}\t{2:6}\t\t{3}-{4}({5},{6},{7})\t\t{8:10}\t{9:20}\t\t{10:<}'
#   template_big = '{0:7}\t{1:4}\t{2:6}\t\t{3}-{4}({5},{6},{7})\t{8:10}\t{9:20}\t\t{10:<}'
#   for index, row in data.iterrows():
#       template = template_small
#       if row['zacks_rank']==1 or row['zacks_rank']==5:
#           template = template_big 
#       print(template.format(row['IPOyear'],row['Symbol'],row['LastSale']
#           ,row['zacks_rank'],row['zacks_suggestion']
#           ,row['zacks_score_Value'],row['zacks_score_Growth'],row['zacks_score_Momentum']
#           ,row['MarketCap'],row['Sector'],row['industry']))
# 
# def populateZacksResearch(data, max_rank=3):
#     symbols = data["Symbol"].tolist()
#     data["zacks_rank"] = ""
#     data["zacks_suggestion"] = ""
#     for symbol in symbols:
#         # rank, rank_type = crawler.getZacksRank(symbol)
#         zacks_opinion = zacks.getZacksOpinion(symbol)
#         rank = zacks_opinion["Rank"]
#         row_index = data[data["Symbol"] == symbol].index
#         if not isValidStock(zacks_opinion):
#             data = data.drop(row_index)
#         else :
#             data.set_value(row_index, 'zacks_rank', zacks_opinion["Rank"])
#             data.set_value(row_index, 'zacks_suggestion', zacks_opinion["Suggestion"])
#             data.set_value(row_index, 'zacks_score_Value', zacks_opinion["Style_Score"]["Value"])
#             data.set_value(row_index, 'zacks_score_Growth', zacks_opinion["Style_Score"]["Growth"])
#             data.set_value(row_index, 'zacks_score_Momentum', zacks_opinion["Style_Score"]["Momentum"])
#             sentiment = stockTwits.getSentiment(symbol)
#             if sentiment != None:
#               sentiment_value = (sentiment["Bullish"]-sentiment["Bearish"])/ (sentiment["Bullish"]+sentiment["Bearish"])
#               data.set_value(row_index, 'sentiment', sentiment_value)
#             print symbol, rank, zacks_opinion["Suggestion"], sentiment
#     return data
#
# def getShortList():
#   print "\n=================\nBuying Short List\n=================\n"
#   data = dataETL.getExchangeData(convert=True)
#   filters = {
#       'min_MarketCap':1000000, # $1,000,000 Mil
#       'max_LastSale':1.00,
#       'min_LastSale':.10,
#   }
#   print data.shape
#   data = dataETL.filterData(filters=filters, data=data)
#   print "Filtered:", data.shape
#   data = populateZacksResearch(data)
#   print "With Zacks Rank:",  data.shape
#   data.sort(['MarketCap','LastSale'], ascending=[0, 0])
#   printData(data)