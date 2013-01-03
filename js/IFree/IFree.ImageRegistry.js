IFree.ImageRegistry = new IFree.ItemRegistrySingleton({
	itemsUrl: "resources/images.json",
	itemConstructors: {
		"static" 	: IFree.Image,
		"animated" 	: IFree.AnimatedImage
	},
	defaultProperties: {
		group	: "second",
		type	: "static"	
	}
});