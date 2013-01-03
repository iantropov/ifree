IFree.Popup.HoverControllerSingleton = Class.extend({
	
	_onMouseDown: function(event, element, holdImage)
	{
		element.holded = true;
		IFree.Util.setElementBackgroundImage(element, holdImage);
		
		event.preventDefault();
	},
	
	_onMouseUp: function(element, hoverImage)
	{
		if (!element.holded)
			return;
	
		delete element.holded;
		IFree.Util.setElementBackgroundImage(element, hoverImage);
	},
	
	_onHover: function(element, hoverImage)
	{
		if (!element.holded)
			IFree.Util.setElementBackgroundImage(element, hoverImage);
	},
	
	register: function(element, imageId)
	{
		if (IFree.Util.isMobileUser())
			return;
	
		element.addClass("ifree-clickable-object");
	
		var relaxImage = IFree.Util.getAbsolutePath(imageId);
		var hoverImage = IFree.Util.getAbsolutePath(imageId + "-hover");
		var holdImage = IFree.Util.getAbsolutePath(imageId + "-hold");		
	
		element.hover(
			IFree.Util.createDelegate(this._onHover, this, [element, hoverImage]),
			IFree.Util.createDelegate(IFree.Util.setElementBackgroundImage, IFree.Util, [element, relaxImage])
		);
		
		element.mousedown(
			IFree.Util.createDelegate(this._onMouseDown, this, [element, holdImage], true)
		);
		
		$(window).mouseup(
			IFree.Util.createDelegate(this._onMouseUp, this, [element, hoverImage])
		);
	}
});

IFree.Popup.HoverController = new IFree.Popup.HoverControllerSingleton();