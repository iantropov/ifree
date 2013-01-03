IFree.ImageLoadControllerSingleton = Class.extend({

	_getStationInputAnimations: function()
	{
		var inputPathes = [];
	
		var stationInputs = IFree.ObjectRegistry.filterItems(function(object){
			return object.type() == IFree.Object.Type.STATION_INPUT;
		});
		
		IFree.Util.foreach(stationInputs, function(stationInput){
			inputPathes = inputPathes.concat(this._getAnimationRemainFrames(stationInput));
		}, this);
		
		return inputPathes;
	},
	
	loadStationInputs: function(onLoadStationInputs)
	{
		var stationInputs = this._getStationInputAnimations();
		
		IFree.ImageLoader.loadImageContent(stationInputs, onLoadStationInputs);
	},
	
	_getFirstFramesFromAnimations: function()
	{
		var animations = IFree.ImageRegistry.filterItems(function(image){
			return image.type() == IFree.Image.Type.ANIMATED;
		});
		
		var framePathes = [];
		
		IFree.Util.foreach(animations, function(animation){
			framePathes.push(animation.reset());
		}, this);
		
		return framePathes;
	},
	
	_getAnimationRemainFrames: function(animation)
	{
		var animatedImage = animation.image();
	
		var framePathes = [];
		
		animatedImage.reset();
		
		while (!animatedImage.ended())
		{
			framePathes.push(animatedImage.nextFrame());
		}
		
		animatedImage.reset();
		
		return framePathes;
	},
	
	loadAnimationRemainFrames: function(animation, onAnimationLoad)
	{
		var framePathes = this._getAnimationRemainFrames(animation);
		
		IFree.ImageLoader.loadImageContent(framePathes, onAnimationLoad);
	},
	
	loadAnimationFirstFrames: function(onFramesLoaded)
	{
		var firstFrames = this._getFirstFramesFromAnimations();
		
		IFree.ImageLoader.loadImageContent(firstFrames, onFramesLoaded);
	},
	
	loadImageGroup: function(onGroupLoaded, groupName)
	{
		var images = IFree.ImageRegistry.filterItems(function(image){
			return image.group() == groupName;
		});
		
		var imagePathes = [];
		
		IFree.Util.foreach(images, function(image){
			imagePathes.push(image.path());
		}, this);
		
		IFree.ImageLoader.loadImageContent(imagePathes, onGroupLoaded);
	}
});

IFree.ImageLoadController = new IFree.ImageLoadControllerSingleton();