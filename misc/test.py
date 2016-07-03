import numpy as np
import pandas as pd
import cPickle
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
import quandl
from pandas_datareader import data, wb

from sklearn import preprocessing
from sklearn.ensemble import RandomForestClassifier
from sklearn import neighbors
from sklearn.ensemble import AdaBoostClassifier
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.qda import QDA


def getStock(symbol, start, end):
    """
    Downloads Stock from Yahoo Finance.
    Computes daily Returns based on Adj Close.
    Returns pandas dataframe.
    """
    # df =  pd.io.data.get_data_yahoo(symbol, start, end)
    df =  data.DataReader(symbol, 'yahoo', start, end)

    df.columns.values[-1] = 'AdjClose'
    df.columns = df.columns + '_' + symbol
    df['Return_%s' %symbol] = df['AdjClose_%s' %symbol].pct_change()
    
    return df


def getStockFromQuandl(symbol, name, start, end):
    """
    Downloads Stock from Quandl.
    Computes daily Returns based on Adj Close.
    Returns pandas dataframe.
    """
    quandl.ApiConfig.api_key = "zbJ7Hr8jdBZaxAXg9KTR"
    df =  quandl.get(symbol, trim_start=start, trim_end=end)

    df.columns.values[-1] = 'AdjClose'
    df.columns = df.columns + '_' + name
    df['Return_%s' %name] = df['AdjClose_%s' %name].pct_change()
    
    return df


def getStockDataFromWeb(fout, start, end):
    """
    Collects predictors data from Yahoo Finance and Quandl.
    Returns a list of dataframes.
    """
    # start = parser.parse(start_string)
    # end = parser.parse(end_string)
    
    nasdaq = getStock('^IXIC', start, end)
    frankfurt = getStock('^GDAXI', start, end)
    london = getStock('^FTSE', start, end)
    paris = getStock('^FCHI', start, end)
    hkong = getStock('^HSI', start, end)
    nikkei = getStock('^N225', start, end)
    australia = getStock('^AXJO', start, end)
    
    djia = getStockFromQuandl("YAHOO/INDEX_DJI", 'Djia', start, end) 
    
    out =  data.DataReader(fout, 'yahoo', start, end)

    out.columns.values[-1] = 'AdjClose'
    out.columns = out.columns + '_Out'
    out['Return_Out'] = out['AdjClose_Out'].pct_change()
    
    return [out, nasdaq, djia, frankfurt, london, paris, hkong, nikkei, australia]


def count_missing(dataframe):
    """
    count number of NaN in dataframe
    """
    return (dataframe.shape[0] * dataframe.shape[1]) - dataframe.count().sum()

"""
=============================================================
Feature Generation
=============================================================
"""



def addFeatures(dataframe, adjclose, returns, n):
    """
    operates on two columns of dataframe:
    - n >= 2
    - given Return_* computes the return of day i respect to day i-n. 
    - given AdjClose_* computes its moving average on n days

    """
    
    return_n = adjclose[9:] + "Time" + str(n)
    dataframe[return_n] = dataframe[adjclose].pct_change(n)
    
    roll_n = returns[7:] + "RolMean" + str(n)
    dataframe[roll_n] = pd.rolling_mean(dataframe[returns], n)


def applyRollMeanDelayedReturns(datasets, delta):
    """
    applies rolling mean and delayed returns to each dataframe in the list
    """
    for dataset in datasets:
        columns = dataset.columns    
        adjclose = columns[-2]
        returns = columns[-1]
        for n in delta:
            addFeatures(dataset, adjclose, returns, n)
    
    return datasets


def mergeDataframes(datasets, index, cut):
    """
    merges datasets in the list 
    """
    subset = []
    subset = [dataset.iloc[:, index:] for dataset in datasets[1:]]
    
    first = subset[0].join(subset[1:], how = 'outer')
    finance = datasets[0].iloc[:, index:].join(first, how = 'left')
    finance = finance[finance.index > cut]
    return finance


