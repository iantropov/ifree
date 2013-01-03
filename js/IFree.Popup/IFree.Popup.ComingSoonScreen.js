IFree.Popup.ComingSoonScreen = IFree.Popup.SingleScreen.extend({

	_textAreaHeight: 40,
	_textAreaWidth: 250,
	_textAreaLeft: 190,
	
	_locateText: function()
	{
		this._super();
	
		this._setFontSize(this._textAreaContent, 130);
		this._textAreaContent.addClass("ifree-coming-soon-text");
	},
	
	/*Override*/
	_getScreenText: function()
	{
		return "The product is coming";
	}
});