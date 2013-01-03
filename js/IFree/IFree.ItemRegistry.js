IFree.ItemRegistrySingleton = Class.extend({
		
	_items: null,
	_itemsUrl: null,
	_rootParentId: null,
	_defaultType: null,
	
	init: function(config)
	{
		this._itemFactory = new IFree.ObjectFactory({
			objectConstructors: config.itemConstructors
		});
	
		this._itemsUrl = config.itemsUrl;
		this._rootParentId = config.rootParentId;
		this._defaultType = config.defaultType;
		
		this._defaultProperties = config.defaultProperties || {};
		
		this._items = {};
	},
	
	loadItems: function(callback)
	{
		$.getJSON(this._itemsUrl, IFree.Util.createDelegate(function(itemList){
			this._createItems(itemList, this._rootParentId);
			
			if (callback)
				callback();
		}, this));		
	},
	
	_assignDefaultProperties: function(itemConfig)
	{
		for (var propertyName in this._defaultProperties)
		{
			itemConfig[propertyName] = itemConfig[propertyName] || this._defaultProperties[propertyName];
		}
	},
	
	_createItems: function(itemArray, parentId)
	{
		IFree.Util.foreach(itemArray, function(itemConfig){
			itemConfig.parentId = parentId;
			
			this._assignDefaultProperties(itemConfig);
			
			this._items[itemConfig.id] = this._itemFactory.create(itemConfig);
			this._createItems(itemConfig.children, itemConfig.id);
			
			if (this._items[itemConfig.id].onChildrenCreated)
				this._items[itemConfig.id].onChildrenCreated(itemConfig);
			
		}, this);
	},
	
	getItems: function()
	{
		return this._items;
	},
	
	getItem: function(itemId)
	{
		return this._items[itemId];
	},
	
	filterItems: function(filterFn)
	{
		var filteredItems = [];
		
		for (var itemId in this._items)
		{
			if (filterFn(this._items[itemId]) === true)
			{
				filteredItems.push(this._items[itemId]);
			}
		}
		
		return filteredItems;
	}
});