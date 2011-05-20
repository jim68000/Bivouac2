function iteration(list, func) {
	for (var i = 0; i < list.length; i++) {
		func(list[i]);
	}
}