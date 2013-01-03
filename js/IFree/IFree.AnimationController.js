/*
	Logic of animation controller :
	
	- when turn of some animation, it will start
	- when turn of some animation, and mouse over it, it plays until user move pointer out (all other animations wait it),
	- when turn of some animation, and animation already played - it continue plays
		- if user remove pointer before it will finish - it will finish early
		- if user remove pointer after it will finish - nothing will occur
*/


IFree.AnimationControllerSingleton = IFree.RandomPlayer.extend({
	
	/*Override*/
	start: function()
	{
		this._super();
	
		this._initHoverBehaviour();
		
		this._startLoadAnimations();
	},
	
	_startLoadAnimations: function()
	{
		var firstAnimation = this._getPlayObject(0);
	
		IFree.ImageLoadController.loadAnimationRemainFrames(firstAnimation, IFree.Util.createDelegate(function(animation){
			this._markAsLoaded(animation);
			
			this._playNext();
		}, this, [firstAnimation]));

		IFree.Util.foreach(this._playList.slice(1), function(playPosition){
			var animation = this._getPlayObject(playPosition);
		
			IFree.ImageLoadController.loadAnimationRemainFrames(animation, IFree.Util.createDelegate(this._markAsLoaded, this, [animation]));
		}, this);
	},
	
	_markAsLoaded: function(animation)
	{
		animation.loaded = true;
	},
	
	_loaded: function(animation)
	{
		return animation.loaded;
	},

	_initHoverBehaviour: function()
	{
		if (IFree.Util.isMobileUser())
			return;
	
		IFree.Util.foreach(this._getPlayObjectList(), function(object){
			IFree.Util.getElement(object.id()).hover(
				IFree.Util.createDelegate(function(){
					
					if (!this._loaded(object))
						return;
					
					object.play();
				
				}, this),
				IFree.Util.createDelegate(function(){

					object.stop();

				}, this));
		}, this);
	},

	_createPlayObjectList: function()
	{
		var objects = IFree.ObjectRegistry.getItems();
		var animatedObjects = [];
		
		for (var objectId in objects)
		{
			if (objects[objectId].type() == IFree.Object.Type.ANIMATED)
			{
				animatedObjects.push(objects[objectId]);
			}
		}
		
		return animatedObjects;
	},

	/*Override*/
	_objectReady: function(playObject)
	{
		return this._loaded(playObject);
	},
	
	/*Override*/
	_playObject: function(nextObject)
	{
		nextObject.playOnce(IFree.Util.createDelegate(this._playNext, this));
	}
});

IFree.AnimationController = new IFree.AnimationControllerSingleton();