def applyTimeLag(dataset, lags, delta):
    """
    apply time lag to return columns selected according  to delta.
    Days to lag are contained in the lads list passed as argument.
    Returns a NaN free dataset obtained cutting the lagged dataset
    at head and tail
    """
    
    dataset.Return_Out = dataset.Return_Out.shift(-1)
    maxLag = max(lags)

    columns = dataset.columns[::(2*max(delta)-1)]
    for column in columns:
        for lag in lags:
            newcolumn = column + str(lag)
            dataset[newcolumn] = dataset[column].shift(lag)

    return dataset.iloc[maxLag:-1,:]

"""
=============================================================
Classification Algorithms
=============================================================
"""
def prepareDataForClassification(dataset, start_test):
    """
    generates categorical output column, attach to dataframe 
    label the categories and split into train and test
    """
    le = preprocessing.LabelEncoder()
    
    dataset['UpDown'] = dataset['Return_Out']
    dataset.UpDown[dataset.UpDown >= 0] = 'Up'
    dataset.UpDown[dataset.UpDown < 0] = 'Down'
    dataset.UpDown = le.fit(dataset.UpDown).transform(dataset.UpDown)
    
    features = dataset.columns[1:-1]
    X = dataset[features]    
    y = dataset.UpDown    
    
    X_train = X[X.index < start_test]
    y_train = y[y.index < start_test]              
    
    X_test = X[X.index >= start_test]    
    y_test = y[y.index >= start_test]
    
    return X_train, y_train, X_test, y_test   


def performClassification(X_train, y_train, X_test, y_test, method, parameters, fout, savemodel):
    """
    performs classification on daily returns using several algorithms (method).
    method --> string algorithm
    parameters --> list of parameters passed to the classifier (if any)
    fout --> string with name of stock to be predicted
    savemodel --> boolean. If TRUE saves the model to pickle file
    """
   
    if method == 'RF':   
        return performRFClass(X_train, y_train, X_test, y_test, parameters, fout, savemodel)
        
    elif method == 'KNN':
        return performKNNClass(X_train, y_train, X_test, y_test, parameters, fout, savemodel)
    
    elif method == 'SVM':   
        return performSVMClass(X_train, y_train, X_test, y_test, parameters, fout, savemodel)
    
    elif method == 'ADA':
        return performAdaBoostClass(X_train, y_train, X_test, y_test, parameters, fout, savemodel)
    
    elif method == 'GTB': 
        return performGTBClass(X_train, y_train, X_test, y_test, parameters, fout, savemodel)

    elif method == 'QDA': 
        return performQDAClass(X_train, y_train, X_test, y_test, parameters, fout, savemodel)



def performRFClass(X_train, y_train, X_test, y_test, parameters, fout, savemodel):
    """
    Random Forest Binary Classification
    """
    clf = RandomForestClassifier(n_estimators=1000, n_jobs=-1)
    clf.fit(X_train, y_train)
    
    if savemodel == True:
        fname_out = '{}-{}.pickle'.format(fout, datetime.now())
        with open(fname_out, 'wb') as f:
            cPickle.dump(clf, f, -1)    
    
    accuracy = clf.score(X_test, y_test)
    
    return accuracy


def performKNNClass(X_train, y_train, X_test, y_test, parameters, fout, savemodel):
    """
    KNN binary Classification
    """
    clf = neighbors.KNeighborsClassifier()
    clf.fit(X_train, y_train)

    if savemodel == True:
        fname_out = '{}-{}.pickle'.format(fout, datetime.now())
        with open(fname_out, 'wb') as f:
            cPickle.dump(clf, f, -1)    
    
    accuracy = clf.score(X_test, y_test)
    
    return accuracy


