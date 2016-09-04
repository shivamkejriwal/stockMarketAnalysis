# def getIRR_simple(values):
# 	best_rate = 0
# 	min_pv = sys.maxint
# 	tolerance = .001
# 	rates = np.arange(0, 2, tolerance)
# 	for rate in rates:
		
# 		pv = abs(getPresentValue(values,rate))
# 		# print rate, pv, best_rate, min_pv
# 		if pv < min_pv:
# 			min_pv = pv
# 			best_rate = rate
# 			print 'found one'
		
# 	return best_rate


# def getBinVal(left,right,values,choices):
# 	mid = int(math.floor((left+right)/2))
# 	rate = choices[mid]
# 	total = getPresentValue(values,choices[mid])
# 	return abs(total)

# def getIRR(values):
# 	rate = 0
# 	tolerance = .0001
# 	choices = np.arange(0, 2, tolerance)

# 	left = 0
# 	right = len(choices)-1
# 	old_total = 0
# 	old_change_total = 1

# 	for steps in range(30):
# 		mid = int(math.floor((left+right)/2))
# 		rate = choices[mid]
# 		# total = getPresentValue(values,choices[mid])
# 		# change_total = abs(float(total-old_total)/float(old_total))
# 		target_left = getBinVal(left,mid,values,choices)
# 		target_right = getBinVal(mid,right,values,choices)
# 		print left, mid, right, target_left, target_right, rate
# 		if target_left<target_right:
# 			left = mid
# 		else:
# 			right = mid
		
# 		# if abs(total)<tolerance:
# 		# 	break
# 		# elif abs(total)<abs(old_total):
# 		# 	left=mid
# 		# else:
# 		# right=mid

# 		# old_total = total
# 		# old_change_total = change_total

# 	return rate


# def getFreeCashFlow(symbol,max_count, min_count=0):
# 	symbol = symbol.upper()
# 	url = 'https://widget3.zacks.com/data/zrs/json/{0}/free_cash_flow/www.zacks.com?periodicity=weekly'
# 	data = getData(symbol, url)
# 	values, name = getValues(data)
# 	rate = None
# 	flag = False
# 	while not flag and max_count>=min_count:
# 		print rate
# 		try:
# 			result = [value[1] for value in values[-1*max_count:]]
# 			# print len(result)
# 			rate = np.irr(result)
# 			if not math.isnan(rate):
# 				flag = True
# 		except:
# 			# print 'exception'
# 			pass
# 		max_count-=1


# 	result = { name:values }

# 	if flag:
# 		result['irr'] = rate
# 	else: 
# 		result['irr'] = None
# 	return result
# 	# print "irr1:",np.irr(result)
# 	# print "irr2:",getIRR_simple(result)
	
# 	# print irr