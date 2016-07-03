import numpy as np
import pandas as pd
import cPickle
from datetime import datetime, timedelta

'''
check chnage in volume
ema 200 vs 50
Money Flow Index (MFI)
Force Index
'''

def moving_average(values, window, type = "simple"):
    if type == 'simple':
        weights = np.ones(window)
    else:
        weights = np.exp(np.linspace(-1., 0., window))
    weights /= weights.sum()
    ave = np.convolve(values, weights, 'full')[:len(values)]
    ave[:window] = ave[window]
    return ave

def moving_average_convergence(values, nslow=26, nfast=12):
    """
    compute the MACD (Moving Average Convergence/Divergence) using a fast and slow exponential moving avg'
    return value is emaslow, emafast, macd which are len(x) arrays
    """
    emaslow = moving_average(values, nslow, type='exponential')
    emafast = moving_average(values, nfast, type='exponential')
    # rem_size = len(emafast) - len(emaslow)
    # emaslow = np.append(np.zeros(rem_size), emaslow, axis=0)
    return emaslow, emafast, emafast - emaslow

def relative_strength(prices, n=14):
    """
    compute the n period relative strength indicator
    http://stockcharts.com/school/doku.php?id=chart_school:glossary_r#relativestrengthindex
    http://www.investopedia.com/terms/r/rsi.asp
    """

    deltas = np.diff(prices)
    seed = deltas[:n+1]
    up = seed[seed >= 0].sum()/n
    down = -seed[seed < 0].sum()/n
    rs = up/down
    rsi = np.zeros_like(prices)
    rsi[:n] = 100. - 100./(1. + rs)

    for i in range(n, len(prices)):
        delta = deltas[i - 1]  # cause the diff is 1 shorter

        if delta > 0:
            upval = delta
            downval = 0.
        else:
            upval = 0.
            downval = -delta

        up = (up*(n - 1) + upval)/n
        down = (down*(n - 1) + downval)/n

        rs = up/down
        rsi[i] = 100. - 100./(1. + rs)

    return rsi

def vroc(volumes, window=1):

    vroc = [0] * window
    for index in range(window,len(volumes)):
        current = volumes[index]
        past = volumes[index-window]
        current_vroc = ((current/past)-1)
        vroc.append(current_vroc)

    # print "vroc:",vroc
    return vroc
