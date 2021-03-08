import debounce from "../utils/debounce";
import minMax from "../utils/minMax";

class ScrollClipper {
	el = null;
	start = 1;
	end = 2;
	right = false;

	constructor(selector, { start = 1, end = 2, right = false }) {
		this.start = start;
		this.end = end;
		this.right = right;
		this.handleScroll = debounce(this.handleScroll, 1000 / 120, this);

		document.addEventListener("DOMContentLoaded", () => {
			this.el = document.querySelector(selector);

			window.addEventListener("scroll", this.handleScroll);
		});
	}

	handleScroll() {
		const { start, end, right } = this;
		const scroll = document.documentElement.scrollTop / window.innerHeight;
		const rel = minMax((scroll - start) / (end - start));

		if (scroll > start) {
			this.el.style.opacity = 1 - rel;
			this.el.style.transform = `translate(${
				rel * window.innerHeight * (right ? -1 : 1)
			}px, ${-rel * window.innerHeight}px)`;
		} else {
			this.el.style.opacity = 1;
			this.el.style.transform = "translate(0px, 0px)";
		}
	}
}

export default ScrollClipper;
