export class SimpleTitle {
  api: any;
  data: any;
  element: HTMLElement | null;

  static get toolbox() {
    return [
    {
      title: 'H1 Title',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-type"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/></svg>',
      data: { 
        level: 1,
        defaultText: 'Title H1',
        twclass: 'text-7xl font-bold text-gray-900'
      },
    },    {
      title: 'H2 Title',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-type"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/></svg>',
      data: { 
        level: 2,
        defaultText: 'Title H2',
        twclass: 'text-6xl font-bold text-gray-900'
      }
    },
    {
      title: 'H3 Title',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-type"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/></svg>',
      data: { 
        level: 3,
        defaultText: 'Title H3',
        twclass: 'text-5xl font-bold text-gray-900'
      }    },
    {
      title: 'H4 Title',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-type"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/></svg>',
      data: { 
        level: 4,
        defaultText: 'Title H4',
        twclass: 'text-4xl font-bold text-gray-900'
      }    },
    {
      title: 'H5 Title',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-type"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/></svg>',
      data: { 
        level: 5,
        defaultText: 'Title H5',
        twclass: 'text-3xl font-bold text-gray-900'
      }
    },
    {
      title: 'H6 Title',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-type"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/></svg>',
      data: { 
        level: 6,
        defaultText: 'Title H6',
        twclass: 'text-2xl font-bold text-gray-900'
      }
    },
    ];
  }  constructor({ data, api }: any) {
    this.api = api;
    this.data = {
      text: data.text || '',
      level: data.level || 1, 
      defaultText: data.defaultText || '', 
      twclass: data.twclass || '' 
    };
    this.element = null;
  }
  
  render() {
    const tagName = `h${this.data.level}`;
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
      level: this.data.level,
      defaultText: this.data.defaultText,
      twclass: this.data.twclass
    };
  }
}