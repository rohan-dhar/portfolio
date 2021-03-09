import HeroScene from "./scenes/HeroScene";
import "../styles/index.css";
import Cursor from "./components/Cursor";
import Marquee from "./components/Marquee";
import ScrollClipper from "./components/ScrollClipper";
import Waves from "./components/Waves";
import ProjectsView from "./components/ProjectsView";
import SmoothAudio from "./utils/SmoothAudio";
import hoverSound from "../sounds/hover3.mp3";

const audio = new SmoothAudio(hoverSound);

const hero = new HeroScene();
const projects = new ProjectsView();
const cursor = new Cursor();
const marquee = new Marquee("#page-2-marquee-head");

const marquee2 = new Marquee("#page-2-marquee-skills", {
	hoverStyles: {
		backgroundColor: "#ffffffaa",
		borderColor: "#ffffff00",
		height: "50px",
		width: "50px",
	},
	speed: 2,
	slowSpeed: 0.2,
	right: true,
});

const marquee3 = new Marquee("#page-3-marquee-head", {
	hoverStyles: {
		backgroundColor: "#ffffffaa",
		borderColor: "#ffffff00",
		height: "50px",
		width: "50px",
	},
	speed: 3,
});

const s1 = new ScrollClipper(".hero-overlay-img", { start: 1, end: 2 });
const s2 = new ScrollClipper("#hero-canvas", { start: 1, end: 2, right: true });

const waves = new Waves();

document.addEventListener("DOMContentLoaded", () => {
	cursor.add("#page-4", { borderColor: "#ffffff88" });
	cursor.add("#page-5", { borderColor: "#ffffff88" });
	cursor.add("#page-5", {
		backgroundColor: "#ffffff66",
		height: "40px",
		width: "40px",
		borderColor: "transparent",
	});
});

export { cursor, audio };
