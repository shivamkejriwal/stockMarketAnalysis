import numpy as np
import pandas as pd
import cPickle
from datetime import datetime, timedelta
import technicalIndicators as tech_indicators

'''
converts indicator into bearish, bullish signals

Try: strong_buy, buy, hold, sell, strong_sell
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
	emaslow, emafast, macd = tech_indicators.moving_average_convergence(prices)
    ema9 = tech_indicators.moving_average(macd, 9, type='exponential')
    #do something
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





