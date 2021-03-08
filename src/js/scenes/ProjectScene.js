import {
	MeshPhysicalMaterial,
	Mesh,
	PointLight,
	BoxGeometry,
	SphereGeometry,
	SphereBufferGeometry,
} from "three";
import BaseScene from "./BaseScene";
import Projects from "./Projects";

class ProjectScene extends BaseScene {
	static querySelector = "#project-canvas";
	static letterNum = 5;
	static dims = [1.5, 1.5, 6];

	static pointerUpPosition = [0, 17, 22];
	static pointerDownPosition = [0, -25, 20];

	scroll = 0;
	pointerUp = null;
	pointerDown = null;
	shapes = [];
	s = 0;

	mouseX = 0;
	mouseY = 0;

	active = 0;
	childWidth = 0;
	projects = null;

	populate() {
		const material = new MeshPhysicalMaterial({
			color: 0xffffff,
			metalness: 1,
			roughness: 0.4,
			clearcoat: 1,
		});
		const geometry = new BoxGeometry(...ProjectScene.dims);
		for (let i = 0; i < ProjectScene.letterNum; i++) {
			const x = (i - 2) * 7;
			const y = 0;
			const z = 0;

			const mesh = new Mesh(geometry, material);

			mesh.castShadow = true;
			mesh.receiveShadow = false;

			mesh.position.set(x, y, z);

			this.shapes.push(mesh);
			this.scene.add(mesh);
		}

		// const sphereGeometry = new SphereBufferGeometry(30, 20, 100);
		// const sphereMaterial = new MeshPhysicalMaterial({
		// 	color: 0xffffff,
		// 	metalness: 0.95,
		// 	roughness: 0,
		// 	clearcoat: 1,
		// });

		// const sphere = new Mesh(sphereGeometry, sphereMaterial);

		// sphere.castShadow = false;
		// sphere.receiveShadow = true;

		// sphere.position.set(0, 0, -60);

		// this.scene.add(sphere);

		this.pointerUp = new PointLight(0x11ff77, 6.5, 50);

		this.pointerUp.position.set(
			ProjectScene.pointerUpPosition[0],
			ProjectScene.pointerUpPosition[1],
			ProjectScene.pointerUpPosition[2]
		);

		this.pointerDown = new PointLight(0x0022ff, 6.5, 50);
		this.pointerDown.position.set(
			ProjectScene.pointerDownPosition[0],
			ProjectScene.pointerDownPosition[1],
			ProjectScene.pointerDownPosition[2]
		);

		this.scene.add(this.pointerUp);
		this.scene.add(this.pointerDown);
	}

	render() {
		super.render();
		const by =
			(this.active + this.scroll - this.active) /
			(this.projects.length + 1);
		this.projects.progress(by);

		const [upX, upY, upZ] = ProjectScene.pointerUpPosition;
		const [downX, downY, downZ] = ProjectScene.pointerDownPosition;

		const max = 1.5;

		this.pointerUp.position.set(
			upX + max * this.mouseX,
			upY + max * this.mouseY,
			upZ
		);
		this.pointerDown.position.set(
			downX - this.mouseX,
			downY + this.mouseY,
			downZ
		);

		requestAnimationFrame(this.render.bind(this));
	}

	handleMove({ pageX, pageY }) {
		this.mouseX = (pageX - window.innerWidth / 2) / (window.innerWidth / 2);
		this.mouseY =
			(pageY - window.innerHeight / 2) / (window.innerHeight / 2);
	}

	attachEvents() {
		document.addEventListener("mousemove", this.handleMove);
	}

	constructor() {
		super("#001", 0, 1, 1);
		this.render = this.render.bind(this);
		this.populate();
		this.projects = new Projects(
			this.shapes,
			this.pointerUp,
			this.pointerDown
		);

		this.handleMove = this.handleMove.bind(this);

		document.addEventListener("DOMContentLoaded", () => {
			super.init(document.querySelector(ProjectScene.querySelector));
			this.projects.progress(0.01);
			requestAnimationFrame(this.render);
			this.attachEvents();
		});
	}
}

export default ProjectScene;