def performSVMClass(X_train, y_train, X_test, y_test, parameters, fout, savemodel):
    """
    SVM binary Classification
    """
    c = parameters[0]
    g =  parameters[1]
    clf = SVC()
    clf.fit(X_train, y_train)

    if savemodel == True:
        fname_out = '{}-{}.pickle'.format(fout, datetime.now())
        with open(fname_out, 'wb') as f:
            cPickle.dump(clf, f, -1)    
    
    accuracy = clf.score(X_test, y_test)
    
    return accuracy



def performAdaBoostClass(X_train, y_train, X_test, y_test, parameters, fout, savemodel):
    """
    Ada Boosting binary Classification
    """
    n = parameters[0]
    l =  parameters[1]
    clf = AdaBoostClassifier()
    clf.fit(X_train, y_train)

    if savemodel == True:
        fname_out = '{}-{}.pickle'.format(fout, datetime.now())
        with open(fname_out, 'wb') as f:
            cPickle.dump(clf, f, -1)    
    
    accuracy = clf.score(X_test, y_test)
    
    return accuracy


def performGTBClass(X_train, y_train, X_test, y_test, parameters, fout, savemodel):
    """
    Gradient Tree Boosting binary Classification
    """
    clf = GradientBoostingClassifier(n_estimators=100)
    clf.fit(X_train, y_train)

    if savemodel == True:
        fname_out = '{}-{}.pickle'.format(fout, datetime.now())
        with open(fname_out, 'wb') as f:
            cPickle.dump(clf, f, -1)    
    
    accuracy = clf.score(X_test, y_test)
    
    return accuracy



def performQDAClass(X_train, y_train, X_test, y_test, parameters, fout, savemodel):
    """
    Quadratic Discriminant Analysis binary Classification
    """
    def replaceTiny(x):
        if (abs(x) < 0.0001):
            x = 0.0001
    
    X_train = X_train.apply(replaceTiny)
    X_test = X_test.apply(replaceTiny)
    
    clf = QDA()
    clf.fit(X_train, y_train)

    if savemodel == True:
        fname_out = '{}-{}.pickle'.format(fout, datetime.now())
        with open(fname_out, 'wb') as f:
            cPickle.dump(clf, f, -1)    
    
    accuracy = clf.score(X_test, y_test)
    
    return accuracy

"""
=============================================================
Model/Feature Selection
=============================================================
"""
def performCV(X_train, y_train, folds, method, parameters, fout, savemodel):
    """
    given complete dataframe, number of folds, the % split to generate 
    train and test set and features to perform prediction --> splits
    dataframein test and train set. Takes train set and splits in k folds.
    - Train on fold 1, test on 2
    - Train on fold 1-2, test on 3
    - Train on fold 1-2-3, test on 4
    ....
    returns mean of test accuracies
    """
    print ''
    print 'Parameters --------------------------------> ', parameters
    print 'Size train set: ', X_train.shape
    
    k = int(np.floor(float(X_train.shape[0])/folds))
    
    print 'Size of each fold: ', k
    
    acc = np.zeros(folds-1)
    for i in range(2, folds+1):
        print ''
        split = float(i-1)/i
        print 'Splitting the first ' + str(i) + ' chuncks at ' + str(i-1) + '/' + str(i) 
        data = X_train[:(k*i)]
        output = y_train[:(k*i)]
        print 'Size of train+test: ', data.shape
        index = int(np.floor(data.shape[0]*split))
        X_tr = data[:index]        
        y_tr = output[:index]
        
        X_te = data[(index+1):]
        y_te = output[(index+1):]        
        
        acc[i-2] = performClassification(X_tr, y_tr, X_te, y_te, method, parameters, fout, savemodel)
        print 'Accuracy on fold ' + str(i) + ': ', acc[i-2]
    
    return acc.mean() 

