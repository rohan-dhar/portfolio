class Wave {
	static resolution = 3;

	ctx = null;
	canvas = null;
	color = "#000";

	mouseX = 0;

	waveFn = {
		a: 1,
		b: 1,
		c: 1,
		d: 1,
		e: 1,
	};

	ampFn = {
		a: 1,
		b: 1,
		c: 1,
	};

	getY(x, t) {
		return (
			this.canvas.height -
			(this.ampFn.a * Math.sin(this.ampFn.b * t) + this.ampFn.c) *
				(Math.exp(
					this.waveFn.a *
						Math.sin(this.waveFn.b * (x + t) + this.waveFn.c) +
						this.waveFn.d
				) -
					this.waveFn.e)
		);
	}

	constructor(canvas, ctx, waveFn, ampFn, color) {
		this.waveFn = waveFn;
		this.ampFn = ampFn;
		this.ctx = ctx;
		this.canvas = canvas;
		this.color = color;
		window.addEventListener(
			"mousemove",
			({ pageX }) => (this.mouseX = pageX)
		);
	}

	render(t) {
		const { mouseX } = this;

		const { width, height } = this.canvas;
		const jump = Wave.resolution;
		this.ctx.fillStyle = this.color;
		this.ctx.beginPath();
		this.ctx.moveTo(0, height);

		for (let x = 0; x < width; x += jump) {
			this.ctx.lineTo(x, this.getY(x, t));
		}

		this.ctx.lineTo(width, this.getY(width, t));
		this.ctx.lineTo(width, height);
		this.ctx.moveTo(0, height);
		this.ctx.closePath();
		this.ctx.fill();
	}
}

class Waves {
	static bg = "#131024";
	static colors = ["#ffa15555", "#ff557555", "#ff4a8655", "#ffa15555"];

	el = null;
	canvas = null;
	ctx = null;
	speed = 15;

	t = 0;
	waves = [];

	setDims() {
		const { height, width } = this.el.getBoundingClientRect();
		this.canvas.height = height * 0.75;
		this.canvas.width = width;
	}

	attachEvents() {
		window.addEventListener("resize", this.setDims);
	}

	populate() {
		this.waves.push(
			new Wave(
				this.canvas,
				this.ctx,
				{ a: 1.2, b: 1 / 250, c: 0, d: 4, e: 20 },
				{ a: 0.5, b: 1 / 200, c: 0.5 },
				Waves.colors[1]
			)
		);
		this.waves.push(
			new Wave(
				this.canvas,
				this.ctx,
				{ a: 1.2, b: 1 / 250, c: 2, d: 4, e: 20 },
				{ a: 0.4, b: 1 / 300, c: 0.5 },
				Waves.colors[0]
			)
		);
		this.waves.push(
			new Wave(
				this.canvas,
				this.ctx,
				{ a: 1.2, b: 1 / 250, c: 4, d: 4, e: 20 },
				{ a: 0.4, b: 1 / 350, c: 0.5 },
				Waves.colors[2]
			)
		);
		this.waves.push(
			new Wave(
				this.canvas,
				this.ctx,
				{ a: 1.2, b: 1 / 250, c: 7, d: 4, e: 20 },
				{ a: 0.4, b: 1 / 150, c: 0.5 },
				Waves.colors[3]
			)
		);
	}

	constructor() {
		this.render = this.render.bind(this);

		document.addEventListener("DOMContentLoaded", () => {
			this.el = document.querySelector("#page-5");
			this.canvas = this.el.querySelector("#page-5-waves");
			this.ctx = this.canvas.getContext("2d");
			this.setDims = this.setDims.bind(this);
			this.populate();
			this.setDims();
			this.attachEvents();
			requestAnimationFrame(this.render);
		});
	}

	render() {
		this.canvas.height = this.canvas.height;
		this.t += this.speed;
		if (this.t >= 2000 * Math.PI) {
			this.t = 0;
		}
		this.waves.forEach((wave) => wave.render(this.t));
		requestAnimationFrame(this.render);
	}
}

export default Waves;
