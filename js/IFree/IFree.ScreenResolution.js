IFree.ScreenResolution = Class.extend({
	init: function(config)
	{
		this._width = config.width;
		this._height = config.height;
		this._id = config.id;
	},
	
	id: function()
	{
		return this._id;
	},
	
	width: function()
	{
		return this._width;
	},
	
	height: function()
	{
		return this._height;
	}
});