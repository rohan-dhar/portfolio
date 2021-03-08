const debounce = (fn, delay = 100, thisCtx = null) => {
	let last = new Date().getTime();
	return (...args) => {
		const now = new Date().getTime();
		if (now > last + delay) {
			last = now;
			fn.call(thisCtx, ...args);
		}
	};
};

export default debounce;
