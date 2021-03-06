const pxToLen = (px) => Number(px.split("px")[0]);
import { cursor, audio } from "../index";

class Marquee {
	el = null;
	speed = 2;
	first = null;
	last = null;
	right = false;
	slowSpeed = 1;

	render() {
		const first = this.first.getBoundingClientRect();
		const last = this.last.getBoundingClientRect();

		const par = this.el.getBoundingClientRect();

		if (
			(first.x + first.width < par.x && !this.right) ||
			(last.x > par.x + par.width && this.right)
		) {
			if (this.right) {
				this.el.scrollLeft += last.width;
				this.last.parentNode.insertBefore(this.last, this.first);
				this.setFirst();
			} else {
				this.el.scrollLeft -= first.width;
				this.first.parentNode.insertBefore(this.first, null);
				this.setFirst();
			}
		} else {
			this.el.scrollLeft += this.speed * (this.right ? -1 : 1);
		}

		requestAnimationFrame(this.render);
	}

	setFirst() {
		this.first = this.el.children[0];
		this.last = this.el.children[this.el.children.length - 1];
	}

	swapSpeeds() {
		const t = this.speed;
		this.speed = this.slowSpeed;
		this.slowSpeed = t;
	}

	handleEnter() {
		this.swapSpeeds();
		audio.start();
	}

	handleLeave() {
		this.swapSpeeds();
		audio.stop();
	}

	attachEvents() {
		this.el.addEventListener("mouseenter", this.handleEnter.bind(this));
		this.el.addEventListener("mouseleave", this.handleLeave.bind(this));
	}

	constructor(
		selector,
		{ hoverStyles, right = false, speed = 2, slowSpeed } = {}
	) {
		document.addEventListener("DOMContentLoaded", () => {
			this.el = document.querySelector(selector);
			this.render = this.render.bind(this);
			this.setFirst();
			this.attachEvents();
			this.speed = speed;
			this.slowSpeed = slowSpeed ?? this.speed / 2;
			this.right = right;
			if (this.right) {
				this.el.scrollLeft = this.el.scrollWidth - this.el.clientWidth;
			}

			cursor.add(
				selector,
				hoverStyles ?? {
					borderColor: "transparent",
					backgroundColor: "#333",
					height: "50px",
					width: "50px",
				}
			);
			requestAnimationFrame(this.render);
		});
	}
}

export default Marquee;
