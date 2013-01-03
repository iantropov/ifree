IFree.TrainRouter = Class.extend({

	_train: null,
	
	init: function(config)
	{
		this._train = config.train;
		
		this._stations = [];		
	},
	
	addStation: function(station)
	{
		this._stations.push(station);
	},
	
	start: function()
	{
		this._destinationStationNumber = 0;
		this._goToStation();
	},
	
	_getDestinationStation: function()
	{
		return this._stations[this._destinationStationNumber];
	},
	
	setNextStation: function(station)
	{
		if (station == this._getDestinationStation())
			return;
	
		this._getDestinationStation().close();
	
		this._selectStation(station);
		
		this._goToStation();
	},
	
	_selectStation: function(station)
	{
		this._destinationStationNumber = IFree.Util.indexOf(this._stations, station);		
	},
	
	_selectNextStation: function()
	{
		this._destinationStationNumber++

		if (this._destinationStationNumber == this._stations.length)
			this._destinationStationNumber = 0;
	},

	_goToStation: function()
	{
		this._train.goTo(this._getDestinationStation(), IFree.Util.createDelegate(this._onStationArrived, this));
	},
	
	_onStationArrived: function()
	{
		this._getDestinationStation().receivePassengers(IFree.Util.createDelegate(function(){
			this._selectNextStation();
			this._goToStation();
		}, this));
	}
});