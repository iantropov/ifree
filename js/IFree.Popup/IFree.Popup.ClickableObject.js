IFree.Popup.ClickableObject = Class.extend({
	init: function(config)
	{
		this._initialConfig = IFree.Util.clone(config);
	
		IFree.Util.onClick(config.objectId, IFree.Util.createDelegate(function(){
			
			var popupWindow = new IFree.Popup.Window({
				position: this._getPopupWindowPosition()
			});

			popupWindow.showScreen(IFree.Popup.ScreenFactory.create(config.screenConfig));
			
			IFree.Util.onWindowResize(IFree.Util.createDelegate(function(){
				popupWindow.setPosition(this._getPopupWindowPosition());
			}, this));
		}, this));
		
		if (IFree.Util.isMobileUser())
			return;
		
		IFree.Util.getElement(config.objectId).hover(
			function(){
				var objectPosition = IFree.XYHelper.getOffset(config.objectId);
				var object = IFree.ObjectRegistry.getItem(config.objectId);

				IFree.ClickMePopup.showAt(objectPosition.left, objectPosition.top, object.width(), object.height(), config.targetSide, config.offsetLeft, config.offsetTop);		
			},
			function(){
				IFree.ClickMePopup.hide();
			}
		).addClass("ifree-clickable-object");
	},
	
	_getPopupWindowPosition: function()
	{
		var solarSystemCoordinates = IFree.ObjectRegistry.getItem("ifree-solar-system").coordinates();
		
		return {
			left: solarSystemCoordinates[0] + 130,
			top: solarSystemCoordinates[1] + 224
		};
	},
	
	config: function()
	{
		return this._initialConfig;
	},
	
	objectId: function()
	{
		return this._initialConfig.objectId;
	}
});