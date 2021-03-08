import { Color } from "three";
import { TimelineLite, Power2 } from "gsap";

// co-op     - blue        / red
// spectacle - green       / blue
// treebo    - light green / dark green
// aba       - red         / pink
// featherx  - light blue  / purple
// storage   - red         / blue
// dhwani    - dark red   / pink

class Projects {
	static duration = 10;
	static ease = Power2.easeIn;

	shapes = [];
	shapesTimelines = [];

	lightUp = null;
	lightUpTimeline = null;

	lightDown = null;
	lightDownTimeline = null;

	get length() {
		return this.shapes.length;
	}

	addCoop() {
		const [one, two, three, four, five] = this.shapesTimelines;
		const rest = { duration: 0, ease: Projects.ease };

		// 'C'
		one.addLabel("coop").to(
			this.shapes[0].scale,
			{ x: 4, y: 1, ...rest },
			"coop"
		);
		three.to(this.shapes[2].scale, { x: 4, y: 1, ...rest }, "coop");
		two.to(this.shapes[1].scale, { x: 1, y: 4, ...rest }, "coop");
		four.to(this.shapes[3].scale, { x: 4, y: 1, ...rest }, "coop");
		five.to(this.shapes[4].scale, { x: 4, y: 1, ...rest }, "coop");

		one.to(this.shapes[0].position, { x: 0, y: 3.75, ...rest }, "coop");
		three.to(this.shapes[2].position, { x: 0, y: -3.75, ...rest }, "coop");
		four.to(this.shapes[3].position, { x: 0, y: 3.75, ...rest }, "coop");
		five.to(this.shapes[4].position, { x: 0, y: -3.75, ...rest }, "coop");
		two.to(this.shapes[1].position, { x: -2.25, y: 0, ...rest }, "coop");

		this.lightUpTimeline.addLabel("coop").to(this.lightUp, {
			_customColorR: 0xff,
			_customColorG: 0x22,
			_customColorB: 0x44,
			...rest,
			onUpdate: () =>
				this.lightUp.color.setRGB(
					this.lightUp._customColorR / 255,
					this.lightUp._customColorG / 255,
					this.lightUp._customColorB / 255
				),
		});
		this.lightDownTimeline.addLabel("coop").to(this.lightDown, {
			_customColorR: 0x22,
			_customColorG: 0x33,
			_customColorB: 0xff,
			...rest,
			onUpdate: () =>
				this.lightDown.color.setRGB(
					this.lightDown._customColorR / 255,
					this.lightDown._customColorG / 255,
					this.lightDown._customColorB / 255
				),
		});
	}

	addSpectacle() {
		const [one, two, three, four, five] = this.shapesTimelines;
		const rest = { duration: Projects.duration, ease: Projects.ease };

		// 'S'
		one.addLabel("spectacle").to(
			this.shapes[0].scale,
			{ x: 2.75, y: 1, ...rest },
			"spectacle"
		);
		two.to(this.shapes[1].scale, { x: 1, y: 3, ...rest }, "spectacle");
		three.to(this.shapes[2].scale, { x: 2.75, y: 1, ...rest }, "spectacle");
		four.to(this.shapes[3].scale, { x: 1, y: 3, ...rest }, "spectacle");
		five.to(this.shapes[4].scale, { x: 2.75, y: 1, ...rest }, "spectacle");

		one.to(this.shapes[0].position, { x: 0, y: 3.5, ...rest }, "spectacle");
		two.to(
			this.shapes[1].position,
			{ x: -1.3, y: 1.75, ...rest },
			"spectacle"
		);
		three.to(this.shapes[2].position, { x: 0, y: 0, ...rest }, "spectacle");
		four.to(
			this.shapes[3].position,
			{ x: 1.3, y: -1.75, ...rest },
			"spectacle"
		);
		five.to(
			this.shapes[4].position,
			{ x: 0, y: -3.5, ...rest },
			"spectacle"
		);
		this.lightUpTimeline.addLabel("spectacle").to(this.lightUp, {
			_customColorR: 0x44,
			_customColorG: 0x44,
			_customColorB: 0xff,
			...rest,
			onUpdate: () =>
				this.lightUp.color.setRGB(
					this.lightUp._customColorR / 255,
					this.lightUp._customColorG / 255,
					this.lightUp._customColorB / 255
				),
		});
		this.lightDownTimeline.addLabel("spectacle").to(this.lightDown, {
			_customColorR: 0x33,
			_customColorG: 0xdd,
			_customColorB: 0x55,
			...rest,
			onUpdate: () =>
				this.lightDown.color.setRGB(
					this.lightDown._customColorR / 255,
					this.lightDown._customColorG / 255,
					this.lightDown._customColorB / 255
				),
		});
	}

