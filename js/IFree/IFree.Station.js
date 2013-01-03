IFree.Station = IFree.Object.extend({
	
	_stationAnimation: null,
	
	init: function(config)
	{
		this._super(config);
		
		this._stationAngle = config.stationAngle;
	},
	
	receivePassengers: function(onReceivedPassengers)
	{
		if (!this._stationAnimation)
			return;

		this._stationAnimation.playOnce(onReceivedPassengers);
	},
	
	close: function()
	{
		this._stationAnimation.stop();
	},
	
	getStationAngle: function()
	{
		return this._stationAngle;
	},
	
	onChildrenCreated: function()
	{
		this._stationAnimation = IFree.ObjectRegistry.getItem(this._id + "-input");
	}
});