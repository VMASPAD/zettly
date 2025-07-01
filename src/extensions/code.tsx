import { codeToHtml } from 'shiki'

export class SimpleCode {
  private data: {
    text: string;
    language: string;
    theme: string;
    defaultText: string;
    twclass: string;
  };
  private wrapper: HTMLDivElement | null;
  private textarea: HTMLTextAreaElement | null;
  private languageSelect: HTMLSelectElement | null;
  private themeSelect: HTMLSelectElement | null;
  private codeContainer: HTMLDivElement | null;
  private controlsContainer: HTMLDivElement | null;

  static get toolbox() {
    return {
      title: 'Code',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code"><path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></svg>',
      data: {
        text: "// Write your code here\nconsole.log('Hello, World!');",
        language: 'javascript',
        theme: 'vitesse-dark',
        defaultText: "",
        twclass: ''
      }
    };
  }
  constructor({ data, api: _api }: { data: any; api: any }) {
    this.data = {
      text: data.text || "// Escribe tu código aquí\nconsole.log('Hello, World!');",
      language: data.language || 'javascript',
      theme: data.theme || 'vitesse-dark',
      defaultText: data.defaultText || '',
      twclass: data.twclass || ''
    };    this.wrapper = null;
    this.textarea = null;
    this.languageSelect = null;
    this.themeSelect = null;
    this.codeContainer = null;
    this.controlsContainer = null;
  }

