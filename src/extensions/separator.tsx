export class SimpleSeparator {
  static get toolbox() {
    return {
      type: 'separator',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-separator-horizontal-icon lucide-separator-horizontal"><path d="m16 16-4 4-4-4"/><path d="M3 12h18"/><path d="m8 8 4-4 4 4"/></svg>',
      data: {
        twclass: 'border-t-2 border-gray-300 my-4',
      }, 
    };

  }
  element: HTMLElement | null;
  data: { twclass: string };
  api: any;
  constructor({ data, api }) {
    this.api = api;
    this.data = {
      twclass: data.twclass || ''
    };
    this.element = null;
  }
  render() {
    const tagName = `hr`;
    this.element = document.createElement(tagName);
    this.element.className = this.data.twclass;
    this.element.contentEditable = 'true';

    return this.element;
  }

  save(blockContent) { 
    return {
      text: blockContent.innerHTML,
    };
  }
}