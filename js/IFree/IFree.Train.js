IFree.Train = IFree.StaticObject.extend({

	init: function(config)
	{
		this._angleStep = config.angleStep;
		this._trainMotionDelay = config.trainMotionDelay;

		this._currentAngle = 0;
		this._targetAngle = this._currentAngle;

		this._super(config);
		
		this._startMotion();
	},
	
	_startMotion: function()
	{
		IFree.Timer.registerFunction(this._trainMotionDelay, IFree.Util.createDelegate(this._trainMotion, this));		
	},
	
	_trainMotion: function(userFn)
	{
		if (this._currentAngle == this._targetAngle)
			return;
	
		this._currentAngle += this._angleStep;
		
		IFree.Util.rotateElement(this._id, this._currentAngle);

		if (this._currentAngle == 360)
			this._currentAngle = 0;		

		if (this._currentAngle == this._targetAngle && this._targetAngleCallback)
			this._targetAngleCallback();
	},
	
	goTo: function(station, userFn)
	{
		this._targetAngle = station.getStationAngle();
		this._targetAngleCallback = userFn;
	},
	
	currentAngle: function()
	{
		return this._currentAngle;
	}
});