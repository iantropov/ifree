IFree.TimerSingleton = Class.extend({
	
	_minimalInterval: 0,
	_maximalInterval: 0, //diveded by minimum Interval
	
	_intervalCounter: 0,
	
	init: function()
	{
		this._intervalFns = [];
		this._intervals = [];
		
		this._intervalsForDeletion = [];
	},
	
	registerFunction: function(interval, intervalFn)
	{
		if (!this._intervalFns[interval])		
			this._intervals.push(interval);
		this._intervalFns[interval] = this._intervalFns[interval] || [];
		this._intervalFns[interval].push(intervalFn);
		
		if (interval < this._minimalInterval || this._minimalInterval == 0)
		{
			this._minimalInterval = interval;
		}
			
		if (interval > this._maximalInterval)
		{
			this._maximalInterval = interval;
		}
			
		this._tryRestart();
		
		return this._intervalFns[interval].length;
	},
	
	_tryRestart: function()
	{
		this.stopTimer();
		
		if (this._minimalInterval == 0 || this._maximalInterval == 0)
			return;
		
		this.startTimer();		
	},
	
	unregisterFunction: function(interval, timerId)
	{
		delete this._intervalFns[interval][timerId - 1];
		if (IFree.Util.arrayEmpty(this._intervalFns[interval]))
		{
			delete this._intervalFns[interval];
			this._intervals.splice(IFree.Util.indexOf(this._intervals, interval), 1);
		}
		
		this._intervalsForDeletion.push(interval);
	},
	
	_deleteIntervals: function()
	{
		IFree.Util.foreach(this._intervalsForDeletion, function(interval){
			if (this._maximalInterval == 0 || this._minimalInterval == 0)
				return false;
			
			if (interval == this._maximalInterval)
			{
				this._maximalInterval = 0;
			}
			
			if (interval == this._minimalInterval)
			{
				this._minimalInterval = 0;
			}			
		}, this);
		
		this._intervalsForDeletion = [];
		
		if (this._maximalInterval == 0 || this._minimalInterval == 0)
		{
			this._maximalInterval = this._findMaximumInterval();
			this._minimalInterval = this._findMinimumInterval();

			return true;
		}
			
		return false;
	},
	
	_findMaximumInterval: function()
	{
		return this._findInterval("max");
	},

	_findMinimumInterval: function()
	{
		return this._findInterval("min");
	},
	
	_findInterval: function(criteria)
	{
		return this._intervals.length == 0 ? 0 : Math[criteria].apply(Math, this._intervals);
	},
	
	_checkWaitFunctions: function()
	{
		var intervalsCopy = this._intervals.slice(0);
		var intervalFnsCopy = $.extend(true, [], this._intervalFns);
		
		var j;
		for (j = 0; j < intervalsCopy.length; j++)
		{
			var interval = intervalsCopy[j];
			if (this._intervalCounter % interval == 0)
			{
				this._executeWaitFunctions(intervalFnsCopy, interval);
			}		
		}
	},
	
	_executeWaitFunctions: function(intervalFns, interval)
	{
		var fnArray = intervalFns[interval];
		for (i = 0; i < fnArray.length; i++)
		{
			if (fnArray[i])
			{
				fnArray[i]();
			}
		}
	},
		
	_timerFn: function()
	{
		var thisTime = new Date().getTime();
		var tickCount = Math.max(1, Math.floor((thisTime - this._lastTime) / this._minimalInterval));
		this._lastTime += tickCount * this._minimalInterval;
		
		if (tickCount > 10)
			return;
		
		for (var i = 0; i < tickCount; i++)
		{
			this._intervalCounter += this._minimalInterval;
			
			this._checkWaitFunctions();

			if (this._intervalCounter == this._maximalInterval)
			{
				this._intervalCounter = 0;
				
				if (this._deleteIntervals())
				{
					this._tryRestart();
					return;
				}
			}
		}
	},
	
	startTimer: function()
	{
		this._lastTime = new Date().getTime();
		this._intervalCounter = 0;
	
		this._currentTimerId = setInterval(IFree.Util.createDelegate(this._timerFn, this), this._minimalInterval);		
	},
	
	stopTimer: function()
	{
		clearInterval(this._currentTimerId);
	}
});

IFree.Timer = new IFree.TimerSingleton();