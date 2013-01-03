
var _topLevelElementId = "ifree-body";

IFree.ObjectRegistry = new IFree.ItemRegistrySingleton({
	rootParentId: _topLevelElementId,
	itemsUrl: "resources/objects.json",
	itemConstructors: {
		"static" 		: IFree.StaticObject,
		"animated" 		: IFree.AnimatedObject,
		"station-input"	: IFree.AnimatedObject,
		"station"		: IFree.Station,
		"train"			: IFree.Train,
		"object"		: IFree.Object
	}
});