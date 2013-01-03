IFree.Popup.TryItScreen = IFree.Popup.SingleScreen.extend({
	/*Override*/
	_textAreaTop: 375,
	
	/*Override*/
	_textAreaHeight: 45,
	
	_tryItButtonCls: "ifree-tryit-screen-button",
	_clickableCls: "ifree-clickable-object",
					
	init: function(config)
	{
		this._super(config);
		
		this._downloadUri = IFree.Popup.PolaroidRegistry.getItem(config.polaroidId).downloadUri();		
	},
	
	/*Override*/
	_renderTextArea: function()
	{
		var template = this._renderPopupElement([this._tryItButtonCls, this._clickableCls]);
		
		template += this._super();
		
		return template;
	},
	
	/*Override*/
	_locateItems: function()
	{
		this._super();
		
		this._locateButton();
	},
		
	_locateButton: function()
	{
		this._downloadButton = this._findChild(this._screenMarkup, this._tryItButtonCls);
		IFree.Util.setElementBackgroundImage(this._downloadButton, IFree.Util.getAbsolutePath("popup-tryit"));
		this._setElementSize(this._downloadButton, 101, 27);
		this._setElementPosition(this._downloadButton, 235, 345);
	},
	
	_onDownloadButtonClick: function()
	{
		IFree.Util.goToLink(this._downloadUri);
	},
	
	/*Override*/
	_initEvents: function()
	{
		this._super();
		
		this._downloadButton.click(IFree.Util.createDelegate(this._onDownloadButtonClick, this));
	}
});