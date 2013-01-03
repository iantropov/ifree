IFree.Popup.Window = IFree.Popup.Component.extend({
	_windowTemplate: 	"<div id='${id}' class='ifree-popup-window'>" +
							"<div class='ifree-popup-left ifree-popup-component'>" +
							"</div>" +
							"<div class='ifree-popup-center ifree-popup-component'>" +
							"</div>" +
							"<div class='ifree-popup-right ifree-popup-component'>" +
							"</div>" +
						"</div>",
						
	_popupWindowId: "ifree-window-popup",
	_popupMaskId: "ifree-popup-mask",
	_bodyId: "ifree-body",

	init: function(config)
	{
		this._super(config);
		
		this._position = IFree.Util.clone(config.position);
	},
	
	_createMask: function()
	{
		IFree.Util.createElement(this._bodyId, this._popupMaskId);
	},
	
	_destroyMask: function()
	{
		IFree.Util.getElement(this._popupMaskId).remove();
	},
						
	showScreen: function(screen)
	{
		this._createMask();
		this._updateMaskLocation();
		
		this._currentScreen = screen;
	
		$.template("window-template", this._windowTemplate);
		
		this._windowMarkup = $.tmpl("window-template", {
			id: this._popupWindowId
		});
		
		this._windowMarkup.appendTo($(IFree.Util.makeIdSelector(this._bodyId)));
		
		this._changeScreen(screen);
		
		if (IFree.Util.isWebkit())
		{
			this._setWebkitLocation();
		}
		else
		{
			this._setLocation();
		}
		
		IFree.Util.getElement(this._popupMaskId).click(IFree.Util.createDelegate(function(){
			this._onClose();
		}, this));
	},
	
	_changeScreen: function(screen)
	{
		if (IFree.Util.isWebkit())
		{
			this._setScreen(screen, this._windowMarkup.find(".ifree-popup-center"));
		}
		else
		{
			this._setScreen(screen, this._windowMarkup);
		}
	},
	
	_setScreen: function(screen, screenRenderTo)
	{
		screen.renderTo(screenRenderTo);
		screen.on("close", IFree.Util.createDelegate(this._onClose, this));
		screen.on("changescreen", IFree.Util.createDelegate(this._onChangeScreen, this));
	},
	
	_onClose: function()
	{
		this._windowMarkup.remove();
		
		this._destroyMask();
	},
	
	_onChangeScreen: function(screenConfig)
	{
		$(this._windowMarkup.find(".ifree-popup-screen")[0]).remove();
		
		var screen = IFree.Popup.ScreenFactory.create(screenConfig);
		
		this._changeScreen(screen);
	},
	
	_setWindowPosition: function()
	{
		this._setElementPosition(this._windowMarkup, this._position.left, this._position.top);		
	},
	
	_setLocation: function()
	{
		this._setElementSize(this._windowMarkup, 551, 470);
		this._setWindowPosition();		
		
		var leftPart = this._windowMarkup.find(".ifree-popup-left");
		IFree.Util.setElementBackgroundImage(leftPart, IFree.Util.getAbsolutePath("popup-background-left"));
		this._setElementSize(leftPart, 21, 470);
		this._setElementPosition(leftPart, 0, 0);
		
		var centerPart = this._windowMarkup.find(".ifree-popup-center");
		IFree.Util.setElementBackgroundImage(centerPart, IFree.Util.getAbsolutePath("popup-background-center"));
		this._setElementSize(centerPart, 535, 470);
		this._setElementPosition(centerPart, 21, 0);
		
		var rightPart = this._windowMarkup.find(".ifree-popup-right");
		IFree.Util.setElementBackgroundImage(rightPart, IFree.Util.getAbsolutePath("popup-background-right"));
		this._setElementSize(rightPart, 23, 470);
		this._setElementPosition(rightPart, 556, 0);		
	},
	
	_setWebkitLocation: function()
	{
		this._setElementSize(this._windowMarkup, 570, 445);
		IFree.Util.setElementBackgroundImage(this._windowMarkup, IFree.Util.getAbsolutePath("popup-background-center-shadowless"));
		this._setWindowPosition();
		
		var centerPart = this._windowMarkup.find(".ifree-popup-center");
		this._setElementSize(centerPart, 570, 445);
		this._setElementPosition(centerPart, 0, -10);
	},
	
	_updateMaskLocation: function()
	{
		var screenSize = IFree.UniverseLocationController.getSizeAbsolute();
		
		IFree.XYHelper.setOffset(this._popupMaskId, 0, 0);
		IFree.Util.setSize(this._popupMaskId, screenSize.width, screenSize.height);	
	},
	
	setPosition: function(position)
	{
		this._position = IFree.Util.clone(position);
		
		this._setWindowPosition();
		
		this._updateMaskLocation();
	}
});