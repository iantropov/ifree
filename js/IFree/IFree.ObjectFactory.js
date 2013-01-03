IFree.ObjectFactory = Class.extend({
	init: function(config)
	{
		this._objectConstructors = config.objectConstructors;
	},
	
	create: function(objectConfig)
	{
		return new this._objectConstructors[objectConfig.type](objectConfig);
	}	
});