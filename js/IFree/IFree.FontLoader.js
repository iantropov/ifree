IFree.FontLoaderSingleton = Class.extend({

	init: function(config)
	{
		this._fonts = config.fonts;
		
		this._fontCounter = this._fonts.length;
	},

	_checkLoaded: function(onFontsLoaded)
	{
		this._fontCounter--;
		
		if (this._fontCounter == 0 && onFontsLoaded)
		{
			onFontsLoaded();
		}
	},
	
	load: function(onFontsLoaded)
	{
		WebFont.load({
			custom: {
				families: this._fonts
			},
			fontactive: IFree.Util.createDelegate(this._checkLoaded, this, [onFontsLoaded]),
			fontinactive: IFree.Util.createDelegate(this._checkLoaded, this, [onFontsLoaded])
		});		
	}
});

IFree.FontLoader = new IFree.FontLoaderSingleton({
	fonts: [
		"SegoePrint",
		"Calibri"
	]
});