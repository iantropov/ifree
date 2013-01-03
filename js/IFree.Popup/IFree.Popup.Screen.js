IFree.Popup.Screen = IFree.Popup.Component.extend({

	_screenCls: "ifree-popup-screen",
	_screenHeaderCls: "ifree-screen-header",
	_screenHeaderPreviousCls: "ifree-screen-header-previous",
	_screenHeaderNextCls: "ifree-screen-header-next",
	_screenHeaderCloseCls: "ifree-screen-header-close",
	_screenHeaderTitleCls: "ifree-screen-header-title",

	init: function(config)
	{
		this._super(config);
		
		this._titleText = config.titleText;
	
		this.addEvent("changescreen");
		this.addEvent("close");
	},

	_renderTemplate: function(config)
	{
		var template = this._renderPopupElement(this._screenCls, true);
		
		template += this._renderHeader(config);
		template += this._renderContent(config);
		
		template += this._closeElement();
		
		return template;
	},
	
	_renderHeader: function(config)
	{
		var template = this._renderPopupElement(this._screenHeaderCls, true);
		
		if (config.previousNavigation)
		{
			template += this._renderPopupElement(this._screenHeaderPreviousCls);
		}
		
		if (config.nextNavigation)
		{
			template += this._renderPopupElement(this._screenHeaderNextCls);
		}
		
		template += this._renderPopupElement(this._screenHeaderTitleCls);
		
		template += this._renderPopupElement(this._screenHeaderCloseCls);

		template += this._closeElement();
		
		return template;
	},
	
	_renderContent: function(config)
	{
		return "";
	},
	
	_locateItems: function()
	{
		this._locateNavigation();
		
		this._locateTitle();
	},
	
	_locateTitle: function()
	{
		var title = this._locateElement(this._screenHeaderTitleCls, 374, 17, 100, 16);
		this._setFontSize(title, 110);
		title.text(this._titleText);
	},	
	
	_locateNavigation: function()
	{
		this._locateElement(this._screenHeaderCls, 545, 14, 0, 0);
	
		this._closeControl = this._locateNavigationElement("popup-close", this._screenHeaderCloseCls, 17, 17, 540, 18);
	
		if (IFree.Util.elementDefined(this._findChild(this._screenMarkup, this._screenHeaderPreviousCls)))
		{
			this._prevControl = this._locateNavigationElement("popup-previous", this._screenHeaderPreviousCls, 26, 21, 17, 18);
		}
		
		if (IFree.Util.elementDefined(this._findChild(this._screenMarkup, this._screenHeaderNextCls)))
		{
			this._nextControl = this._locateNavigationElement("popup-next", this._screenHeaderNextCls, 26, 21, 50, 18);
		}
	},

	_locateNavigationElement: function(elementId, elementCls, elementWidth, elementHeight, elementX, elementY)
	{
		var element = this._locateImageElement(elementId, elementCls, elementWidth, elementHeight, elementX, elementY);

		IFree.Popup.HoverController.register(element, elementId);

		return element;		
	},

	_initEvents: function()
	{
		this._closeControl.click(IFree.Util.createDelegate(this._onCloseClick, this));
		
		if (this._prevControl)
		{
			this._prevControl.click(IFree.Util.createDelegate(this._onPreviousClick, this));			
		}
		
		if (this._nextControl)
		{
			this._nextControl.click(IFree.Util.createDelegate(this._onNextClick, this));	
		}
	},
	
	_onCloseClick: function()
	{
		this.fireEvent("close");
	},

	/* Util methods */

	_renderElement: function(classes, open)
	{
		var catArguments = ["<div class='"].concat(classes, ["'>"]);
	
		var template = IFree.Util.cat(catArguments);

		if (open)
			return template;
			
		template += "</div>";
		
		return template;
	},
	
	_renderPopupElement: function(classes, open)
	{
		if (!IFree.Util.isArray(classes))
		{
			classes = [classes];
		}
	
		return this._renderElement(classes.concat(["ifree-popup-component"]), open);
	},
	
	_closeElement: function()
	{
		return "</div>";
	},
	
	_findChild: function(element, childCls)
	{
		return element.find(IFree.Util.makeSelector(childCls));
	},
	
	_locateElement: function(elementCls, elementWidth, elementHeight, elementX, elementY)
	{
		return this._locateElementOn(this._screenMarkup, elementCls, elementWidth, elementHeight, elementX, elementY);
	},
	
	_locateElementOn: function(parent, elementCls, elementWidth, elementHeight, elementX, elementY)
	{
		var element = this._findChild(parent, elementCls);
		this._setElementSize(element, elementWidth, elementHeight);
		this._setElementPosition(element, elementX, elementY);

		return element;
	},
	
	_locateImageElementOn: function(parent, imageId, elementCls, elementWidth, elementHeight, elementX, elementY)
	{
		var element = this._locateElementOn(parent, elementCls, elementWidth, elementHeight, elementX, elementY);

		IFree.Util.setElementBackgroundImage(element, IFree.Util.getAbsolutePath(imageId));
		
		return element;
	},
	
	_locateImageElement: function(imageId, elementCls, elementWidth, elementHeight, elementX, elementY)
	{
		return this._locateImageElementOn(this._screenMarkup, imageId, elementCls, elementWidth, elementHeight, elementX, elementY);
	},

	_setFontSize: function(element, fontSize)
	{
		var screenFontSize = IFree.Environment.screenFontSize(fontSize);
		
		IFree.Util.setElementFontSize(element, screenFontSize);
	}
});

IFree.Popup.Screen.Type = {
	SINGLE		: "single",
	GROUP		: "group",
	TRYIT		: "tryit",
	COMINGSOON	: "comingsoon"
}