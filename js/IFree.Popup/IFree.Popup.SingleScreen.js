IFree.Popup.SingleScreen = IFree.Popup.Screen.extend({

	_textAreaHeight: 80,
	_scrollValue: 10,
	_textAreaWidth: 500,
	_textDownControlHeight: 12,
	_textDownControlWidth: 21,
	_textAreaLeft: 40,
	_textAreaTop: 340,
	
	_singleScreenContentCls: "ifree-single-screen-content",
	_singleScreenPolaroidCls: "ifree-single-screen-polaroid",
	_singleScreenPolaroidPhotoCls: "ifree-single-screen-polaroid-photo",
	_singleScreenPolaroidTextCls: "ifree-single-screen-polaroid-text",
	
	_singleScreenTextCls: "ifree-single-screen-text",
	_singleScreenTextTopCls: "ifree-textarea-top",
	_singleScreenTextCenterCls: "ifree-textarea-center",
	_singleScreenTextBottomCls: "ifree-textarea-bottom",
	
	_singleScreenTextAreaCls: "ifree-textarea-text",
	_singleScreenTextScrollWrapperCls: "ifree-textarea-scroll-wrapper",
	
	_popupHideCls: "ifree-popup-hide",
	_captionTextCls: "ifree-caption-text",
					
	init: function(config)
	{
		this._super(config);
	
		this._polaroid = IFree.Popup.PolaroidRegistry.getItem(config.polaroidId);
		this._parentGroupConfig = config.groupConfig;
	},
	
	/*Override*/
	_renderContent: function(config)
	{
		var template = this._renderElement(this._singleScreenContentCls, true);
		
		template += this._renderPolaroidArea(config);
		template += this._renderTextArea();
		
		template += this._closeElement();
		
		return template;
	},
	
	_renderPolaroidArea: function(config)
	{
		var polaroidCls = [this._singleScreenPolaroidCls];
		if (config.previousNavigation)
		{
			polaroidCls.push("ifree-clickable-object");
		}

		var template = this._renderPopupElement(polaroidCls, true);
		
		template += this._renderPopupElement(this._singleScreenPolaroidPhotoCls);
		template += this._renderPopupElement([this._singleScreenPolaroidTextCls, this._captionTextCls]);
		
		template += this._closeElement();
		
		return template;
	},
	
	_renderTextArea: function()
	{
		var template = this._renderPopupElement(this._singleScreenTextCls, true);
		
		template += this._renderPopupElement([this._singleScreenTextTopCls, this._popupHideCls]);

		template += this._renderPopupElement(this._singleScreenTextCenterCls, true);
		template +=	this._renderTextScrollWrapper();
		template += this._closeElement();
		
		template += this._renderPopupElement([this._singleScreenTextBottomCls, this._popupHideCls]);
		
		template += this._closeElement();
		
		return template;
	},
	
	_renderTextScrollWrapper: function()
	{
		var template = this._renderElement([this._singleScreenTextScrollWrapperCls], true);

		template += this._renderElement([this._singleScreenTextAreaCls], true);
		template += "{{html text}}";
		template += this._closeElement();

		template += this._closeElement();
		
		return template;
	},
	
	renderTo: function(target)
	{
		$.template("single-screen-template", this._renderTemplate({
			previousNavigation: this._canNavagateBack()
		}));
		
		this._screenMarkup = $.tmpl("single-screen-template", {
			text: this._getScreenText()
		});
		
		this._screenMarkup.appendTo(target);
		
		this._locateItems();
					
		this._initEvents();
		
		this._showTextControls();
	},
	
	_getScreenText: function()
	{
		return this._polaroid.text();
	},
	
	_locateItems: function()
	{
		this._super();
		
		this._locatePolaroid();
		this._locateText();
	},
	
	/*Override*/
	_initEvents: function()
	{
		this._super();
		
		this._initTextEvents();
		
		this._initNavigationEvents();
	},
	
	_initNavigationEvents: function()
	{
		if (this._canNavagateBack())
		{
			this._polaroidElement.click(IFree.Util.createDelegate(this._onPreviousClick, this));
		}
	},	
	
	_onTextUp: function()
	{
		this._scrollText(-this._scrollValue);
		
		this._showTextControls();
	},
	
	_scrollText: function(scrollValue)
	{
		this._textAreaScrolling[0].scrollTop += IFree.Environment.yFromRelativeToScreen(scrollValue);
	},
	
	_showTextControls: function()
	{
		this._hideElement(this._textUpControl);
		this._hideElement(this._textDownControl);
		
		var screenTextAreaHeight = IFree.Environment.yFromRelativeToScreen(this._textAreaHeight);
		
		if (this._textAreaScrolling[0].scrollTop > 0)
			this._showElement(this._textUpControl);
			
		if (this._textAreaScrolling[0].scrollTop < this._textAreaScrolling[0].scrollHeight - screenTextAreaHeight)
			this._showElement(this._textDownControl);	
	},
	
	_onTextDown: function(event)
	{
		this._scrollText(this._scrollValue);

		this._showTextControls();
	},
	
	_onScroll: function(event)
	{
		this._showTextControls();
	},
	
	_locateText: function()
	{
		var text = this._locateElement(this._singleScreenTextCls, this._textAreaWidth, this._textAreaHeight + 50, this._textAreaLeft, this._textAreaTop);

		this._textUpControl = this._locateImageElement("popup-scroll-up", this._singleScreenTextTopCls, this._textDownControlWidth, this._textDownControlHeight, (this._textAreaWidth - this._textDownControlWidth)/ 2, 0);

		this._textDownControl = this._locateImageElement("popup-scroll-down", this._singleScreenTextBottomCls, this._textDownControlWidth, this._textDownControlHeight, (this._textAreaWidth - this._textDownControlWidth)/ 2,  this._textAreaHeight + 20);

		var textArea = this._locateElement(this._singleScreenTextCenterCls, this._textAreaWidth, this._textAreaHeight, 0, 15);

		this._textAreaScrolling = this._locateElement(this._singleScreenTextScrollWrapperCls, this._textAreaWidth + 100, this._textAreaHeight, 0, 0);

		this._textAreaContent = this._findChild(this._screenMarkup, this._singleScreenTextAreaCls);
		this._setFontSize(this._textAreaContent, 100);
		this._setElementWidth(this._textAreaContent, this._textAreaWidth - 10); //for smooth on mobileDevices
	},
	
	_initTextEvents: function()
	{
		this._textDownControl.click(IFree.Util.createDelegate(this._onTextDown, this));
		this._textUpControl.click(IFree.Util.createDelegate(this._onTextUp, this));
		
		if (IFree.Util.isIE())
		{
			this._textDownControl.dblclick(IFree.Util.createDelegate(this._onTextDown, this));
			this._textUpControl.dblclick(IFree.Util.createDelegate(this._onTextUp, this));			
		}
		
		IFree.Popup.HoverController.register(this._textUpControl, "popup-scroll-up");
		IFree.Popup.HoverController.register(this._textDownControl, "popup-scroll-down");
		
		this._textAreaScrolling.scroll(IFree.Util.createDelegate(this._onScroll, this));
	},
	
	_locatePolaroid: function()
	{
		this._polaroidElement = this._locateImageElement("polaroid-big-background", this._singleScreenPolaroidCls, 271, 311, 150, 27);

		var polaroidPhoto = this._locateImageElement(this._polaroid.getBigPhotoId(), this._singleScreenPolaroidPhotoCls, 220, 210, 27, 29);

		var polaroidText = this._locateElement(this._singleScreenPolaroidTextCls, 220, 50, 27, 250);
		this._setFontSize(polaroidText, this._polaroid.bigFontSize());
		polaroidText.text(this._polaroid.caption());
	},

	_showElement: function(element)
	{
		element.removeClass(this._popupHideCls);
	},
	
	_hideElement: function(element)
	{
		element.addClass(this._popupHideCls);
	},

	_onPreviousClick: function()
	{
		this.fireEvent("changescreen", this._parentGroupConfig);
	},
	
	_canNavagateBack: function()
	{
		return this._parentGroupConfig;
	}
});