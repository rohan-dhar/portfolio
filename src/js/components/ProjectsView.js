import ProjectScene from "../scenes/ProjectScene";
import { TweenLite, Expo } from "gsap";
import { cursor } from "../index";
import debounce from "../utils/debounce";
import leftRight from "../../img/left-right.svg";

class ProjectsView {
	static threshold = 200;

	el = null;
	width = 0;
	scene = null;
	speed = 1.1;
	num = 0;
	base = 0;
	start = -1;
	now = 0;
	tween = null;

	_active = 0;
	_childWidth = 1;

	get active() {
		return this._active;
	}

	set active(active) {
		if (active < 0 || active > this.num) {
			return;
		}
		this.scene.active = active;
		this._active = active;
	}

	get childWidth() {
		return this._childWidth;
	}

	set childWidth(childWidth) {
		this.scene.childWidth = childWidth;
		this._childWidth = childWidth;
	}

	next() {
		this.active += 1;
		this.moveToActive();
	}

	prev() {
		this.active -= 1;
		this.moveToActive();
	}

	attachEvents() {
		this.el.addEventListener("mousedown", ({ pageX: x }) => {
			this.start = x;
			this.base = this.el.scrollLeft;
			// if (this.tween) {
			// 	this.tween.kill();
			// }
		});

		document
			.querySelector("#projects-move-left")
			.addEventListener("click", this.prev);

		document
			.querySelector("#projects-move-right")
			.addEventListener("click", this.next);

		document.addEventListener("keydown", ({ keyCode }) => {
			if (keyCode === 37) {
				this.prev();
			} else if (keyCode === 39) {
				this.next();
			}
		});

		document.addEventListener("mouseup", () => {
			this.start = -1;
			this.updateAcive();
			this.moveToActive();
		});
		document.addEventListener("mousemove", ({ pageX: x }) => {
			this.now = x;
		});
		window.addEventListener(
			"resize",
			debounce(this.setChildWidth, 1000 / 60, this)
		);
	}

	updateAcive() {
		const movedBy = this.el.scrollLeft - this.active * this.childWidth;
		if (movedBy >= ProjectsView.threshold) {
			this.active++;
		} else if (movedBy <= -ProjectsView.threshold) {
			this.active--;
		}
	}

	isDown() {
		return this.start !== -1;
	}

	moveToActive() {
		const to = this.childWidth * this.active;
		this.setChildWidth();
		this.tween = TweenLite.to(this.el, {
			scrollLeft: to,
			duration: 0.5,
			ease: Expo.easeOut,
		}).then(() => (this.tween = null));
	}

	render() {
		const isDown = this.isDown();
		this.scene.isDown = isDown || this.tween !== null;
		if (isDown) {
			this.el.scrollLeft =
				this.base + this.speed * (this.start - this.now);
		}
		this.scene.scroll = this.el.scrollLeft / this.childWidth;

		requestAnimationFrame(this.render);
	}

	setChildWidth() {
		this.childWidth = this.el
			.querySelector(".project")
			.getBoundingClientRect().width;
	}

	constructor() {
		this.scene = new ProjectScene();
		this.render = this.render.bind(this);
		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);

		document.addEventListener("DOMContentLoaded", () => {
			this.el = document.querySelector("#projects");
			this.attachEvents();
			this.setChildWidth();

			cursor.add("#projects", {
				"background-image": `url("${leftRight}")`,
				borderColor: "transparent",
				height: "55px",
				width: "55px",
			});
			this.num = this.el.querySelector(".project").length;

			requestAnimationFrame(this.render);
		});
	}
}

export default ProjectsView;
