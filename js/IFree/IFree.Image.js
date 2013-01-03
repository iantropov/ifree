IFree.Image = Class.extend({

	_path: null,
	_id: null,
	_type: null,
	
	init: function(config)
	{
		this._path = config.path || "photos/empty/empty";
		this._id = config.id;
		this._type = config.type;
		this._format = config.format;
		
		this._group = config.group;
	},
	
	group: function()
	{
		return this._group;
	},
	
	type: function()
	{
		return this._type;
	},
	
	path: function()
	{
		return this._path + "." + this._format;
	}
});

IFree.AnimatedImage = IFree.Image.extend({

	_frameCount: null,
	
	init: function(config)
	{
		this._super(config);
		
		this._frameCount = config.frameCount;
		
		this._frameCounter = 0;
	},
	
	length: function()
	{
		return this._frameCount;
	},
	
	_getFrame: function()
	{
		return this._path + "-" + this._frameCounter + "." + this._format;
	},
	
	nextFrame: function()
	{
		if (this._frameCounter == this._frameCount)
			this._frameCounter = 0;
		
		var nextFrame = this._getFrame();
		
		this._frameCounter++;
		
		return nextFrame;
	},
	
	ended: function()
	{
		return (this._frameCounter == this._frameCount);
	},
	
	reset: function()
	{
		this._frameCounter = 0;
		
		return this.nextFrame();
	}
});

IFree.Image.Type = {
	STATIC		: "static",
	ANIMATED	: "animated"
}