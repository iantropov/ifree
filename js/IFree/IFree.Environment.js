IFree.EnvironmentSingleton = Class.extend({

	_requiredWidth: 600,
	_requiredHeight: 614,
	
	_centerRegionWidth: 1200,
	_centerRegionHeight: 900,
	
	_currentResolution: {},
	
	init: function(config)
	{
		this._screenWidth = config.screenWidth
		this._screenHeight = config.screenHeight;
	},
	
	_getScaleCoef: function(width, height)
	{
		return IFree.Util.min(width / this._centerRegionWidth, height / this._centerRegionHeight);
	},
	
	_sortSupportedResolutionsByScreenCoef: function()
	{
		this._supportedResolutions = this._supportedResolutions.sort(function(resolutionA, resolutionB){
			return resolutionB.screenCoef - resolutionA.screenCoef;
		});
	},
	
	_computeSupportedCoefs: function()
	{
		IFree.Util.foreach(this._supportedResolutions, function(resolution){
			resolution.screenCoef = this._getScaleCoef(resolution.width(), resolution.height());
		}, this);
	},

	_chooseClosestSupportedResolution: function(screenCoef)
	{
		var returnResolution = this._supportedResolutions[this._supportedResolutions.length - 1];
	
		IFree.Util.foreach(this._supportedResolutions, function(resolution){
			if (screenCoef >= resolution.screenCoef)
			{
				returnResolution = resolution;
				return false;
			}
		});
		
		return returnResolution;
	},
	
	chooseAppropriateScale: function()
	{
		this._supportedResolutions = IFree.Util.mapToArray(IFree.ScreenResolutionRegistry.getItems());
		this._computeSupportedCoefs();
		this._sortSupportedResolutionsByScreenCoef();
		
		var screenCoef = IFree.Util.min(this._screenWidth / this._requiredWidth, this._screenHeight / this._requiredHeight);
		
		this._currentResolution = this._chooseClosestSupportedResolution(screenCoef);
	},
	
	getAbsolutePath: function(relativePath)
	{
		return "/images/" + this._currentResolution.id() + "/" + relativePath + "?";
	},
	
	xFromScreenToRelative: function(x)
	{
		return x / this._currentResolution.screenCoef;
	},
	
	yFromScreenToRelative: function(y)
	{
		return y / this._currentResolution.screenCoef
	},
	xFromRelativeToScreen: function(x)
	{
		return x * this._currentResolution.screenCoef;
	},
	
	yFromRelativeToScreen: function(y)
	{
		return y * this._currentResolution.screenCoef;
	},
	
	screenFontSize: function(relativeFontSize)
	{
		return relativeFontSize * this._currentResolution.screenCoef;
	},
	
	centerRegionSize: function()
	{
		return {
			width: this._centerRegionWidth,
			height: this._centerRegionHeight
		};
	}
});

IFree.Environment = new IFree.EnvironmentSingleton({
	screenWidth: IFree.Util.windowWidth(),
	screenHeight: IFree.Util.windowHeight()
});