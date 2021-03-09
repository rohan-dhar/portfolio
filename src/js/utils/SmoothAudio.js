import { gsap, Expo } from "gsap";

class SmoothAudio {
	audio = null;

	start() {
		this.audio.currentTime = 0;
		gsap.to(this.audio, { volume: 1, ease: Expo.in, duration: 0.6 });
	}

	stop() {
		gsap.to(this.audio, { volume: 0, ease: Expo.in, duration: 0.6 });
	}

	constructor(src) {
		this.audio = new Audio(src);
		this.audio.volume = 0;
		this.audio.loop = true;
		document.addEventListener("click", () => {
			this.audio.play();
		});
	}
}
export default SmoothAudio;