	addTreebo() {
		const [one, two, three, four, five] = this.shapesTimelines;
		const rest = { duration: Projects.duration, ease: Projects.ease };

		// 'T'
		one.addLabel("treebo").to(
			this.shapes[0].scale,
			{ x: 4.5, y: 1, ...rest },
			"treebo"
		);
		two.to(this.shapes[1].scale, { x: 4.5, y: 1, ...rest }, "treebo");
		three.to(this.shapes[2].scale, { x: 4.5, y: 1, ...rest }, "treebo");
		four.to(this.shapes[3].scale, { x: 1.2, y: 5, ...rest }, "treebo");
		five.to(this.shapes[4].scale, { x: 1.2, y: 5, ...rest }, "treebo");

		one.to(this.shapes[0].position, { x: 0, y: 3.5, ...rest }, "treebo");
		two.to(this.shapes[1].position, { x: 0, y: 3.5, ...rest }, "treebo");
		three.to(this.shapes[2].position, { x: 0, y: 3.5, ...rest }, "treebo");
		four.to(this.shapes[3].position, { x: 0, y: -1, ...rest }, "treebo");
		five.to(this.shapes[4].position, { x: 0, y: -1, ...rest }, "treebo");

		this.lightUpTimeline.addLabel("treebo").to(this.lightUp, {
			_customColorR: 0x00,
			_customColorG: 0x66,
			_customColorB: 0x00,
			...rest,
			onUpdate: () =>
				this.lightUp.color.setRGB(
					this.lightUp._customColorR / 255,
					this.lightUp._customColorG / 255,
					this.lightUp._customColorB / 255
				),
		});
		this.lightDownTimeline.addLabel("treebo").to(this.lightDown, {
			_customColorR: 0x00,
			_customColorG: 0xdd,
			_customColorB: 0x77,
			...rest,
			onUpdate: () =>
				this.lightDown.color.setRGB(
					this.lightDown._customColorR / 255,
					this.lightDown._customColorG / 255,
					this.lightDown._customColorB / 255
				),
		});
	}

	addAba() {
		const [one, two, three, four, five] = this.shapesTimelines;
		const rest = { duration: Projects.duration, ease: Projects.ease };

		// 'A'

		one.addLabel("aba").to(
			this.shapes[0].scale,
			{ x: 1, y: 6, ...rest },
			"aba"
		);
		two.to(this.shapes[1].scale, { x: 3, y: 1, ...rest }, "aba");
		three.to(this.shapes[2].scale, { x: 1, y: 6, ...rest }, "aba");
		four.to(this.shapes[3].scale, { x: 3, y: 1, ...rest }, "aba");
		five.to(this.shapes[4].scale, { x: 3, y: 1, ...rest }, "aba");

		one.to(this.shapes[0].position, { x: -2.5, y: 0, ...rest }, "aba");
		two.to(this.shapes[1].position, { x: 0, y: 3.75, ...rest }, "aba");
		three.to(this.shapes[2].position, { x: 2.5, y: 0, ...rest }, "aba");
		four.to(this.shapes[3].position, { x: 0, y: 0.2, ...rest }, "aba");
		five.to(this.shapes[4].position, { x: 0, y: 0.2, ...rest }, "aba");
		this.lightUpTimeline.addLabel("aba").to(this.lightUp, {
			_customColorR: 0x33,
			_customColorG: 0x55,
			_customColorB: 0xff,
			...rest,
			onUpdate: () =>
				this.lightUp.color.setRGB(
					this.lightUp._customColorR / 255,
					this.lightUp._customColorG / 255,
					this.lightUp._customColorB / 255
				),
		});
		this.lightDownTimeline.addLabel("aba").to(this.lightDown, {
			_customColorR: 0xff,
			_customColorG: 0x22,
			_customColorB: 0x88,
			...rest,
			onUpdate: () =>
				this.lightDown.color.setRGB(
					this.lightDown._customColorR / 255,
					this.lightDown._customColorG / 255,
					this.lightDown._customColorB / 255
				),
		});
	}

