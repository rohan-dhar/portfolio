import debounce from "../utils/debounce";

class Cursor {
	el = null;

	styles = [];

	static initialStyle = {
		height: "30px",
		width: "30px",
		backgroundColor: "rgba(0,0,0,0)",
		borderWidth: "2px",
		borderColor: "#000000aa",
		backgroundImage: "none",
	};

	_style = {};

	set style(style) {
		const { initialStyle } = Cursor;
		if (!style) {
			this._style = initialStyle;
		} else {
			this._style = style;
		}

		Object.entries({ ...initialStyle, ...this._style }).forEach(
			([key, value]) => {
				this.el.style[key] = value;
			}
		);
	}

	handleMove({ pageX, pageY }) {
		this.el.style.transform = `translate(${pageX}px, ${pageY}px)`;
	}

	constructor() {
		document.addEventListener("DOMContentLoaded", () => {
			this.el = document.querySelector("#cursor");
			this.style = null;
			document.addEventListener(
				"mousemove",
				debounce(this.handleMove.bind(this), 1000 / 120)
			);
		});
	}

	add(selector, style) {
		const idx = this.styles.push(style) - 1;
		document.querySelector(selector).addEventListener("mouseenter", () => {
			this.style = this.styles[idx];
		});
		document.querySelector(selector).addEventListener("mouseleave", () => {
			this.style = Cursor.initialStyle;
		});
	}
}
export default Cursor;