def performFeatureSelection(maxdeltas, maxlags, fout, cut, start_test, start, end, savemodel, method, folds, parameters):
    """
    Performs Feature selection for a specific algorithm
    """
    
    for maxlag in range(3, maxlags + 2):
        lags = range(2, maxlag) 
        print ''
        print '============================================================='
        print 'Maximum time lag applied', max(lags)
        print ''
        for maxdelta in range(3, maxdeltas + 2):
			datasets = getStockDataFromWeb(fout, start, end)
			# datasets = loadDatasets(path_datasets, fout)
			delta = range(2, maxdelta)
			print 'Delta days accounted: ', max(delta)
			datasets = applyRollMeanDelayedReturns(datasets, delta)
			finance = mergeDataframes(datasets, 6, cut)
			print 'Size of data frame: ', finance.shape
			print 'Number of NaN after merging: ', count_missing(finance)
			finance = finance.interpolate(method='linear')
			print 'Number of NaN after time interpolation: ', count_missing(finance)
			finance = finance.fillna(finance.mean())
			print 'Number of NaN after mean interpolation: ', count_missing(finance)    
			finance = applyTimeLag(finance, lags, delta)
			print 'Number of NaN after temporal shifting: ', count_missing(finance)
			print 'Size of data frame after feature creation: ', finance.shape
			X_train, y_train, X_test, y_test  = prepareDataForClassification(finance, start_test)

			print performCV(X_train, y_train, folds, method, parameters, fout, savemodel)
			print ''

def performSingleShotClassification(bestdelta, bestlags, fout, cut, start_test, start, end, savemodel, method, parameters):

	lags = range(2, bestlags + 1) 
	print 'Maximum time lag applied', max(lags)
	datasets = getStockDataFromWeb(fout, start, end)
	delta = range(2, bestdelta + 1) 
	print 'Delta days accounted: ', max(delta)
	datasets = applyRollMeanDelayedReturns(datasets, delta)
	finance = mergeDataframes(datasets, 6, cut)
	print 'Size of data frame: ', finance.shape
	print 'Number of NaN after merging: ', count_missing(finance)
	finance = finance.interpolate(method='linear')
	print 'Number of NaN after time interpolation: ', count_missing(finance)
	finance = finance.fillna(finance.mean())
	print 'Number of NaN after mean interpolation: ', count_missing(finance)    
	finance = applyTimeLag(finance, lags, delta)
	print 'Number of NaN after temporal shifting: ', count_missing(finance)
	print 'Size of data frame after feature creation: ', finance.shape
	X_train, y_train, X_test, y_test  = prepareDataForClassification(finance, start_test)

	return performClassification(X_train, y_train, X_test, y_test, method, parameters, fout, savemodel),datasets 


"""
=============================================================
Trading Algorithm and Portfolio Performance
=============================================================
"""

from abc import ABCMeta, abstractmethod

class Portfolio(object):
    """An abstract base class representing a portfolio of 
    positions (including both instruments and cash), determined
    on the basis of a set of signals provided by a Strategy."""

    __metaclass__ = ABCMeta

    @abstractmethod
    def generate_positions(self):
        """Provides the logic to determine how the portfolio 
        positions are allocated on the basis of forecasting
        signals and available cash."""
        raise NotImplementedError("Should implement generate_positions()!")

    @abstractmethod
    def backtest_portfolio(self):
        """Provides the logic to generate the trading orders
        and subsequent equity curve (i.e. growth of total equity),
        as a sum of holdings and cash, and the bar-period returns
        associated with this curve based on the 'positions' DataFrame.

        Produces a portfolio object that can be examined by 
        other classes/functions."""
        raise NotImplementedError("Should implement backtest_portfolio()!")

