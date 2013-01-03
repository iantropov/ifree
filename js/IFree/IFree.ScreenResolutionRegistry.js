IFree.ScreenResolutionRegistry = new IFree.ItemRegistrySingleton({
	itemsUrl: "resources/screenresolutions.json",
	itemConstructors: {
		"resolution" 	: IFree.ScreenResolution
	},
	defaultProperties: {
		type	: "resolution"
	}
});