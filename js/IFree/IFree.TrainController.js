IFree.TrainControllerSingleton = Class.extend({

	_trainClickElementId: "ifree-train-click-element",
	_clickableClass: "ifree-clickable-object",
	_trainElementId: "ifree-world-train",

	_trainWidth: 30,
	_trainRoadWidth: 305,
	_trainStartAngle: 38,
	
	createClickElement: function(onCreated)
	{
		IFree.Util.createElement("ifree-body", this._trainClickElementId, this._clickableClass);
		
		if (onCreated)
			onCreated();
	},
	
	start: function()
	{
		if (!IFree.Util.getElement(this._trainClickElementId))
		{
			this.createClickELement();
		}
	
		this._startListenMouse();
		
		this._startTrainMotion();
	},
	
	_startListenMouse: function()
	{
		this._onClick(IFree.Util.createDelegate(function(event){
			IFree.Util.getElement(this._trainClickElementId).click();
		}, this));
		
		this._onOver(
			IFree.Util.createDelegate(function(event){
			
				$(IFree.Util.makeIdSelector(this._trainClickElementId)).offset({
					left: event.pageX,
					top: event.pageY
				});
			
				IFree.Util.getElement(this._trainClickElementId).mouseenter();
				
				IFree.Util.getElement("ifree-earth-container").addClass(this._clickableClass);			
			}, this),
			IFree.Util.createDelegate(function(){
				IFree.Util.getElement(this._trainClickElementId).mouseleave();
				
				IFree.Util.getElement("ifree-earth-container").removeClass(this._clickableClass);
				
			}, this)
		);
	},
	
	_startTrainMotion: function()
	{
		var trainRouter = new IFree.TrainRouter({
			train:	IFree.ObjectRegistry.getItem(this._trainElementId)
		});
		
		var stationIds = [
			"ifree-station-products",
			"ifree-station-b2b",
			"ifree-station-development"
		];
		
		IFree.Util.foreach(stationIds, function(stationId){
			
			var station = IFree.ObjectRegistry.getItem(stationId);
			
			trainRouter.addStation(station);
			
			IFree.Util.getElement(stationId).mouseenter(function(){
				trainRouter.setNextStation(station);
			});			
		}, this);
		
		trainRouter.start();
	},
	
	_isTrainBodyAt: function(originalX, originalY)
	{
		var trainRoadRadius = this._trainRoadWidth / 2;
	
		var centerX = trainRoadRadius + 98;
		var centerY = trainRoadRadius + 104;
	
		var x = -(originalX - centerX);
		var y = -(originalY - centerY);
	
		function _getR(x, y)
		{
			return Math.sqrt(x * x + y * y);
		};
	
		var r = _getR(x, y);
		
		var trainObject = IFree.ObjectRegistry.getItem(this._trainElementId);
		var trainAngle = trainObject.currentAngle() - (360 - this._trainStartAngle);

		var a = Math.atan2(y, x) * 180 / Math.PI;
		
		if (r > trainRoadRadius - this._trainWidth && r < trainRoadRadius && IFree.Util.angleDiff(a, trainAngle) < 62.5)
		{
			return true;
		}
		
		return false;
	},
	
	_onEvent: function(event, eventCallbackAtBody, eventCallbackAtOtherPlace)
	{
		IFree.Util.getElement("ifree-earth-container").live(event, IFree.Util.createDelegate(function(event) {
			if (event.target.id != this._trainElementId && event.target.id != "ifree-earth-container")
			{
				if (eventCallbackAtOtherPlace)
				{
					eventCallbackAtOtherPlace(event);
				}
				
				return;
			}

			var eventOffsets = IFree.XYHelper.getEventOffsets(event, "ifree-earth-container");

			if (this._isTrainBodyAt(eventOffsets.offsetX, eventOffsets.offsetY))
			{
				eventCallbackAtBody(event);
			}
			else if (eventCallbackAtOtherPlace)
			{
				eventCallbackAtOtherPlace(event);
			}
		}, this));
	},
	
	_onClick: function(callback)
	{				
		this._onEvent("click", callback);
	},
	
	_onOver: function(callbackIn, callbackOut)
	{
		var overTrain = false;
	
		this._onEvent("mousemove", 
			function(event){
				if (!overTrain)
				{
					callbackIn(event);
					overTrain = true;
				}
			}, 
			function(event){
				if (overTrain)
				{
					callbackOut();
					overTrain = false;
				}
			}
		);
		
		IFree.Util.getElement("ifree-earth-container").mouseout(IFree.Util.createDelegate(function(event){
			if (overTrain)
			{
				callbackOut();
				overTrain = false;
			}
		}, this));	
	},
	
	getTrainPosition: function(trainBodyOffset)
	{
		var bodyOffset = trainBodyOffset || 0;
		
		var trainRoadPosition = IFree.XYHelper.getOffset("ifree-train-road");
	
		var trainRoadRadius = this._trainRoadWidth / 2;
	
		var centerX = trainRoadRadius + trainRoadPosition.left;
		var centerY = trainRoadRadius + trainRoadPosition.top;
	
		var trainAngle = IFree.ObjectRegistry.getItem(this._trainElementId).currentAngle() + this._trainStartAngle;

		var newTrainX = (trainRoadRadius - this._trainWidth / 2) * Math.cos((trainAngle + bodyOffset) * Math.PI / 180);
		var newTrainY = (trainRoadRadius - this._trainWidth / 2) * Math.sin((trainAngle + bodyOffset) * Math.PI / 180);

		return {
			left: - newTrainX + centerX,
			top: - newTrainY + centerY
		};
	},
	
	trainVisible: function()
	{
		var angle = IFree.ObjectRegistry.getItem(this._trainElementId).currentAngle();
	
		return angle > 75 && angle < 330;
	},
	
	trainAngle: function()
	{
		return IFree.ObjectRegistry.getItem(this._trainElementId).currentAngle() + this._trainStartAngle;
	}
});

IFree.TrainController = new IFree.TrainControllerSingleton();