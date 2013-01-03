IFree.Popup.Polaroid = Class.extend({
	_photoPrefix: "photo",
	_textPrefix: "text",
	_bigPrefix: "big",
	_smallPrefix: "small",
	_polaroidPrefix: "polaroid",
	
	_defaultBigFontSize: 150,
	_defaultSmallFontSize: 100,
	
	init: function(config)
	{
		this._id = config.id;
		this._text = config.text || "";
		this._caption = config.caption;
		this._bigFontSize = config.bigFontSize || this._defaultBigFontSize;
		this._smallFontSize = config.smallFontSize || this._defaultSmallFontSize;
		
		this._singleScreenType = config.singleScreenType;
		this._downloadUri = config.downloadUri || "";
	},
	
	id: function()
	{
		return this._id;
	},
	
	screenType: function()
	{
		return this._singleScreenType;
	},
	
	downloadUri: function()
	{
		return this._downloadUri;
	},
	
	text: function()
	{
		return this._text;
	},
	
	getBigPhotoId: function()
	{
		return this._polaroidPrefix + "-" + this._id + "-" + this._bigPrefix + "-" + this._photoPrefix;
	},
	
	getSmallPhotoId: function()
	{
		return this._polaroidPrefix + "-" + this._id + "-" + this._smallPrefix + "-" + this._photoPrefix;
	},
	
	caption: function()
	{
		return this._caption;
	},
	
	bigFontSize: function()
	{
		return this._bigFontSize;
	},
	
	smallFontSize: function()
	{
		return this._smallFontSize;
	}
});