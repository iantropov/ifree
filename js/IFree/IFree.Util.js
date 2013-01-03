IFree = {};

IFree.Util = {

	/* Common stuf */

	createDelegate: function(originFn, scope, params, appendParams)
	{
		var returnFunction = function()
		{
			var p;
			if (!params)
				p = arguments;
			else if (appendParams)
				p = IFree.Util.toArray(arguments).concat(params);
			else
				p = params;
			
			originFn.apply(scope, p);
		}
		
		return returnFunction;
	},

	max: function(value1, value2)
	{
		return value1 > value2 ? value1 : value2;
	},
	
	min: function(value1, value2)
	{
		return value1 < value2 ? value1 : value2;
	},

	toArray: function(source)
	{
		var result = [];
		for (var i = 0; i < source.length; ++i)
			result.push(source[i]);
		
		return result;
	},
	
	foreach: function(array, itemFunction, scope)
	{
		if (!array)
			return;
	
		var i;
		for (i = 0; i < array.length; i++)
		{
			if (itemFunction.call(scope, array[i], i) === false)
				return;
		}
	},
	
	mapToArray: function(map)
	{
		if (!map)
			return;
	
		var resultArray = [];
	
		var key;
		for (key in map)
		{
			resultArray.push(map[key]);
		}
		
		return resultArray;
	},

	random: function(maxNumber)
	{
		return Math.floor(Math.random() * (maxNumber + 1));
	},
	
	swap: function(array, indexA, indexB)
	{
		var temp = array[indexA];
		array[indexA] = array[indexB];
		array[indexB] = temp;
	},
	
	arrayEmpty: function(array)
	{
		for (var i = 0; i < array.length; i++)
		{
			if (array[i])
				return false;
		}
		
		return true;
	},
	
	sign: function(value)
	{
		return value > 0 ? 1 : value < 0 ? -1 : 0;
	},
	
	cat: function(cats)
	{
		return cats.join(" ");
	},

	isArray: function(object)
	{
		return $.isArray(object);
	},

	clone: function(object)
	{
		return $.extend({}, object);
	},
	
	indexOf: function(array, value)
	{
		return $.inArray(value, array);
	},
	
	mod: function(a, b)
	{
		return a - b * Math.floor(a / b);
	},
	
	smod: function(a, b)
	{
		return a - b * Math.round(a / b);
	},
	
	angleDiff: function(a, b)
	{
		return Math.abs(IFree.Util.smod(a - b, 360));
	},

	/* Element`s stuff */
	
	makeIdSelector: function(elementId)
	{
		return "#" + elementId;
	},
	
	getElementSize: function(elementSelectorId)
	{
		return {
			width: $(elementSelectorId).outerWidth(),
			height: $(elementSelectorId).outerHeight()
		};
	},
	
	offset: function(elementId)
	{
		return IFree.Util.elementOffset(IFree.Util.getElement(elementId));
	},
	
	elementOffset: function(element)
	{
		return element.offset();
	},
	
	elementPosition: function(element)
	{
		return element.position();
	},
		
	setBackgroundImage: function(elementId, newImage)
	{
		IFree.Util.setElementBackgroundImage($(IFree.Util.makeIdSelector(elementId)), newImage);
	},
	
	setElementBackgroundImage: function(element, newImage)
	{
		element.css('background-image', 'url(' + newImage + ')');
	},
	
	setPosition: function(elementId, newX, newY)
	{
		IFree.Util.setElementPosition($(IFree.Util.makeIdSelector(elementId)), newX, newY);
	},
	
	setSize: function(elementId, newWidth, newHeight)
	{
		IFree.Util.setElementSize($(IFree.Util.makeIdSelector(elementId)), newWidth, newHeight);
	},
	
	setElementPosition: function(element, newX, newY)
	{
		element.css({
			"left"		: newX + "px",
			"top"		: newY + "px"
		});
	},
	
	setElementOffset: function(element, newX, newY)
	{
		element.offset({
			left: newX,
			top: newY
		});
	},
	
	setElementSize: function(element, newWidth, newHeight)
	{
		element.width(newWidth).height(newHeight);
	},
	
	setElementHeight: function(element, newHeight)
	{
		element.height(newHeight);
	},
	
	setElementWidth: function(element, newWidth)
	{
		element.width(newWidth);
	},	

	createElement: function(parentId, newElementId, classes)
	{
		$(IFree.Util.makeIdSelector(parentId))
			.append($("<div>")
				.attr({
					"id": newElementId,
					"class": classes
				})
			);
	},
	
	setFontSize: function(elementId, fontSize)
	{
		IFree.Util.setElementFontSize(IFree.Util.getElement(elementId), fontSize);
	},
	
	setElementFontSize: function(element, fontSize)
	{
		element.css({
			"font-size"		: fontSize + "%"
		});
	},
	
	rotateElement: function(elementId, angle)
	{
        var property = CSS3Helpers.findTransformProperty(document.body);
		
		var domElement = IFree.Util.getElement(elementId)[0];
		
		var rotateRule = "rotate(" + angle + "deg)";
		
		if (property == "filter")
		{
			var matrix = CSS3Helpers.getTransformationMatrix(rotateRule);
			CSS3Helpers.setMatrixFilter(domElement, matrix);
		} 
		else
		{
			domElement.style[property] = rotateRule;		
		} 
		
		/*
		$(IFree.Util.makeIdSelector(elementId)).css({
			"-sand-transform"         : "rotate(" + angle + "deg)"
		});
		*/
	},
	
	scaleX: function(elementId, value)
	{
		IFree.Util.scale(elementId, value, "x");
	},
	
	scaleY: function(elementId, value)
	{
		IFree.Util.scale(elementId, value, "y");
	},
	
	scale: function(elementId, value, dir)
	{
		var scaleIEValue = dir.toLowerCase() == "x" ? "fliph" : "flipv";
		var scaleValue = "scale" + dir.toUpperCase() + "(" + value + ")";

		var cssMap = {
			"-moz-transform"	: scaleValue,
			"-webkit-transform"	: scaleValue,
			"-o-transform"		: scaleValue,
			"transform"			: scaleValue,
			"filter"			: scaleIEValue
		};
		
		if (IFree.Util.isIE9())
		{
			delete cssMap["filter"];
			
			cssMap["msTransform"] = scaleValue;
		}
		
		IFree.Util.getElement(elementId).css(cssMap);
	},
		
	loadImage: function(imageUrl, completeCallback)
	{
		$('<img />')
			.load(function(){
				completeCallback();
			})
			.error(function(){
				alert("load of " + imageUrl + " failed!");
			})
			.attr('src', imageUrl);
	},
	
	windowWidth: function()
	{
		return IFree.Util.isMobileUser() ? window.innerWidth : $(window).width();
	},
	
	windowHeight: function()
	{
		return IFree.Util.isMobileUser() ? window.innerHeight : $(window).height();
	},
	
	onWindowResize: function(callback)
	{
		$(window).resize(callback);
	},
	
	onClick: function(elementId, callback)
	{
		var bindMethod = IFree.Util.isSamsung() ? "live" : "bind";
	
		$(IFree.Util.makeIdSelector(elementId))[bindMethod]("click", function(event){
			callback(event);
		});
	},
	
	getElement: function(elementId)
	{
		return $(IFree.Util.makeIdSelector(elementId));
	},
	
	maxWidth: function()
	{
		return $.scrollTo.max($("body")[0], "x");
	},
	
	maxHeight: function()
	{
		return $.scrollTo.max($("body")[0], "y");
	},
	
	makeSelector: function(className)
	{
		return "." + className;
	},
		
	elementDefined: function(element)
	{
		return element.length > 0;
	},
	
	scrollToElement: function(theElement)
	{
		var selectedPosX = 0;
		var selectedPosY = 0;
			  
		while(theElement != null){
			selectedPosX += theElement.offsetLeft;
			selectedPosY += theElement.offsetTop;
			theElement = theElement.offsetParent;
		}

		window.scrollTo(selectedPosX,selectedPosY);
	},
	
	onOrientationChange: function(handler)
	{
		window.onorientationchange = handler;
	},
	
	goToLink: function(link)
	{
		window.location = link;
	},
	
	/* User agents stuff */
	
	isIE: function()
	{
		return !!$.browser.msie;
	},
	
	isIE9: function()
	{
		return IFree.Util.isIE() && Math.floor(parseFloat($.browser.version)) >= 9; 
	},
	
	isOpera: function()
	{
		return !!$.browser.opera;
	},
	
	isWebkit: function()
	{
		return !!$.browser.webkit;
	},
	
	isAndroid: function()
	{
		return IFree.Util.testUserAgents(["android"]);
	},
	
	isSamsung: function()
	{
		return IFree.Util.testUserAgents(["samsung"]);
	},

	isApple: function()
	{
		return IFree.Util.testUserAgents(["iphone", "ipad"]);
	},

	testUserAgents: function(testUserAgents)
	{
		var userAgent = navigator.userAgent.toLowerCase();
	
		for (var i = 0; i < testUserAgents.length; i++)
		{
			if (userAgent.match(new RegExp(testUserAgents[i])))
				return true;
		}
		
		return false;
	},
	
	isMobileUser: function()
	{
		return IFree.Util.testUserAgents(["android", "iphone", "ipad", "samsung"]);
	},
	
	/* Other */
	
	getAbsolutePath: function(imageId)
	{
		return IFree.Environment.getAbsolutePath(IFree.ImageRegistry.getItem(imageId).path());
	}
}