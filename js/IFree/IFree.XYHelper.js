IFree.XYHelperSingleton = Class.extend({
	setSize: function(elementId, newWidth, newHeight)
	{
		this.setElementSize(IFree.Util.getElement(elementId), newWidth, newHeight);
	},
	
	setPosition: function(elementId, newX, newY)
	{
		this.setElementPosition(IFree.Util.getElement(elementId), newX, newY);	
	},
	
	setOffset: function(elementId, newX, newY)
	{
		this.setElementOffset(IFree.Util.getElement(elementId), newX, newY);
	},
	
	setElementSize: function(element, newWidth, newHeight)
	{
		this.setElementWidth(element, newWidth);
		this.setElementHeight(element, newHeight);
	},
	
	setElementHeight: function(element, newHeight)
	{
		var screenY = IFree.Environment.yFromRelativeToScreen(newHeight);
		
		IFree.Util.setElementHeight(element, screenY);
	},
	
	setElementWidth: function(element, newWidth)
	{
		var screenX = IFree.Environment.xFromRelativeToScreen(newWidth);
		
		IFree.Util.setElementWidth(element, screenX);
	},
	
	setElementPosition: function(element, newX, newY)
	{
		var screenX = IFree.Environment.xFromRelativeToScreen(newX);
		var screenY = IFree.Environment.yFromRelativeToScreen(newY);
		
		IFree.Util.setElementPosition(element, screenX, screenY);
	},
	
	setElementOffset: function(element, newX, newY)
	{
		var screenX = IFree.Environment.xFromRelativeToScreen(newX);
		var screenY = IFree.Environment.yFromRelativeToScreen(newY);
		
		IFree.Util.setElementOffset(element, screenX, screenY);		
	},
	
	getSize: function(elementId)
	{
		return this.getElementSize(IFree.Util.getElement(elementId));
	},
	
	getPosition: function(elementId)
	{
		return this.getElementPosition(IFree.Util.getElement(elementId));
	},
	
	getOffset: function(elementId)
	{
		return this.getElementOffset(IFree.Util.getElement(elementId));
	},
	
	getElementSize: function(element)
	{
		var screenSize = IFree.Util.getElementSize(element);
		
		return {
			width: IFree.Environment.xFromScreenToRelative(screenSize.width),
			height: IFree.Environment.yFromScreenToRelative(screenSize.height)
		};
	},
	
	getElementPosition: function(element)
	{
		var screenPosition = IFree.Util.elementPosition(element);
		
		return {
			left: IFree.Environment.xFromScreenToRelative(screenPosition.left),
			top: IFree.Environment.yFromScreenToRelative(screenPosition.top)
		};
	},
	
	getElementOffset: function(element)
	{
		var screenPosition = IFree.Util.elementOffset(element);
		
		return {
			left: IFree.Environment.xFromScreenToRelative(screenPosition.left),
			top: IFree.Environment.yFromScreenToRelative(screenPosition.top)
		};
	},
	
	getEventOffsets: function(screenEvent, elementId)
	{
		if (!elementId)
		{
			return {
				offsetX: IFree.Environment.xFromScreenToRelative(screenEvent.offsetX),
				offsetY: IFree.Environment.yFromScreenToRelative(screenEvent.offsetY)
			}
		}
		else
		{
			var elementOffset = IFree.Util.getElement(elementId).offset();
		
			return {
				offsetX: IFree.Environment.xFromScreenToRelative(screenEvent.pageX - elementOffset.left), 
				offsetY: IFree.Environment.yFromScreenToRelative(screenEvent.pageY - elementOffset.top)
			};
		}
	}
});

IFree.XYHelper = new IFree.XYHelperSingleton();