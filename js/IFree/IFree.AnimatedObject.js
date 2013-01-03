IFree.AnimatedObject = IFree.Object.extend({
	
	_animationInterval: null,
	
	init: function(config)
	{
		this._super(config);
		
		this._animationInterval = config.animationInterval;
		
		this._setBackgroundImage(this._image.reset());
	},
	
	_startAnimation: function(animationFn)
	{
		if (this._currentTimerId)
			return;
			
		this._currentTimerId = IFree.Timer.registerFunction(this._animationInterval, IFree.Util.createDelegate(animationFn, this));
	},
	
	_animationFn: function()
	{
		this._setBackgroundImage(this._image.nextFrame());
	},
	
	_stopAnimation: function()
	{
		if (this._currentTimerId)
		{
			IFree.Timer.unregisterFunction(this._animationInterval, this._currentTimerId);
			
			this._setBackgroundImage(this._image.reset());
						
			delete this._currentTimerId;
		}
	},
	
	play: function()
	{
		this._startAnimation(this._animationFn);
	},	

	_animationStep: function()
	{
		this._setBackgroundImage(this._image.nextFrame());
	},
	
	_animationOnceFn: function()
	{
		if (this._image.ended())
		{
			this._animationStep();
			this._stopAnimation();
			this._endPlayOnce();
		}
		else
		{
			this._animationStep();
		}
	},
	
	playOnce: function(onPlayEnded)
	{
		if (this._onPlayEnded)
			return;
			
		this._onPlayEnded = onPlayEnded;
	
		this._startAnimation(this._animationOnceFn);
	},
	
	_endPlayOnce: function()
	{
		if (this._onPlayEnded)
		{
			this._onPlayEnded();				
			delete this._onPlayEnded;
		}		
	},
	
	stop: function()
	{
		this._stopAnimation();
		
		this._endPlayOnce();
	}
});