IFree.LoadController = (function(){

	function _trainSpike()
	{
		if (IFree.Util.isIE())
		{
			var trainImage = IFree.ImageRegistry.getItem("world-train");
			trainImage._path = trainImage._path + "-ie";
		}
	};

	function _linesSpike()
	{
		if (IFree.Util.isIE() || IFree.Util.isOpera())
		{
			var linesObject = IFree.Util.getElement("ifree-lines");
			linesObject.detach();

			var earthObject = IFree.Util.getElement("ifree-earth");
			earthObject.after(linesObject);
		};
	};

	function _showWorld()
	{
		IFree.Util.getElement("ifree-body").removeClass("ifree-hidden");
	};

	return {
		load: function()
		{
			var mainTask = new IFree.Task();

			mainTask.call(IFree.ScreenResolutionRegistry, "loadItems").fire("resolutions");

			mainTask.call(IFree.Environment, "chooseAppropriateScale").after("resolutions");
			mainTask.call(IFree.ImageRegistry, "loadItems").after("resolutions").fire("imageItems");

			mainTask.call(_trainSpike).after("imageItems");

			mainTask.call(IFree.ImageLoadController, "loadImageGroup", ["first"]).after("imageItems").fire("firstGroupImages");
			mainTask.call(IFree.ImageLoadController, "loadAnimationFirstFrames").after("imageItems").fire("animationFirstImages");

			mainTask.call(IFree.ObjectRegistry, "loadItems").after("imageItems", "firstGroupImages", "animationFirstImages").fire("objectItems");

			mainTask.call(_linesSpike).after("objectItems");

			mainTask.call(IFree.TrainController, "createClickElement").fire("train");

			mainTask.call(IFree.AnimationController, "start").after("objectItems");
			mainTask.call(IFree.UniverseLocationController, "adjustLocation").after("objectItems").fire("adjustLocation");

			mainTask.call(_showWorld).after("adjustLocation");

			mainTask.call(IFree.ImageLoadController, "loadStationInputs").after("objectItems").fire("stationInputs");
			mainTask.call(IFree.TrainController, "start").after("objectItems", "stationInputs");

			mainTask.call(IFree.ImageLoadController, "loadImageGroup", ["popup"]).after("imageItems").fire("popupImages");
			mainTask.call(IFree.FontLoader, "load").after("objectItems").fire("webfonts");
			mainTask.call(IFree.Popup.PolaroidRegistry, "loadItems").after("objectItems").fire("polaroids");
			mainTask.call(IFree.Popup.PolaroidGroupRegistry, "loadItems").after("objectItems").fire("polaroidGroups");
			mainTask.call(IFree.Popup.ClickableObjectRegistry, "loadItems").after("polaroids", "polaroidGroups", "popupImages", "webfonts", "train").fire("clickableObjects");

			if (IFree.Util.isMobileUser())
			{
				mainTask.call(IFree.ClickMeController, "start").after("clickableObjects");
			}

			mainTask.start();
		}
	}
}());