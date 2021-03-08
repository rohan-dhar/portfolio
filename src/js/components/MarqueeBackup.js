const pxToLen = (px) => Number(px.split("px")[0]);
class Marquee {
	el = null;
	speed = 2;
	all = [];

	render() {
		const box = this.all[0].getBoundingClientRect();
		const parX = this.el.getBoundingClientRect().x;

		if (box.x + box.width < parX) {
			this.all[0].parentNode.insertBefore(this.all[0], null);
			this.setAll();
			this.all.forEach((child) => (child.style.left = `${0}px`));
		} else {
			this.all.forEach((child) => {
				child.style.left = `${
					pxToLen(child.style.left) - this.speed
				}px`;
			});
		}

		requestAnimationFrame(this.render);
	}

	setAll() {
		this.all = [...this.el.querySelectorAll("*")];
	}

	handleEnter() {
		this.speed /= 4;
	}

	handleLeave() {
		this.speed *= 4;
	}

	attachEvents() {
		this.el.addEventListener("mouseenter", this.handleEnter.bind(this));
		this.el.addEventListener("mouseleave", this.handleLeave.bind(this));
	}

	constructor(selector, speed = 3) {
		document.addEventListener("DOMContentLoaded", () => {
			this.el = document.querySelector(selector);
			this.render = this.render.bind(this);
			this.setAll();
			this.attachEvents();
			this.speed = speed;
			requestAnimationFrame(this.render);
		});
	}
}

export default Marquee;
