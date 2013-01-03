
var _worldObjectClass = "ifree-world-object";

IFree.Object = Class.extend({
	
	_id: null,
	_coordinates: null,
	_size: null,
	_type: null,
	_parentId: null,
	
	init: function(config, parentId)
	{
		this._id = config.id;
		this._coordinates = config.coordinates.slice(0);
		this._size = config.size.slice(0);
		this._type = config.type;
		this._parentId = config.parentId;
		
		this._image = IFree.ImageRegistry.getItem(config.imageId);
		
		IFree.Util.createElement(this._parentId, this._id, _worldObjectClass);
		this._setPosition();
		this._setSize();
	},
	
	_setBackgroundImage: function(relativePath)
	{
		var imagePath = IFree.Environment.getAbsolutePath(relativePath);
		IFree.Util.setBackgroundImage(this._id, imagePath);		
	},
	
	_setSize: function()
	{
		var screenX = IFree.Environment.xFromRelativeToScreen(this._size[0]);
		var screenY = IFree.Environment.yFromRelativeToScreen(this._size[1]);
		
		IFree.Util.setSize(this._id, screenX, screenY);
	},
	
	_setPosition: function()
	{
		var screenX = IFree.Environment.xFromRelativeToScreen(this._coordinates[0]);
		var screenY = IFree.Environment.yFromRelativeToScreen(this._coordinates[1]);
	
		IFree.Util.setPosition(this._id, screenX, screenY);
	},
	
	id: function()
	{
		return this._id;
	},
	
	imageId: function()
	{
		return this._imageId;
	},
	
	coordinates: function()
	{
		return this._coordinates;
	},
	
	type: function()
	{
		return this._type;
	},
	
	width: function()
	{
		return this._size[0];
	},
	
	height: function()
	{
		return this._size[1];
	},
	
	setSize: function(width, height)
	{
		this._size = [width, height];
		
		this._setSize();
	},
	
	setPosition: function(x, y)
	{
		this._coordinates = [x, y];
		
		this._setPosition();
	},
	
	image: function()
	{
		return this._image;
	}
});

IFree.Object.Type = {
	ANIMATED		: "animated",
	STATIC			: "static",
	STATION_INPUT	: "station-input"
}