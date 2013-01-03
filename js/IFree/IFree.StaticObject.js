IFree.StaticObject = IFree.Object.extend({
	init: function(config)
	{
		this._super(config);
		
		this._setBackgroundImage(this._image.path());
	}
});