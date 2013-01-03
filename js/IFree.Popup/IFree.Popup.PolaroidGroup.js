IFree.Popup.PolaroidGroup = Class.extend({
	init: function(config)
	{
		this._id = config.id;
		this._items = config.items.slice(0);
	},
	
	id: function()
	{
		return this._id;
	},
	
	items: function()
	{
		return this._items;
	},
	
	itemAt: function(index)
	{
		return this._items[index];
	}
});