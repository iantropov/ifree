IFree.ClickMePopupSingleton = Class.extend({

	_popupOffset: null,

	_showPopupClass: "ifree-popup-show",
	_popupBackgroundId: "ifree-popupbox-background",
	_popupTextId: "ifree-popupbox-text",
	_popupId: "ifree-popup-box",

	_popupWidth: 109,
	_popupHeight: 27,

	_text: "Click me",

	_getSides: function()
	{
		return ["right", "left", "top", "bottom"];
	},

	_getDefaultTargetSide: function()
	{
		return "left bottom";
	},

	_parseTargetSideString: function(targetSideString)
	{
		var targetSide = {};

		IFree.Util.foreach(this._getSides(), function(side){
			targetSide[side] = targetSideString.indexOf(side) != -1;
		});

		return targetSide;
	},

	_getTargetOffset: function(targetWidth, targetHeight)
	{
		var popupSize = IFree.XYHelper.getSize(this._popupId);

		var targetOffset = {
			left: 0,
			top: 0
		};

		if (this._popupTargetSide["right"])
		{
			targetOffset.left = targetWidth;
		}

		if (this._popupTargetSide["left"])
		{
			targetOffset.left = - popupSize.width;
		}

		if (this._popupTargetSide["top"])
		{
			targetOffset.top = - popupSize.height;
		}

		if (this._popupTargetSide["bottom"])
		{
			targetOffset.top = targetHeight;
		}

		return targetOffset;
	},

	_getTargetImagePostfix: function()
	{
		var imagePostfix = "";

		IFree.Util.foreach(this._getSides(), function(side){
			if (this._popupTargetSide[side])
			{
				imagePostfix += side.substring(0, 1);
			}
		}, this);

		return imagePostfix;
	},

	_getBackgroundImageId: function()
	{
		return "popup-clickme-" + this._getTargetImagePostfix();
	},

	_locatePopup: function(x, y, targetWidth, targetHeight, offsetLeft, offsetTop)
	{

		var targetOffset = this._getTargetOffset(targetWidth, targetHeight);
		IFree.XYHelper.setOffset(this._popupId, x + targetOffset.left + offsetLeft, y + targetOffset.top + offsetTop);
	},

	_createPopupBody: function()
	{
		IFree.Util.createElement("ifree-body", this._popupId);
		IFree.XYHelper.setSize(this._popupId, this._popupWidth, this._popupHeight);
	},

	_createPopupBackground: function()
	{
		IFree.Util.createElement(this._popupId, this._popupBackgroundId, "ifree-popup-box-component");
		IFree.XYHelper.setSize(this._popupBackgroundId, this._popupWidth, this._popupHeight);
		IFree.Util.setBackgroundImage(this._popupBackgroundId, IFree.Util.getAbsolutePath(this._getBackgroundImageId()));
		IFree.XYHelper.setPosition(this._popupBackgroundId, 0, 0);
	},

	_createPopupText: function()
	{
		IFree.Util.createElement(this._popupId, this._popupTextId, "ifree-caption-text ifree-popup-box-component");
		IFree.Util.getElement(this._popupTextId).text(this._text);
		IFree.Util.setFontSize(this._popupTextId, IFree.Environment.screenFontSize(90));
		IFree.XYHelper.setPosition(this._popupTextId, 19, 1);
	},

	_createPopup: function()
	{
		this._createPopupBody();

		this._createPopupBackground();

		this._createPopupText();
	},

	_showPopup: function()
	{
		IFree.Util.getElement(this._popupId).addClass(this._showPopupClass);
	},

	_parsePopupTargetSide: function(targetSideString)
	{
		this._popupTargetSide = this._parseTargetSideString(targetSideString || this._getDefaultTargetSide());
	},

	showAt: function(x, y, targetWidth, targetHeight, targetSideString, offsetLeft, offsetTop)
	{
		this._parsePopupTargetSide(targetSideString);

		this._createPopup();

		this._locatePopup(x, y, targetWidth, targetHeight, offsetLeft || 0, offsetTop || 0);

		this._showPopup();
	},

	hide: function()
	{
		IFree.Util.getElement(this._popupId).remove();
	}
});

IFree.ClickMePopup = new IFree.ClickMePopupSingleton();