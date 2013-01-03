IFree.Task = Class.extend({
	
	_fnContexts: [],
	_events: {},
	_eventListeners: {},
	
	call: function(fnScope, readyFnName, fnArguments)
	{
		var onReadyFn = arguments.length == 1 ?
						fnScope :
						IFree.Util.createDelegate(fnScope[readyFnName], fnScope, fnArguments, true);
	
		this._chainFnContext = {
			onReady: onReadyFn,
			after: []
		};
		
		this._fnContexts.push(this._chainFnContext);

		return this;
	},
	
	_checkReadyFn: function(chainFnContext)
	{
		var after = chainFnContext.after;
		
		for (var i = 0; i < after.length; i++)
		{
			if (!this._events[after[i]])
				return;
		}
		
		setTimeout(function(){
			chainFnContext.onReady();
		});
	},
	
	after: function()
	{
		this._chainFnContext.after = [];
	
		for (var i = 0; i < arguments.length; i++)
		{
			this._eventListeners[arguments[i]] = this._eventListeners[arguments[i]] || [];
			
			this._eventListeners[arguments[i]].push(this._chainFnContext);
			
			this._chainFnContext.after.push(arguments[i]);
		}
		
		return this;
	},
	
	_checkReady: function(event)
	{
		if (!this._eventListeners[event])
			return;
	
		for (var i = 0; i < this._eventListeners[event].length; i++)
		{
			this._checkReadyFn(this._eventListeners[event][i]);
		}
	},
	
	fire: function(event)
	{
		var originalOnReadyFn = this._chainFnContext.onReady;
	
		this._chainFnContext.fire = event;
	
		this._chainFnContext.onReady = IFree.Util.createDelegate(function(chainFnContext){
			originalOnReadyFn(IFree.Util.createDelegate(function(){
				this._events[chainFnContext.fire] = true;
				this._checkReady(chainFnContext.fire);
			}, this));
		}, this, [this._chainFnContext]);
	},
	
	start: function()
	{
		IFree.Util.foreach(this._fnContexts, function(chainFnContext){
			this._checkReadyFn(chainFnContext);
		}, this);	
	}
});