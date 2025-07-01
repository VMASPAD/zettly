export class SimpleVideo {
  private data: {
    text: string;
    defaultSrc: string;
    twclass: string;
    src: string;
  };
  private element: HTMLVideoElement | null;
  private wrapper: HTMLDivElement | null;
  private input: HTMLInputElement | null;
  private fileInput: HTMLInputElement | null;
  private uploadButton: HTMLButtonElement | null;
  private urlButton: HTMLButtonElement | null;
  private youtubeButton: HTMLButtonElement | null;
  private controlsContainer: HTMLDivElement | null;
  private panel: HTMLDivElement | null;

  static get toolbox() {
    return {
      title: 'Video',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-video"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>',
      data: {
        defaultSrc: "https://placehold.co/600x400",
        twclass: 'flex flex-col items-center justify-center',
      }
    };
  }  constructor({ data, api: _api }: { data: any; api: any }) {
    this.data = {
      text: data.text || '',
      defaultSrc: data.defaultSrc || '',
      twclass: data.twclass || '',
      src: data.src || data.defaultSrc || ''
    };
    this.element = null;
    this.wrapper = null;
    this.input = null;
    this.fileInput = null;
    this.uploadButton = null;
    this.urlButton = null;
    this.youtubeButton = null;
    this.controlsContainer = null;
    this.panel = null;
  }
  render() {
    // Crear el contenedor principal
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'video-tool-wrapper';
    this.wrapper.style.cssText = 'display: flex; flex-direction: column; gap: 12px; align-items: center; position: relative;';

    // Crear el video
    this.element = document.createElement('video');
    this.element.className = this.data.twclass;
    this.element.src = this.data.src;
    this.element.style.cssText = 'max-width: 100%; height: auto; border-radius: 8px; cursor: pointer;';
    this.element.controls = true;

    // Crear panel flotante (oculto por defecto)
    this.panel = document.createElement('div');
    this.panel.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 16px rgba(0,0,0,0.15); padding: 24px 20px 16px 20px; z-index: 10; display: none; min-width: 320px; min-height: 120px;';

    // Crear contenedor de controles (dentro del panel)
    this.controlsContainer = document.createElement('div');
    this.controlsContainer.style.cssText = 'display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; align-items: center; width: 100%; margin-bottom: 12px;';

    // Crear botón para subir desde dispositivo
    this.uploadButton = document.createElement('button');
    this.uploadButton.textContent = '📁 Subir video';
    this.uploadButton.style.cssText = 'padding: 8px 16px; background: #007acc; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; transition: background 0.2s;';
    this.uploadButton.addEventListener('mouseenter', () => {
      if (this.uploadButton) this.uploadButton.style.background = '#005a9e';
    });
    this.uploadButton.addEventListener('mouseleave', () => {
      if (this.uploadButton) this.uploadButton.style.background = '#007acc';
    });

    // Crear input de archivo (oculto)
    this.fileInput = document.createElement('input');
    this.fileInput.type = 'file';
    this.fileInput.accept = 'video/*';
    this.fileInput.style.display = 'none';

    // Crear botón para URL
    this.urlButton = document.createElement('button');
    this.urlButton.textContent = '🔗 Desde URL';
    this.urlButton.style.cssText = 'padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; transition: background 0.2s;';
    this.urlButton.addEventListener('mouseenter', () => {
      if (this.urlButton) this.urlButton.style.background = '#1e7e34';
    });
    this.urlButton.addEventListener('mouseleave', () => {
      if (this.urlButton) this.urlButton.style.background = '#28a745';
    });

    // Crear botón para YouTube
    this.youtubeButton = document.createElement('button');
    this.youtubeButton.textContent = '🎥 YouTube';
    this.youtubeButton.style.cssText = 'padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; transition: background 0.2s;';
    this.youtubeButton.addEventListener('mouseenter', () => {
      if (this.youtubeButton) this.youtubeButton.style.background = '#c82333';
    });
    this.youtubeButton.addEventListener('mouseleave', () => {
      if (this.youtubeButton) this.youtubeButton.style.background = '#dc3545';
    });

    // Crear el input para cambiar la URL (inicialmente oculto)
    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.placeholder = 'Ingresa la URL del video o enlace de YouTube...';
    this.input.value = this.data.src;
    this.input.style.cssText = 'width: 100%; max-width: 400px; padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; display: none; margin-top: 8px;';

    // Botón para cerrar el panel
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✖';
    closeBtn.style.cssText = 'position: absolute; top: 8px; right: 12px; background: none; border: none; font-size: 18px; color: #888; cursor: pointer;';
    closeBtn.addEventListener('click', () => {
      if (this.panel) this.panel.style.display = 'none';
    });

    // Mostrar panel al hacer click o hover sobre el video
    let panelTimeout: any = null;
    const showPanel = () => {
      if (this.panel) this.panel.style.display = 'block';
      if (this.input) this.input.style.display = 'none';
    };
    const hidePanel = () => {
      if (this.panel) this.panel.style.display = 'none';
      if (this.input) this.input.style.display = 'none';
    };
    this.element.addEventListener('click', showPanel);
    this.element.addEventListener('mouseenter', () => {
      clearTimeout(panelTimeout);
      showPanel();
    });
    this.panel.addEventListener('mouseleave', () => {
      panelTimeout = setTimeout(hidePanel, 200);
    });
    this.panel.addEventListener('mouseenter', () => {
      clearTimeout(panelTimeout);
    });
    this.wrapper.addEventListener('mouseleave', () => {
      panelTimeout = setTimeout(hidePanel, 200);
    });

    // Función para extraer ID de YouTube y convertir a embed
    const getYouTubeEmbedUrl = (url: string) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
      }
      return url;
    };

    // Función para crear iframe de YouTube
    const createYouTubePlayer = (url: string) => {
      const embedUrl = getYouTubeEmbedUrl(url);
      const iframe = document.createElement('iframe');
      iframe.src = embedUrl;
      iframe.style.cssText = 'max-width: 100%; width: 560px; height: 315px; border-radius: 8px; border: none;';
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      return iframe;
    };

    // Función para determinar si es URL de YouTube
    const isYouTubeUrl = (url: string) => {
      return url.includes('youtube.com') || url.includes('youtu.be');
    };

    // Eventos para subir archivo
    this.uploadButton.addEventListener('click', () => {
      if (this.fileInput) {
        this.fileInput.click();
      }
    });

    this.fileInput.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file && file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          this.data.src = result;
          // Remover cualquier iframe existente y restaurar video
          const existingIframe = this.wrapper?.querySelector('iframe');
          if (existingIframe) {
            existingIframe.remove();
            if (this.element && this.wrapper) {
              this.wrapper.insertBefore(this.element, this.panel);
            }
          }
          if (this.element) {
            this.element.src = result;
            this.element.style.display = 'block';
          }
          if (this.input) {
            this.input.value = result;
            this.input.style.display = 'none';
          }
          hidePanel();
        };
        reader.readAsDataURL(file);
      }
    });

    // Evento para mostrar input de URL
    this.urlButton.addEventListener('click', () => {
      if (this.input) {
        const isVisible = this.input.style.display !== 'none';
        this.input.style.display = isVisible ? 'none' : 'block';
        this.input.placeholder = 'Ingresa la URL del video...';
        if (!isVisible) {
          this.input.focus();
        }
      }
    });

    // Evento para YouTube
    this.youtubeButton.addEventListener('click', () => {
      if (this.input) {
        const isVisible = this.input.style.display !== 'none';
        this.input.style.display = isVisible ? 'none' : 'block';
        this.input.placeholder = 'Ingresa la URL de YouTube...';
        if (!isVisible) {
          this.input.focus();
        }
      }
    });

    // Agregar evento para cambiar el video por URL
    this.input.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      const url = target.value;
      this.data.src = url;

      if (isYouTubeUrl(url)) {
        // Es YouTube, crear iframe
        const existingIframe = this.wrapper?.querySelector('iframe');
        if (existingIframe) {
          existingIframe.src = getYouTubeEmbedUrl(url);
        } else {
          const iframe = createYouTubePlayer(url);
          if (this.element && this.wrapper) {
            this.element.style.display = 'none';
            this.wrapper.insertBefore(iframe, this.panel);
          }
        }
      } else {
        // Es video normal, usar elemento video
        const existingIframe = this.wrapper?.querySelector('iframe');
        if (existingIframe) {
          existingIframe.remove();
          if (this.element && this.wrapper) {
            this.wrapper.insertBefore(this.element, this.panel);
          }
        }
        if (this.element) {
          this.element.src = url;
          this.element.style.display = 'block';
        }
      }
    });

    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && this.input) {
        this.input.style.display = 'none';
        hidePanel();
      }
    });

    // Si el src inicial es de YouTube, crear iframe
    if (this.data.src && isYouTubeUrl(this.data.src)) {
      const iframe = createYouTubePlayer(this.data.src);
      this.element.style.display = 'none';
      this.wrapper.appendChild(this.element);
      this.wrapper.appendChild(iframe);
    } else {
      this.wrapper.appendChild(this.element);
    }

    // Agregar elementos al contenedor de controles (panel)
    this.controlsContainer.appendChild(this.uploadButton);
    this.controlsContainer.appendChild(this.urlButton);
    this.controlsContainer.appendChild(this.youtubeButton);
    this.panel.appendChild(closeBtn);
    this.panel.appendChild(this.controlsContainer);
    this.panel.appendChild(this.input);
    this.panel.appendChild(this.fileInput);

    // Agregar panel al contenedor principal
    this.wrapper.appendChild(this.panel);

    return this.wrapper;
  }

  save(_blockContent: HTMLElement) {
    return {
      text: this.data.text,
      src: this.data.src,
      defaultSrc: this.data.defaultSrc,
      twclass: this.data.twclass
    };
  }
}