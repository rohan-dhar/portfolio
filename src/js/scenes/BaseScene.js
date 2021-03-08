import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	PCFShadowMap,
	PCFSoftShadowMap,
} from "three";

class BaseScene {
	el = null;
	scene = null;
	renderer = null;
	camera = null;
	lights = [];
	shadows = false;
	widthFactor = 1;
	heightFactor = 1;

	baseColor = "#000000";
	baseAlpha = 1;

	init(el) {
		this.el = el;
		this.renderer = new WebGLRenderer({
			antialias: true,
			alpha: true,
			canvas: this.el,
		});

		this.renderer.setClearColor(this.baseColor, this.baseAlpha);
		this.renderer.setSize(
			window.innerWidth * this.widthFactor,
			window.innerHeight * this.heightFactor
		);

		if (this.shadows) {
			this.renderer.shadowMap.enabled = true;
			this.renderer.shadowMap.type = PCFSoftShadowMap;
		}
		this.camera.position.z = 20;
		window.addEventListener("resize", () => {
			this.renderer.setSize(
				window.innerWidth * this.widthFactor,
				window.innerHeight * this.heightFactor
			);
			this.camera.aspect =
				((window.innerWidth * this.widthFactor) / window.innerHeight) *
				this.heightFactor;
			this.camera.updateProjectionMatrix();
		});
	}
	render() {
		this.renderer.render(this.scene, this.camera);
	}

	constructor(
		baseColor = "#000000",
		baseAlpha = 1,
		widthFactor = 1,
		heightFactor = 1,
		shadows = false
	) {
		this.scene = new Scene();
		this.widthFactor = widthFactor;
		this.heightFactor = heightFactor;
		this.camera = new PerspectiveCamera(
			75,
			((window.innerWidth * this.widthFactor) / window.innerHeight) *
				this.heightFactor,
			0.1,
			1000
		);
		this.shadows = shadows;
		this.baseColor = baseColor;
		this.baseAlpha = baseAlpha;
	}
}

export default BaseScene;