class MarketIntradayPortfolio(Portfolio):
    """Buys or sells 500 shares of an asset at the opening price of
    every bar, depending upon the direction of the forecast, closing 
    out the trade at the close of the bar.

    Requires:
    symbol - A stock symbol which forms the basis of the portfolio.
    bars - A DataFrame of bars for a symbol set.
    signals - A pandas DataFrame of signals (1, -1) for each symbol.
    initial_capital - The amount in cash at the start of the portfolio."""

    def __init__(self, symbol, bars, signals, initial_capital=100000.0, shares=500):
        self.symbol = symbol        
        self.bars = bars
        self.signals = signals
        self.initial_capital = float(initial_capital)
        self.shares = int(shares)
        self.positions = self.generate_positions()
        
    def generate_positions(self):
        """Generate the positions DataFrame, based on the signals
        provided by the 'signals' DataFrame."""
        positions = pd.DataFrame(index=self.signals.index).fillna(0.0)

        positions[self.symbol] = self.shares*self.signals['signal']
        return positions
                    
    def backtest_portfolio(self):
        """Backtest the portfolio and return a DataFrame containing
        the equity curve and the percentage returns."""
       
        portfolio = pd.DataFrame(index=self.positions.index)
        pos_diff = self.positions.diff()
            
        portfolio['price_diff'] = self.bars['Close_Out']-self.bars['Open_Out']
        portfolio['price_diff'][0:5] = 0.0
        portfolio['profit'] = self.positions[self.symbol] * portfolio['price_diff']
     
        portfolio['total'] = self.initial_capital + portfolio['profit'].cumsum()
        portfolio['returns'] = portfolio['total'].pct_change()
        return portfolio



def getPredictionFromBestModel(bestdelta, bestlags, fout, cut, start_test, start, end, best_model):
    """
    returns array of prediction and score from best model.
    """
    lags = range(2, bestlags + 1) 
    # datasets = loadDatasets(path_datasets, fout)
    datasets = getStockDataFromWeb(fout, start, end)
    delta = range(2, bestdelta + 1) 
    datasets = applyRollMeanDelayedReturns(datasets, delta)
    finance = mergeDataframes(datasets, 6, cut)
    finance = finance.interpolate(method='linear')
    finance = finance.fillna(finance.mean())    
    finance = applyTimeLag(finance, lags, delta)
    X_train, y_train, X_test, y_test  = prepareDataForClassification(finance, start_test)    
    with open(best_model, 'rb') as fin:
        model = cPickle.load(fin)        
        
    return model.predict(X_test), model.score(X_test, y_test)


def getPrediction(bestdelta, bestlags, fout, cut, start_test, start, end):
	"""
	returns array of prediction and score from best model.
	"""
	lags = range(2, bestlags + 1) 
	# datasets = loadDatasets(path_datasets, fout)
	datasets = getStockDataFromWeb(fout, start, end)
	delta = range(2, bestdelta + 1) 
	datasets = applyRollMeanDelayedReturns(datasets, delta)
	finance = mergeDataframes(datasets, 6, cut)
	finance = finance.interpolate(method='linear')
	finance = finance.fillna(finance.mean())  
	finance = applyTimeLag(finance, lags, delta)
	X_train, y_train, X_test, y_test  = prepareDataForClassification(finance, start_test)
	clf = RandomForestClassifier(n_estimators=1000, n_jobs=-1)
	clf.fit(X_train, y_train)
	return clf.predict(X_test), clf.score(X_test, y_test)

def plotTrade(symbol, start, end, returns, bars):
	# Plot results
	f, ax = plt.subplots(2, sharex=True, figsize=(16.0, 10.0))
	f.patch.set_facecolor('white')
	ylabel = symbol + ' Close Price in $'
	bars['Close_Out'].plot(ax=ax[0], color='r', lw=3.)    
	ax[0].set_ylabel(ylabel)
	ax[0].set_xlabel('')
	ax[0].legend(('Close Price S&P-500',), loc='upper left')

	ax[0].set_title('S&P 500 Close Price VS Portofolio Performance ('+datetime.strftime(start, '%Y-%m-%d')+' - '+datetime.strftime(end, '%Y-%m-%d')+')', fontweight="bold")

	returns['total'].plot(ax=ax[1], color='b', lw=3.)  
	ax[1].set_ylabel('Portfolio value in $')
	ax[1].set_xlabel('Date')
	ax[1].legend(('Portofolio Performance. Capital Invested: 100k $. Shares Traded per day: 500+500',), loc='upper left')            
	plt.tick_params(axis='both', which='major')
	# loc = ax[1].xaxis.get_major_locator()
	# loc.maxticks = 24

	plt.show()

