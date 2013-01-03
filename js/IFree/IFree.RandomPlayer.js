IFree.RandomPlayer = Class.extend({
	start: function()
	{
		this._playObjects = this._createPlayObjectList();
		
		this._playList = this._generateRandomList(this._playObjects.length);
		
		this._currentIndex = -1;		
	},
		
	_generateRandomList: function(length)
	{
		var randomList = [];
		
		for (var i = 0; i < length; i++)
		{
			randomList.push(i);
		}
		
		for (var i = 0; i < length; i++)
		{
			IFree.Util.swap(randomList, IFree.Util.random(length - 1), i);
		}
		
		return randomList;
	},
	
	_createPlayObjectList: function()
	{
		return [];
	},
	
	_getPlayObjectList: function()
	{
		return this._playObjects;
	},
	
	_getCurrentPlayObject: function()
	{
		return this._getPlayObject(this._currentIndex);
	},
	
	_getPlayObject: function(index)
	{
		return this._playObjects[this._playList[index]];		
	},
	
	_objectReady: function(playObject)
	{
		return true;
	},
	
	_getNextReadyPlayObject: function()
	{
		while (true)
		{
			this._incrementPlayPosition();
			
			var playObject = this._getCurrentPlayObject();
			
			if (this._objectReady(playObject))
				return playObject;
		}
	},
	
	_incrementPlayPosition: function()
	{
		this._currentIndex = (this._currentIndex + 1) % this._playObjects.length;
	},
	
	_playObject: function(object)
	{
	},
	
	_playNext: function()
	{
		var nextObject = this._getNextReadyPlayObject();
		
		this._playObject(nextObject);		
	}
});