	addFeatherX() {
		const [one, two, three, four, five] = this.shapesTimelines;
		const rest = { duration: Projects.duration, ease: Projects.ease };

		// 'F'

		one.addLabel("featherx").to(
			this.shapes[0].scale,
			{ x: 3, y: 1, ...rest },
			"featherx"
		);

		four.to(this.shapes[3].scale, { x: 3, y: 1, ...rest }, "featherx");
		two.to(this.shapes[1].scale, { x: 2.5, y: 1, ...rest }, "featherx");
		five.to(this.shapes[4].scale, { x: 2.5, y: 1, ...rest }, "featherx");
		three.to(this.shapes[2].scale, { x: 1, y: 6, ...rest }, "featherx");

		one.to(this.shapes[0].position, { x: 1, y: 3.75, ...rest }, "featherx");
		four.to(
			this.shapes[3].position,
			{ x: 1, y: 3.75, ...rest },
			"featherx"
		);

		two.to(this.shapes[1].position, { x: 1, y: 0, ...rest }, "featherx");
		five.to(this.shapes[4].position, { x: 1, y: 0, ...rest }, "featherx");

		three.to(
			this.shapes[2].position,
			{ x: -1.5, y: 0, ...rest },
			"featherx"
		);
		this.lightUpTimeline.addLabel("featherx").to(this.lightUp, {
			_customColorR: 0x00,
			_customColorG: 0x22,
			_customColorB: 0xcc,
			...rest,
			onUpdate: () =>
				this.lightUp.color.setRGB(
					this.lightUp._customColorR / 255,
					this.lightUp._customColorG / 255,
					this.lightUp._customColorB / 255
				),
		});
		this.lightDownTimeline.addLabel("featherx").to(this.lightDown, {
			_customColorR: 0x44,
			_customColorG: 0xaa,
			_customColorB: 0xff,
			...rest,
			onUpdate: () =>
				this.lightDown.color.setRGB(
					this.lightDown._customColorR / 255,
					this.lightDown._customColorG / 255,
					this.lightDown._customColorB / 255
				),
		});
	}

	addStorage() {
		const [one, two, three, four, five] = this.shapesTimelines;
		const rest = { duration: Projects.duration, ease: Projects.ease };

		// 'S'

		one.addLabel("storage").to(
			this.shapes[0].scale,
			{ x: 2.75, y: 1, ...rest },
			"storage"
		);
		two.to(this.shapes[1].scale, { x: 1, y: 3, ...rest }, "storage");
		three.to(this.shapes[2].scale, { x: 2.75, y: 1, ...rest }, "storage");
		four.to(this.shapes[3].scale, { x: 1, y: 3, ...rest }, "storage");
		five.to(this.shapes[4].scale, { x: 2.75, y: 1, ...rest }, "storage");

		one.to(this.shapes[0].position, { x: 0, y: 3.5, ...rest }, "storage");
		two.to(
			this.shapes[1].position,
			{ x: -1.3, y: 1.75, ...rest },
			"storage"
		);
		three.to(this.shapes[2].position, { x: 0, y: 0, ...rest }, "storage");
		four.to(
			this.shapes[3].position,
			{ x: 1.3, y: -1.75, ...rest },
			"storage"
		);
		five.to(this.shapes[4].position, { x: 0, y: -3.5, ...rest }, "storage");
		this.lightUpTimeline.addLabel("storage").to(this.lightUp, {
			_customColorR: 0x22,
			_customColorG: 0x33,
			_customColorB: 0xdd,
			...rest,
			onUpdate: () =>
				this.lightUp.color.setRGB(
					this.lightUp._customColorR / 255,
					this.lightUp._customColorG / 255,
					this.lightUp._customColorB / 255
				),
		});
		this.lightDownTimeline.addLabel("storage").to(this.lightDown, {
			_customColorR: 0xcc,
			_customColorG: 0x00,
			_customColorB: 0x22,
			...rest,
			onUpdate: () =>
				this.lightDown.color.setRGB(
					this.lightDown._customColorR / 255,
					this.lightDown._customColorG / 255,
					this.lightDown._customColorB / 255
				),
		});
	}

