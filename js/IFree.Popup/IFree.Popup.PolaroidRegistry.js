IFree.Popup.PolaroidRegistry = new IFree.ItemRegistrySingleton({
	itemsUrl: "resources/polaroids.json",
	itemConstructors: {
		"polaroid" 	: IFree.Popup.Polaroid
	},
	defaultProperties: {
		type	: "polaroid"
	}
});