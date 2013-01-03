IFree.ClickMeControllerSingleton = IFree.RandomPlayer.extend({
	
	_trainClickElementId: "ifree-train-click-element",
	_trainElementId: "ifree-world-train",
	
	_popupShowInterval: 2000,
	_popupDelay: 2000,
	
	hide: function()
	{
		IFree.ClickMePopup.hide();
	},
	
	_getObjectPosition: function(showConfig)
	{
		return showConfig.objectId == this._trainClickElementId ? IFree.TrainController.getTrainPosition() : IFree.XYHelper.getOffset(showConfig.objectId);	
	},
	
	_getTargetSide: function(showConfig)
	{
		if (showConfig.objectId != this._trainClickElementId)
			return showConfig.targetSide;
			
		var trainAngle = IFree.TrainController.trainAngle();
		
		return trainAngle > 180 ? "left top" : "right top";
	},
	
	showForObject: function(showConfig)
	{
		var objectPosition = this._getObjectPosition(showConfig);
		var object = IFree.ObjectRegistry.getItem(showConfig.objectId);

		var targetSide = this._getTargetSide(showConfig);
		
		IFree.ClickMePopup.showAt(objectPosition.left, objectPosition.top, object.width(), object.height(), targetSide, showConfig.offsetLeft, showConfig.offsetTop);
	},
	
	start: function()
	{
		this._super();
	
		this._playNext();
	},
	
	/*Override*/
	_createPlayObjectList: function()
	{
		var objectMap = IFree.Popup.ClickableObjectRegistry.getItems();
		
		var list = [];
		
		for (var key in objectMap)
		{
			list.push(objectMap[key]);
		}
		
		return list;
	},
	
	/*Override*/
	_objectReady: function(playObject)
	{
		return playObject.config().objectId == this._trainClickElementId ? IFree.TrainController.trainVisible() : true;
	},	
	
	/*Override*/
	_playObject: function(nextObject)
	{
		this.showForObject(nextObject.config());
		
		setTimeout(IFree.Util.createDelegate(function(){
			
			this.hide();
			
			setTimeout(IFree.Util.createDelegate(this._playNext, this), this._popupDelay);
			
		}, this), this._popupShowInterval);
	}
});

IFree.ClickMeController = new IFree.ClickMeControllerSingleton();