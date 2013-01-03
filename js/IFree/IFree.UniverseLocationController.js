IFree.UniverseLocationControllerSingleton = Class.extend({

	_scrollDelay: IFree.Util.isMobileUser() ? 10 : 200,

	_setRegionsLocation: function(newWidth, newHeight)
	{
		var newTopRegionHeight, 
			newBottomRegionHeight,
			newCentralRegionHeight;

		var smoothCorrection = 3;
			
		var originCenterRegionSize = IFree.Environment.centerRegionSize();
		
		if (newHeight < originCenterRegionSize.height)
		{
			newTopRegionHeight = 0;
			newBottomRegionHeight = 0;
			newCentralRegionHeight = newHeight;
		}
		else
		{
			var remainHeight = newHeight - originCenterRegionSize.height;
			newTopRegionHeight = remainHeight / 2; //for smooth
			newBottomRegionHeight = remainHeight - newTopRegionHeight + smoothCorrection; //+2 for smooth
			newCentralRegionHeight = originCenterRegionSize.height;
		}
		
		var topRegion = IFree.ObjectRegistry.getItem("ifree-top-region");
		var centerRegion = IFree.ObjectRegistry.getItem("ifree-center-region");
		var bottomRegion = IFree.ObjectRegistry.getItem("ifree-bottom-region");
		
		topRegion.setSize(newWidth, newTopRegionHeight);
		centerRegion.setSize(newWidth, newCentralRegionHeight);
		bottomRegion.setSize(newWidth, newBottomRegionHeight);
		
		topRegion.setPosition(0, 0);
		centerRegion.setPosition(0, newTopRegionHeight); //for smooth
		bottomRegion.setPosition(0, newTopRegionHeight + newCentralRegionHeight - smoothCorrection); //+2 for smooth
	},

	_center: function(newValue, constValue)
	{
		return constValue > newValue ? 0 : (newValue - constValue) / 2;
	},

	_setSunSystemLocation: function(newWidth, newHeight)
	{
		var solarSystem = IFree.ObjectRegistry.getItem("ifree-solar-system");

		var newX, newY;
		
		newX = this._center(newWidth, solarSystem.width());
		newY = this._center(newHeight, solarSystem.height());
		
		solarSystem.setPosition(newX, newY);
	},

	_setStarsLocation: function(newWidth, newHeight)
	{
		var stars = IFree.ObjectRegistry.getItem("ifree-stars");

		var solarSystem = IFree.ObjectRegistry.getItem("ifree-solar-system");
		
		var starsY = solarSystem.coordinates()[1] + solarSystem.height() - 200;
		var starsHeight = newHeight - starsY;

		stars.setSize(newWidth, starsHeight);	
		stars.setPosition(0, starsY);	
	},
	
	_setSunMoonLocation: function(newWidth, newHeight)
	{
		var sun = IFree.ObjectRegistry.getItem("ifree-sun");
		sun.setPosition(newWidth - sun.width(), 0);
		
		var moon = IFree.ObjectRegistry.getItem("ifree-moon");
		moon.setPosition(0, newHeight - moon.height());		
	},	
	
	adjustLocation: function(onAdjusted)
	{
		this._locateElements();
		
		setTimeout(IFree.Util.createDelegate(this._scrollToCenter, this));
		
		this._updateCurrentWindowSize();
		
		if (onAdjusted)
		{
			onAdjusted();
		}
	},
	
	_locateElements: function()
	{
		IFree.Util.getElement("ifree-body").addClass("ifree-no-scroll");	
	
		var relativeWidth = IFree.Environment.xFromScreenToRelative(IFree.Util.windowWidth());
		var relativeHeight = IFree.Environment.yFromScreenToRelative(IFree.Util.windowHeight());

		IFree.Util.getElement("ifree-body").removeClass("ifree-no-scroll");
		
		var solarSystem = IFree.ObjectRegistry.getItem("ifree-solar-system");
		if (!solarSystem)
			return;
		
		var newWidth = IFree.Util.max(relativeWidth, solarSystem.width());
		var newHeight = IFree.Util.max(relativeHeight, solarSystem.height());

		this._setRegionsLocation(newWidth, newHeight);

		this._setSunSystemLocation(newWidth, newHeight);
		this._setStarsLocation(newWidth, newHeight);
		this._setSunMoonLocation(newWidth, newHeight);
		
		this._locateAnchor();
	},
	
	getSizeAbsolute: function()
	{
		var solarSystem = IFree.Util.getElement("ifree-solar-system");
		
		return {
			width  : Math.max(IFree.Util.windowWidth (), solarSystem.width ()),
			height : Math.max(IFree.Util.windowHeight(), solarSystem.height())
		};
	},

	_androidTrickyCheckSayReturn: function()
	{
		if (this._currentOrientation == window.orientation)
		{
			if (this._counter < 1)
			{
				this._counter++;
			}
			else
			{
				return true;
			}
		}
		else
		{
			this._currentOrientation = window.orientation;
			this._counter = 0;
		}
	},
    
    _windowSizeChanged: function()
    {
        var widthChanged = this._currentWindowSize.width != IFree.Util.windowWidth();
        var heightChanged = this._currentWindowSize.height != IFree.Util.windowHeight();
    
        return  widthChanged || heightChanged;  
    },
    
    _updateCurrentWindowSize: function()
    {
		this._currentWindowSize = {
			width: IFree.Util.windowWidth(),
			height: IFree.Util.windowHeight()
		};
    },
	
	_onWindowResize: function()
	{
		if (IFree.Util.isAndroid() && this._androidTrickyCheckSayReturn())
			return;
		
		if (this._windowSizeChanged())
		{
			this._locateElements();
		
			this._scrollToCenter();
			
			this._updateCurrentWindowSize();
		}
	},

	_locateAnchor: function()
	{
		var solarSystem = IFree.Util.getElement("ifree-solar-system");
		var regionSize = {
			width: solarSystem.width(),
			height: solarSystem.height()
		};
	
		var screenSize = {
			width: IFree.Util.windowWidth(),
			height: IFree.Util.windowHeight()
		};

		var anchorX = Math.max((regionSize.width - screenSize.width) / 2, 0);
		var anchorY = Math.max((regionSize.height - screenSize.height) / 2, 0);
	
		var anchorWidth = Math.min(regionSize.width, screenSize.width);
	
		IFree.Util.getElement("ifree-scroll-anchor").width(anchorWidth);

		IFree.Util.setPosition("ifree-scroll-anchor", anchorX, anchorY);
	},
	
	_scrollToAnchor: function()
	{	
		IFree.Util.scrollToElement(IFree.Util.getElement("ifree-scroll-anchor")[0]);
	},

	_scrollToCenter: function()
	{
		this._scrollToAnchor();
		
		if (IFree.Util.isMobileUser())
		{
			this._locateElements();
			this._scrollToAnchor();//via first call, we hide address bar, via second scroll to center
		}
	},
	
	_initDataForAndroidTricks: function()
	{
		this._counter = 0;
		this._currentOrientation = 1;
	},

	init: function()
	{
		if (IFree.Util.isApple())
		{
			IFree.Util.onOrientationChange(IFree.Util.createDelegate(this._onWindowResize, this));
		}
		else
		{
			IFree.Util.onWindowResize(IFree.Util.createDelegate(this._onWindowResize, this));
		}

		this._updateCurrentWindowSize();
		
		this._initDataForAndroidTricks();
	}
});

IFree.UniverseLocationController = new IFree.UniverseLocationControllerSingleton();