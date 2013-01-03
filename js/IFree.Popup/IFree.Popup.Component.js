IFree.Popup = {};

IFree.Observable = Class.extend({
	init: function(config)
	{
		this._events = {};
	},
	
	addEvent: function(event)
	{
		this._events[event] = [];
	},
	
	fireEvent: function(event, params)
	{
		if (!this._events[event])
			return;
			
		IFree.Util.foreach(this._events[event], function(callback){
			callback(params);
		});
	},
	
	on: function(event, callback)
	{
		if (!this._events[event])
			return;
			
		this._events[event].push(callback);
	}
});

IFree.Popup.Component = IFree.Observable.extend({

	_setElementSize: function(element, newWidth, newHeight)
	{
		IFree.XYHelper.setElementSize(element, newWidth, newHeight);
	},
	
	_setElementPosition: function(element, newX, newY)
	{
		IFree.XYHelper.setElementPosition(element, newX, newY);
	},
	
	_setPosition: function(elementId, newX, newY)
	{
		IFree.XYHelper.setPosition(elementId, newX, newY);
	},
	
	_setSize: function(elementId, newWidth, newHeight)
	{
		IFree.XYHelper.setSize(elementId, newWidth, newHeight);
	},
	
	_setElementWidth: function(element, newWidth)
	{
		IFree.XYHelper.setElementWidth(element, newWidth);
	}
});