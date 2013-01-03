IFree.Popup.PolaroidGroupRegistry = new IFree.ItemRegistrySingleton({
	itemsUrl: "resources/polaroidgroups.json",
	itemConstructors: {
		"polaroidgroup"	: IFree.Popup.PolaroidGroup
	},
	defaultProperties: {
		type	: "polaroidgroup"
	}
});