export class SimpleQuote {
  api: any;
  data: any;
  element: HTMLElement | null;

  static get toolbox() {
    return {
      title: 'Quote',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-quote-icon lucide-quote"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg>',
      data: {
        defaultText: "\"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, fugit.\"",
        twclass: 'bg-gray-200 text-black italic rounded-sm p-3 border-l-blue-600 border-4'
      }
    };

  }  constructor({ data, api }: any) {
    this.api = api;
    this.data = {
      text: data.text || '',
      defaultText: data.defaultText || '',
      twclass: data.twclass || ''
    };
    this.element = null;
  }
  
  render() {
    const tagName = `div`;
    this.element = document.createElement(tagName);
    this.element.className = this.data.twclass;
    this.element.contentEditable = 'true';

    // Usar el texto guardado si existe, sino usar el texto por defecto
    this.element.innerHTML = this.data.text || this.data.defaultText;

    return this.element;
  }

  save(blockContent: any) { 
    return {
      text: blockContent.innerHTML,
      defaultText: this.data.defaultText,
      twclass: this.data.twclass
    };
  }
}