"""
=============================================================
Main
=============================================================
"""

def main_test():
	start = datetime.now() - timedelta(days=120)
	end = start + timedelta(days=120)
	start_test = start + timedelta(days=60)
	symbol = "PYPL"
	# delta = range(2, 3)
	cut = start + timedelta(days=1)
	# print 'Delta days accounted: ', max(delta)

	# print getStock(symbol, start, end)
	# print getStockFromQuandl("WIKI/"+symbol, symbol ,start, end)
	# datasets = getStockDataFromWeb(symbol, start, end)
	# print "\n\n ==============\n",datasets
	# datasets = applyRollMeanDelayedReturns(datasets, delta)
	# print "\n\n ==============\n",datasets
	# finance = mergeDataframes(datasets, 6, cut)
	# print "\n\n ==============\n",finance

	# X_train, y_train, X_test, y_test  = prepareDataForClassification(finance, start_test)
	# print X_train


def main_feature():
	start = datetime.now() - timedelta(days=60)
	end = start + timedelta(days=40)
	start_test = start + timedelta(days=30)
	symbol = "PYPL"
	cut = start + timedelta(days=1)

	maxdeltas = 5
	maxlags = 5
	fout = symbol
	savemodel = False
	method = 'RF'
	folds = 3
	parameters = []

	performFeatureSelection(maxdeltas, maxlags, fout, cut, start_test, start, end, savemodel, method, folds, parameters)



def main():

	# start = datetime(1990, 1, 1)
	start = datetime.now() - timedelta(days=30*12)
	end = start + timedelta(days=30*11)
	start_test = start + timedelta(days=30*8)
	symbol = "^GSPC"
	# symbol = 'S&P-500'
	cut = start + timedelta(days=1)

	maxdeltas = 5
	maxlags = 5
	fout = symbol
	savemodel = False
	method = 'RF'
	folds = 3
	parameters = []

	# performFeatureSelection(maxdeltas, maxlags, fout, cut, start_test, start, end, savemodel, method, folds, parameters)
	

	bestlags = 5
	bestdelta = 5
	acc,datasets = performSingleShotClassification(bestdelta, bestlags, fout, cut, start_test, start, end, savemodel, method, parameters)
	# prediction = getPredictionFromBestModel(bestdelta, bestlags, symbol, cut, start_test, start, end, 'PYPL-2016-06-19 19:36:56.345428.pickle')[0]
	prediction = getPrediction(bestdelta, bestlags, fout, cut, start_test, start, end)[0]
	prediction = np.append(prediction,0)
	# print 'prediction :', prediction

	# print 'Accuracy :', acc
	bars = datasets[0]#['AdjClose_Out']
	bars = bars[start_test:end]
	# print "bars:",bars
	signals = pd.DataFrame(index=bars.index)

	signals['signal'] = 0.0
	# print "signals:",signals
	print "length bars:",len(bars)
	# print "length signals:",len(signals)
	print "length prediction:",len(prediction)
	signals['signal'] = prediction
	signals.signal[signals.signal == 0] = -1
	signals['positions'] = signals['signal'].diff() 
	# print signals

	# Create the portfolio based on the forecaster
	amount_of_shares = 500
	portfolio = MarketIntradayPortfolio(symbol, bars, signals, initial_capital = 100000.0, shares = amount_of_shares)
	# print "portfolio:",portfolio
	returns = portfolio.backtest_portfolio()
	print "length returns:",len(returns)
	print "returns:",returns
	plotTrade(symbol, start, end, returns, bars)
	



main()
