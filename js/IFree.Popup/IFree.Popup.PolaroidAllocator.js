IFree.Popup.PolaroidAllocator = Class.extend({
	_layouts:	[
					[],
					[1],
					[2],
					[3],
					[[2], [2]],
					[[3], [2]],
					[[3], [3]]
				],
				
	_polaroidXSpace: 4,
	_polaroidYSpace: 4,
	
	_centerXCoef: 0.5,
	_centerYCoef: 0.25,
	
	_polaroidRowTemplate: 	"<div class='ifree-polaroid-row ifree-popup-component'>" +
							"</div>",
	_polaroidContainerTemplate:	"<div class='ifree-polaroid-container ifree-popup-component'>" +
								"</div>",
	
	init: function(config)
	{
		this._layout = this._layouts[config.polaroidCount];
		
		$.template("polaroid-container-template", this._polaroidContainerTemplate);
		$.template("polaroid-row-template", this._polaroidRowTemplate);

		this._polaroidWidth = config.polaroidWidth;
		this._polaroidHeight = config.polaroidHeight;
		
		this._areaElement = config.area;
		
		this._currentRow = 0;
		this._currentColumn = 0;
		
		this._currentXOffset = 0;
		this._currentYOffset = 0;

		this._rows = [];
		
		this._row = this._createRow();
		
		this._container = this._renderMarkup("polaroid-container-template");
		this._container.appendTo(this._areaElement);
		
		this._appendRow(this._row);
	},
	
	_appendRow: function(row)
	{
		this._rows.push(row);
	
		this._currentYOffset += this._polaroidYSpace;
		
		row.appendTo(this._container);
		
		this._locateElement(row, 0, this._currentYOffset);
		
		this._currentYOffset += this._polaroidHeight + this._polaroidYSpace;	
	},
	
	_createRow: function()
	{
		return this._renderMarkup("polaroid-row-template");
	},
	
	_renderMarkup: function(templateName)
	{
		return $.tmpl(templateName);
	},
	
	_centerHorizontally: function(row)
	{
		var rowWidth = this._currentXOffset;
		
		var rowStartX = (this._relX(this._areaElement.width()) - rowWidth) * this._centerXCoef;
		
		this._locateElement(row, rowStartX, this._relY(row.position().top));
	},
	
	_centerVertically: function(rows)
	{
		var rowsHeight = this._currentYOffset;
				
		var yOffset = (this._relY(this._areaElement.height()) - rowsHeight) * this._centerYCoef;

		IFree.Util.foreach(rows, function(row){
			yOffset += this._polaroidYSpace;
		
			this._locateElement(row, this._relX(row.position().left), yOffset);
			
			yOffset += this._polaroidHeight + this._polaroidYSpace;			
		}, this);		
	},
	
	_locateElement: function(element, newX, newY)
	{
		IFree.XYHelper.setElementPosition(element, newX, newY);
	},
	
	_relX: function(x)
	{
		return IFree.Environment.xFromScreenToRelative(x);
	},
	
	_relY: function(y)
	{
		return IFree.Environment.yFromScreenToRelative(y);
	},
	
	_appendPolaroid: function(row, polaroid)
	{
		this._currentXOffset += this._polaroidXSpace;
		
		polaroid.appendTo(row);
		this._locateElement(polaroid, this._currentXOffset, 0);
		
		this._currentXOffset += this._polaroidWidth + this._polaroidXSpace;
	},
	
	allocateNext: function(polaroidElement)
	{
		this._appendPolaroid(this._row, polaroidElement);
		
		if (this._currentColumn == this._layout[this._currentRow] - 1)
		{
			this._centerHorizontally(this._row);
			this._centerVertically(this._rows);
			
			this._currentColumn = 0;
			this._currentRow++;
			this._currentXOffset = 0;
			
			if (this._currentRow < this._layout.length)
			{			
				this._row = this._createRow();
				this._appendRow(this._row);
			}
		}
		else
		{
			this._currentColumn++;
		}
	}
});