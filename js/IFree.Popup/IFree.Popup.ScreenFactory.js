IFree.Popup.ScreenFactory = new IFree.ObjectFactory({
	objectConstructors: {
		"single" 		: IFree.Popup.SingleScreen,
		"group"			: IFree.Popup.GroupScreen,
		"tryit"			: IFree.Popup.TryItScreen,
		"comingsoon"	: IFree.Popup.ComingSoonScreen
	}
});