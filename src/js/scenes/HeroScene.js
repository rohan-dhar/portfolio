import {
	MeshPhysicalMaterial,
	Mesh,
	PointLight,
	BoxGeometry,
	TetrahedronGeometry,
	MathUtils,
	PolyhedronBufferGeometry,
	SphereBufferGeometry,
	OctahedronBufferGeometry,
} from "three";
import debounce from "../utils/debounce";
import BaseScene from "./BaseScene";

class HeroScene extends BaseScene {
	static querySelector = "#hero-canvas";

	static radius = 3.5;
	static initialRotate = [0, MathUtils.degToRad(15), 0];

	static gap = 1;
	static num = 5;

	static maxRotate = MathUtils.degToRad(10);

	pointer = null;
	pointer2 = null;
	shapes = [];

	populate() {
		const { num: n, radius, gap } = HeroScene;

		for (let i = 0; i < n; i++) {
			const material = new MeshPhysicalMaterial({
				color: 0xffffff,
				metalness: 0.4,
				roughness: 0.8,
				clearcoat: 0.5,
			});
			let geometry;
			if (i <= 1) {
				geometry = new OctahedronBufferGeometry(radius, 0, 100);
			} else if (i === 2) {
				geometry = new BoxGeometry(radius, radius, radius);
			} else {
				geometry = new TetrahedronGeometry(radius, 0);
			}

			const x = 0;
			const y =
				(n - i - Math.floor(n / 2)) * radius * (1 + gap) -
				Math.floor(n / 2) * radius;
			const z = 0;

			const mesh = new Mesh(geometry, material);
			mesh.position.set(x, y, z);
			mesh.rotation.set(0, 0, 0);
			this.shapes.push(mesh);
			this.scene.add(mesh);
		}

		this.pointer = new PointLight(0x383079, 3, 40);
		this.pointer.position.set(0, 0, 20);

		this.scene.add(this.pointer);
		this.render();
	}

	render() {
		super.render();
		requestAnimationFrame(this.render.bind(this));
	}

	handleMouseMove({ pageX, pageY }) {
		const x = (pageX - window.innerWidth / 2) / window.innerWidth,
			y = (-pageY + window.innerHeight / 2) / window.innerHeight;

		// this.pointer.position.set(lx, ly, 10);

		this.shapes.forEach((shape) =>
			shape.rotation.set(
				HeroScene.initialRotate[0] + y * HeroScene.maxRotate * 2,
				HeroScene.initialRotate[1] + x * HeroScene.maxRotate * 2,
				shape.rotation.z
			)
		);
	}

	handleScoll(e) {
		const scroll = document.documentElement.scrollTop / window.innerHeight;
		this.shapes.forEach((shape) =>
			shape.rotation.set(
				shape.rotation.x,
				shape.rotation.y,
				scroll * Math.PI
			)
		);
	}

	attachEvent() {
		window.addEventListener(
			"mousemove",
			debounce(this.handleMouseMove, 1000 / 60, this)
		);
		window.addEventListener(
			"scroll",
			debounce(this.handleScoll, 1000 / 60, this)
		);
	}

	constructor() {
		super("#4422ff", 0, 0.3, 1);
		document.addEventListener("DOMContentLoaded", () => {
			super.init(document.querySelector(HeroScene.querySelector));
			this.populate();
			this.attachEvent();
		});
	}
}

export default HeroScene;