	addDhwani() {
		const [one, two, three, four, five] = this.shapesTimelines;
		const rest = { duration: Projects.duration, ease: Projects.ease };

		// 'D'

		one.addLabel("dhwani").to(
			this.shapes[0].scale,
			{ x: 1.2, y: 5, ...rest },
			"dhwani"
		);
		two.to(this.shapes[1].scale, { x: 3.5, y: 0.75, ...rest }, "dhwani");
		three.to(this.shapes[2].scale, { x: 0.75, y: 5, ...rest }, "dhwani");
		four.to(this.shapes[3].scale, { x: 3.5, y: 0.75, ...rest }, "dhwani");
		five.to(this.shapes[4].scale, { x: 1.2, y: 5, ...rest }, "dhwani");

		one.to(this.shapes[0].position, { x: -1.72, y: 0, ...rest }, "dhwani");
		five.to(this.shapes[4].position, { x: -1.72, y: 0, ...rest }, "dhwani");
		three.to(this.shapes[2].position, { x: 2.05, y: 0, ...rest }, "dhwani");

		two.to(this.shapes[1].position, { x: 0, y: 3.5, ...rest }, "dhwani");
		four.to(this.shapes[3].position, { x: 0, y: -3.5, ...rest }, "dhwani");
		this.lightUpTimeline.addLabel("dhwani").to(this.lightUp, {
			_customColorR: 0xdd,
			_customColorG: 0x22,
			_customColorB: 0x33,
			...rest,
			onUpdate: () =>
				this.lightUp.color.setRGB(
					this.lightUp._customColorR / 255,
					this.lightUp._customColorG / 255,
					this.lightUp._customColorB / 255
				),
		});
		this.lightDownTimeline.addLabel("dhwani").to(this.lightDown, {
			_customColorR: 0xff,
			_customColorG: 0x33,
			_customColorB: 0xdd,
			...rest,
			onUpdate: () =>
				this.lightDown.color.setRGB(
					this.lightDown._customColorR / 255,
					this.lightDown._customColorG / 255,
					this.lightDown._customColorB / 255
				),
		});
	}

	constructor(shapes, lightUp, lightDown) {
		shapes.forEach((s, i) => {
			const timeline = new TimelineLite();
			timeline.pause();
			this.shapesTimelines.push(timeline);
		});

		this.shapes = shapes;
		this.lightUp = lightUp;
		this.lightUpTimeline = new TimelineLite();
		this.lightUpTimeline.pause();
		this.lightDown = lightDown;
		this.lightDownTimeline = new TimelineLite();
		this.lightDownTimeline.pause();

		this.addCoop();
		this.addSpectacle();
		this.addTreebo();
		this.addAba();
		this.addFeatherX();
		this.addStorage();
		this.addDhwani();
	}

	progress(to) {
		this.lightUpTimeline.progress(to);
		this.lightDownTimeline.progress(to);
		this.shapesTimelines.forEach((timeline) => timeline.progress(to));
	}

	seek(to) {
		this.lightUpTimeline.seek(to);
		this.lightDownTimeline.seek(to);
		this.shapesTimelines.forEach((timeline) => timeline.seek(to));
	}

	play() {
		this.lightUpTimeline.play();
		this.lightDownTimeline.play();
		this.shapesTimelines.forEach((timeline) => timeline.play());
	}
	restart() {
		this.lightUpTimeline.restart();
		this.lightDownTimeline.restart();
		this.shapesTimelines.forEach((timeline) => timeline.restart());
	}
}

export default Projects;