  render() {
    // Crear el contenedor principal
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'code-tool-wrapper';
    this.wrapper.style.cssText = 'display: flex; flex-direction: column; gap: 12px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;';

    // Crear contenedor de controles
    this.controlsContainer = document.createElement('div');
    this.controlsContainer.style.cssText = 'display: flex; gap: 8px; padding: 12px; border-bottom: 1px solid #e2e8f0; flex-wrap: wrap; align-items: center;';

    // Crear selector de lenguaje
    const languageLabel = document.createElement('label');
    languageLabel.textContent = 'Language:';
    languageLabel.style.cssText = 'font-size: 14px; font-weight: 500; color: #475569;';

    this.languageSelect = document.createElement('select');
    this.languageSelect.style.cssText = 'padding: 4px 8px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 14px; ';
    
    // Lenguajes populares
    const languages = [
      { value: 'javascript', label: 'JavaScript' },
      { value: 'typescript', label: 'TypeScript' },
      { value: 'python', label: 'Python' },
      { value: 'java', label: 'Java' },
      { value: 'cpp', label: 'C++' },
      { value: 'c', label: 'C' },
      { value: 'html', label: 'HTML' },
      { value: 'css', label: 'CSS' },
      { value: 'json', label: 'JSON' },
      { value: 'markdown', label: 'Markdown' },
      { value: 'sql', label: 'SQL' },
      { value: 'bash', label: 'Bash' },
      { value: 'powershell', label: 'PowerShell' },
      { value: 'php', label: 'PHP' },
      { value: 'go', label: 'Go' },
      { value: 'rust', label: 'Rust' },
      { value: 'swift', label: 'Swift' },
      { value: 'kotlin', label: 'Kotlin' },
      { value: 'ruby', label: 'Ruby' },
      { value: 'xml', label: 'XML' }
    ];

    languages.forEach(lang => {
      const option = document.createElement('option');
      option.value = lang.value;
      option.textContent = lang.label;
      option.selected = lang.value === this.data.language;
      this.languageSelect!.appendChild(option);
    });

    // Crear selector de tema
    const themeLabel = document.createElement('label');
    themeLabel.textContent = 'Theme:';
    themeLabel.style.cssText = 'font-size: 14px; font-weight: 500; color: #475569; margin-left: 16px;';

    this.themeSelect = document.createElement('select');
    this.themeSelect.style.cssText = 'padding: 4px 8px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 14px;';
    
    // Temas populares
    const themes = [
      { value: 'vitesse-dark', label: 'Vitesse Dark' },
      { value: 'vitesse-light', label: 'Vitesse Light' },
      { value: 'github-dark', label: 'GitHub Dark' },
      { value: 'github-light', label: 'GitHub Light' },
      { value: 'dracula', label: 'Dracula' },
      { value: 'nord', label: 'Nord' },
      { value: 'monokai', label: 'Monokai' },
      { value: 'slack-dark', label: 'Slack Dark' },
      { value: 'slack-ochin', label: 'Slack Light' },
      { value: 'material-theme-darker', label: 'Material Dark' },
      { value: 'material-theme-lighter', label: 'Material Light' },
      { value: 'one-dark-pro', label: 'One Dark Pro' },
      { value: 'solarized-dark', label: 'Solarized Dark' },
      { value: 'solarized-light', label: 'Solarized Light' },
      { value: 'catppuccin-mocha', label: 'Catppuccin Mocha' }
    ];

    themes.forEach(theme => {
      const option = document.createElement('option');
      option.value = theme.value;
      option.textContent = theme.label;
      option.selected = theme.value === this.data.theme;
      this.themeSelect!.appendChild(option);
    });

    // Agregar elementos a los controles
    this.controlsContainer.appendChild(languageLabel);
    this.controlsContainer.appendChild(this.languageSelect);
    this.controlsContainer.appendChild(themeLabel);
    this.controlsContainer.appendChild(this.themeSelect);

    // Crear el área de texto para edición
    this.textarea = document.createElement('textarea');
    this.textarea.value = this.data.text;
    this.textarea.placeholder = 'Write your code here...';
    this.textarea.style.cssText = `
      width: 100%;
      min-height: 200px;
      padding: 16px;
      border: none;
      resize: vertical;
      font-family: 'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 14px;
      line-height: 1.5;
      background: transparent;
      outline: none;
      tab-size: 2;
    `;

    // Crear contenedor para el código resaltado
    this.codeContainer = document.createElement('div');
    this.codeContainer.style.cssText = 'position: relative; display: none;';

    // Función para actualizar el resaltado
    const updateHighlight = async () => {
      try {
        const html = await codeToHtml(this.data.text, {
          lang: this.data.language,
          theme: this.data.theme
        });
        
        if (this.codeContainer) {
          this.codeContainer.innerHTML = html;
          // Asegurar que el pre tenga los estilos correctos
          const pre = this.codeContainer.querySelector('pre');
          if (pre) {
            pre.style.cssText = 'margin: 0; padding: 16px; overflow-x: auto; border-radius: 0;';
          }
        }
      } catch (error) {
        console.error('Error highlighting code:', error);
        if (this.codeContainer) {
          this.codeContainer.innerHTML = `<pre style=\"margin: 0; padding: 16px; color: #ef4444;\"><code>Error highlighting code: ${error}</code></pre>`;
        }
      }
    };

    // Crear botón para alternar entre edición y vista
    const toggleButton = document.createElement('button');
    toggleButton.textContent = '👁️ Preview';
    toggleButton.style.cssText = 'padding: 6px 12px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; margin-left: auto; transition: background 0.2s;';
    toggleButton.addEventListener('mouseenter', () => {
      toggleButton.style.background = '#2563eb';
    });
    toggleButton.addEventListener('mouseleave', () => {
      toggleButton.style.background = '#3b82f6';
    });

    let isPreviewMode = false;
    
    toggleButton.addEventListener('click', async () => {
      if (isPreviewMode) {
        // Switch to edit mode
        this.textarea!.style.display = 'block';
        this.codeContainer!.style.display = 'none';
        toggleButton.textContent = '👁️ Preview';
        isPreviewMode = false;
      } else {
        // Switch to preview mode
        await updateHighlight();
        this.textarea!.style.display = 'none';
        this.codeContainer!.style.display = 'block';
        toggleButton.textContent = '✏️ Edit';
        isPreviewMode = true;
      }
    });

    this.controlsContainer.appendChild(toggleButton);

    // Eventos para actualizar datos
    this.textarea.addEventListener('input', (e) => {
      const target = e.target as HTMLTextAreaElement;
      this.data.text = target.value;
    });

    this.languageSelect.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      this.data.language = target.value;
      if (isPreviewMode) {
        updateHighlight();
      }
    });

    this.themeSelect.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      this.data.theme = target.value;
      if (isPreviewMode) {
        updateHighlight();
      }
    });

    // Soporte para Tab en el textarea
    this.textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.textarea!.selectionStart;
        const end = this.textarea!.selectionEnd;
        const value = this.textarea!.value;
        this.textarea!.value = value.substring(0, start) + '  ' + value.substring(end);
        this.textarea!.selectionStart = this.textarea!.selectionEnd = start + 2;
        this.data.text = this.textarea!.value;
      }
    });    // Ensamblar el componente
    this.wrapper.appendChild(this.controlsContainer);
    this.wrapper.appendChild(this.textarea);
    this.wrapper.appendChild(this.codeContainer);

    // Mostrar vista previa inicial de manera asíncrona
    updateHighlight().catch(console.error);

    return this.wrapper;
  }
  save(_blockContent: HTMLElement) {
    return {
      text: this.data.text,
      language: this.data.language,
      theme: this.data.theme,
      defaultText: this.data.defaultText,
      twclass: this.data.twclass
    };
  }
}