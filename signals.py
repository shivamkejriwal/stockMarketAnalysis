import numpy as np
import pandas as pd
import cPickle
from datetime import datetime, timedelta
import technicalIndicators as tech_indicators

'''
To-Do
converts indicator into bearish, bullish signals
Try: strong_buy, buy, hold, sell, strong_sell
'''


'''
======================
 Basic Indicator
======================
'''

#200 ema > closing
def emaSlow(prices):
	closing_price = prices[-1]
	ema = moving_average(values, 200, type='exponential')
	closing_ema = ema[-1]
	if closing_ema > closing:
		return 1
	return 0

#50 ema > closing
def emaFast(prices):
	closing_price = prices[-1]
	ema = moving_average(values, 50, type='exponential')
	closing_ema = ema[-1]
	if closing_ema > closing:
		return 1
	return 0

#50 ema > 200 ema
def emaCheck(prices):
	ema_slow = moving_average(values, 200, type='exponential')
	ema_fast = moving_average(values, 50, type='exponential')
	if ema_fast > ema_slow :
		# check
		return 1
	return 0

#Macd vs 9D signal line
def macdCheck(prices):
	'''
    signal 	= -1,-1,0,1,1
    macd 	= 1,1,0,-1,-1
    signal-macd = -2,-2,0,2,2
    bear: signal-macd<0
 	bull: signal-macd>0
 	'''
	emaslow, emafast, macd = tech_indicators.moving_average_convergence(prices)
	ema9 = tech_indicators.moving_average(macd, 9, type='exponential')
	change  = np.greater(ema9[-10:] , macd[-10:])
	current = np.mean(change[-5:])
	past = np.mean(cchange[-10:-5])
	if current > past:
		return 1
	return 0

#RSI <30 or >70
def rsiCheck(prices):
	rsi = tech_indicators.relative_strength(prices)
	if rsi <=30:
		return -1
	if rsi >=70:
		return 1
	return 0

def volumeCheck(volumes):
	return 0



'''
======================
 Short Term Indicator
======================
'''

'''
7 day adi
10-8 day MA hillo Channel
20 day MA vs price
20 - 50 day Macd
20 day bolinger bands
20 day average volume
'''


'''
======================
 Market Indicators
======================
'''

'''
sector wide performace - gauge sector performace
exchange wide performace - gauge world market performace
Zacks Industry Rank :-
	The Zacks Industry Rank assigns a rating to each of the 265 X (Expanded) 
	Industries based on their average Zacks Rank. An industry with a larger 
	percentage of Zacks Rank #1's and #2's will have a better average Zacks 
	Rank than one with a larger percentage of Zacks Rank #4's and #5's.
	The industry with the best average Zacks Rank would be considered the top 
	industry (1 out of 265), which would place it in the top 1% of Zacks Ranked 
	Industries. The industry with the worst average Zacks Rank (265 out of 265) 
	would place in the bottom 1%. 
'''


