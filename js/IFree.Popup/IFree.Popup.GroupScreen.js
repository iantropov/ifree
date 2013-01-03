IFree.Popup.GroupScreen = IFree.Popup.Screen.extend({
					
	_polaroidTemplate:	"<div class='ifree-group-screen ifree-small-polaroid ifree-clickable-object'>" +
							"<div class='ifree-group-screen-polaroid-photo ifree-popup-component'>" +
							"</div>" +
							"<div class='ifree-group-screen-polaroid-text ifree-popup-component ifree-caption-text'>" +
							"</div>" +
						"</div>",

	_polaroidWidth: 175,
	_polaroidHeight: 201,
	
	_groupScreenContentCls: "ifree-group-screen-content",
						
	init: function(config)
	{
		this._super(config);
	
		this._currentConfig = config;
	
		this._groupIds = config.groupIds;
		this._currentIndex = config.currentIndex || 0;
		
		this._groupId = this._groupIds[this._currentIndex];
	
		this._polaroidIds = IFree.Popup.PolaroidGroupRegistry.getItem(this._groupId).items();
	},
	
	renderTo: function(target)
	{
		$.template("group-screen-template", this._renderTemplate({
			previousNavigation: this._currentIndex > 0,
			nextNavigation: this._currentIndex < this._groupIds.length - 1
		}));
		
		this._screenMarkup = $.tmpl("group-screen-template");
		
		this._screenMarkup.appendTo(target);

		this._renderPolaroids();
		
		this._locateItems();
		
		this._initEvents();
	},
	
	/*Override*/
	_renderContent: function()
	{
		var template = this._renderPopupElement(this._groupScreenContentCls);
		
		return template;
	},

	_renderPolaroid: function(polaroidId, polaroidIndex, target)
	{
		$.template("small-polaroid-template", this._polaroidTemplate);

		var polaroidMarkup = $.tmpl("small-polaroid-template");
		IFree.Util.setElementBackgroundImage(polaroidMarkup, IFree.Util.getAbsolutePath("polaroid-small-background"));
		this._setElementSize(polaroidMarkup, this._polaroidWidth, this._polaroidHeight);

		var polaroid = IFree.Popup.PolaroidRegistry.getItem(polaroidId);

		var polaroidPhoto = this._locateImageElementOn(polaroidMarkup, polaroid.getSmallPhotoId(), "ifree-group-screen-polaroid-photo", 140, 130, 18, 17);

		var polaroidText = this._locateElementOn(polaroidMarkup, "ifree-group-screen-polaroid-text", 140, 34, 18, 154);
		polaroidText.text(polaroid.caption());
		this._setFontSize(polaroidText, polaroid.smallFontSize());

		this._polaroidAllocator.allocateNext(polaroidMarkup);
	},
	
	_renderPolaroids: function()
	{
		var popupContent = this._locateElement(this._groupScreenContentCls, 538, 400, 16, 40);
		
		this._polaroidAllocator = new IFree.Popup.PolaroidAllocator({
			polaroidWidth: this._polaroidWidth,
			polaroidHeight: this._polaroidHeight,
			area: popupContent,
			polaroidCount: this._polaroidIds.length
		});
		
		IFree.Util.foreach(this._polaroidIds, function(polaroidId, polaroidIdIndex){
			this._renderPolaroid(polaroidId, polaroidIdIndex, popupContent);
		}, this);
	},
	
	_onPolaroidClick: function(polaroidIndex)
	{
		var polaroid = IFree.Popup.PolaroidRegistry.getItem(this._polaroidIds[polaroidIndex]);
	
		var singleScreenConfig = {
			polaroidId: polaroid.id(),
			groupConfig: IFree.Util.clone(this._currentConfig),
			type: polaroid.screenType()
		};
		
		this.fireEvent("changescreen", singleScreenConfig);
	},
	
	_fireChangeScreen: function(currentIndex)
	{
		var screenConfig = IFree.Util.clone(this._currentConfig);
		screenConfig.currentIndex = currentIndex;
	
		this.fireEvent("changescreen", screenConfig);		
	},
	
	_onPreviousClick: function()
	{
		this._fireChangeScreen(this._currentIndex - 1);
	},
	
	_onNextClick: function()
	{
		this._fireChangeScreen(this._currentIndex + 1);
	},
	
	_initEvents: function()
	{		
		IFree.Util.foreach(this._polaroidIds, function(polaroidId, polaroidIdIndex){
			$(this._screenMarkup.find(".ifree-small-polaroid")[polaroidIdIndex]).click(IFree.Util.createDelegate(this._onPolaroidClick, this, [polaroidIdIndex]));
		}, this);
		
		this._super();
	}	
});