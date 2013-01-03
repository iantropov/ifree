IFree.Popup.ClickableObjectRegistry = new IFree.ItemRegistrySingleton({
	itemsUrl: "resources/clickableobjects.json",
	itemConstructors: {
		"clickableobject" 	: IFree.Popup.ClickableObject
	},
	defaultProperties: {
		type	: "clickableobject"
	}
});