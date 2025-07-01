import { API } from '@editorjs/editorjs';

import './styles.css';

type ColorPickerConfig = {
	colors: string[];
	columns: number;
};

interface ConstructorArgs {
	api: API;
	config: ColorPickerConfig;
}

export default class ColorPicker implements EditorJS.InlineTool {
	private api: API;
	tag = 'SPAN';
	class = 'cdx-text-color';
	defaultColor = '#2644FF';
	lastRange: Range | null = null;

	colors: string[] = [
		'#182a4e', '#0055cc', '#1f6a83', '#206e4e', '#e56910', '#ae2e24',
		'#5e4db2', '#758195', '#1e7afd', '#2998bd', '#23a06b', '#fea363',
		'#c9372c', '#8270db'
	];
	columns = 7;

	static get title() {
		return 'Color';
	}

	static get isInline() {
		return true;
	}

	constructor(args: ConstructorArgs) {
		const { api, config } = args;
		this.api = api;

		if (config.colors) {
			this.colors = config.colors;
		}
		if (config.columns) {
			this.columns = config.columns;
		}
	}

	render() {
		const button = document.createElement('button');
		button.type = 'button';
		button.innerHTML = "🎨";
		button.classList.add(this.api.styles.inlineToolButton);

		button.addEventListener('mousedown', (e) => {
			e.preventDefault();
		});

		return button;
	}

	surround(range: Range | null) {
		this.lastRange = range;
	}

	wrapAndColor(range: Range | null, textColor?: string, bgColor?: string) {
		if (!range) return;
		const selectedText = range.extractContents();
		const span = document.createElement(this.tag);
		span.classList.add(this.class);
		span.appendChild(selectedText);
		if (textColor) span.style.color = textColor;
		if (bgColor) span.style.backgroundColor = bgColor;
		span.innerHTML = span.textContent || '';
		range.insertNode(span);
		this.api.selection.expandToTag(span);
	}

	renderActions() {
		const wrapper = document.createElement('div');
		wrapper.classList.add('editorjs__color-selector-wrapper');

		const textLabel = document.createElement('div');
		textLabel.innerText = 'Text';
		const bgLabel = document.createElement('div');
		bgLabel.innerText = 'Background';

		const textContainer = document.createElement('div');
		textContainer.classList.add('editorjs__color-selector-container');
		textContainer.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;

		const bgContainer = document.createElement('div');
		bgContainer.classList.add('editorjs__color-selector-container');
		bgContainer.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;

		this.colors.forEach((colorValue) => {
			const textColor = document.createElement('div');
			textColor.classList.add('editorjs__color-selector__container-item');
			textColor.style.backgroundColor = colorValue;
			textColor.onclick = () => {
				this.wrapAndColor(this.lastRange, colorValue);
			};
			textContainer.appendChild(textColor);

			const bgColor = document.createElement('div');
			bgColor.classList.add('editorjs__color-selector__container-item');
			bgColor.style.backgroundColor = colorValue;
			bgColor.onclick = () => {
				this.wrapAndColor(this.lastRange, undefined, colorValue);
			};
			bgContainer.appendChild(bgColor);
		});

		wrapper.appendChild(textLabel);
		wrapper.appendChild(textContainer);
		wrapper.appendChild(bgLabel);
		wrapper.appendChild(bgContainer);

		return wrapper;
	}

	static get sanitize(): any {
		return {
			span: {
				style: {
					color: true,
					backgroundColor: true,
				},
			},
		};
	}
}
