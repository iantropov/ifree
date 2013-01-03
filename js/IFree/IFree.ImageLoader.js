IFree.ImageLoaderSingleton = Class.extend({
	
	loadImageContent: function(imagePathes, callback)
	{
		var loadContext = {
			loadCount			: 0,
			loadCounter 		: 0,
			afterLoadCallback	: callback,
			imagePathes			: imagePathes
		};	
		
		this._makeAbsolutePathes(loadContext);
		
		this._startLoadImages(loadContext);
	},
	
	_makeAbsolutePathes: function(loadContext)
	{
		IFree.Util.foreach(loadContext.imagePathes, function(imagePath, i){
			loadContext.imagePathes[i] = IFree.Environment.getAbsolutePath(imagePath);
		}, this);
	},
	
	_onImageLoaded: function(loadContext)
	{
		loadContext.loadCounter++;
		
		if (loadContext.loadCounter == loadContext.loadCount && loadContext.afterLoadCallback)
		{
			loadContext.afterLoadCallback();				
		}
	},
	
	_startLoadImage: function(imagePath, loadContext)
	{
		IFree.Util.loadImage(imagePath, IFree.Util.createDelegate(this._onImageLoaded, this, [loadContext]));
	},
	
	_startLoadImages: function(loadContext)
	{
		loadContext.loadCount = loadContext.imagePathes.length;
	
		IFree.Util.foreach(loadContext.imagePathes, function(imagePath){
			this._startLoadImage(imagePath, loadContext);
		}, this);		
	}
});

IFree.ImageLoader = new IFree.ImageLoaderSingleton();