import { Button } from '@/components/ui/button';
import { SimpleQuote } from '@/extensions/quote';
import { SimpleSeparator } from '@/extensions/separator';
import { SimpleTitle } from '@/extensions/text';
import EditorJS from '@editorjs/editorjs';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { SimpleImage } from '@/extensions/image';
import { SimpleVideo } from '@/extensions/video';
import { SimpleCode } from '@/extensions/code';
import EditorjsList from '@editorjs/list';
import Table from '@editorjs/table';
import { exportToArchive, parseToMD, readArchive, saveArchive } from '@/handlers/manageNotes';
import { useSearchParams } from 'react-router';
import { ArrowLeft, File, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Undo from 'editorjs-undo';
import { toast } from 'sonner';
import ColorPicker from '@/extensions/textStyles';

function Editor() {
  const [isReady, setIsReady] = useState(false);
  const [archives, setArchives] = useState<any>({});
  const [editorData, setEditorData] = useState<any>(null);
  const [itemList, setItemList] = useState<EditorJS.OutputData | null>(null);

  let editor: EditorJS | null = null;
  let [searchParams] = useSearchParams();

  // Primer useEffect: Cargar los datos
  useEffect(() => {
    const loadData = async () => {
      try {
        const dataArchive = await readArchive(searchParams.get("name") || "name");
        const archiveData = dataArchive && dataArchive[1] ? JSON.parse(dataArchive[1]) : {};
        setArchives(archiveData);
        setEditorData(archiveData);
      } catch (error) {
        console.error('Error loading data:', error);
        setEditorData({});
      }
    };

    loadData();
  }, [searchParams]);

  // Segundo useEffect: Inicializar editor cuando los datos estén listos y el DOM esté montado
  useEffect(() => {
    if (!editorData || Object.keys(editorData).length === 0) return;

    const initializeEditor = async () => {
      try {
        editor = new EditorJS({
          tools: {
            SimpleTitle: {
              class: SimpleTitle
            },
            SimpleQuote: SimpleQuote as any,
            SimpleSeparator: SimpleSeparator as any,
            SimpleImage: SimpleImage as any,
            ColorPicker: {
              class: ColorPicker,
              config: {
                colors: [
    '#64748b', '#6b7280', '#71717a', '#737373', '#78716c', '#ef4444',
    '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#10b981',
    '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6',
    '#a855f7', '#d946ef', '#ec4899', '#f43f5e', "#ffffff", "#000000"
  ],
                columns: 6
              }
            },
            SimpleVideo: SimpleVideo as any,
            SimpleCode: SimpleCode as any,
            Table: Table as any,
            list: {
              class: EditorjsList as any,
              inlineToolbar: true,
              config: {
                defaultStyle: 'unordered'
              },
            },
          },
          data: editorData,
          holder: 'editorjs',
          onReady: () => {
            new Undo({ editor });
          },
          onChange: () => {
            saveEditorContent();
          }
        });
        setTimeout(async () => { await editor?.isReady; }, 1000);
      } catch (error) {
        console.error('Error initializing EditorJS:', error);
        setIsReady(false);
      }
    };

    const getContainerEditor = document.getElementById('editorjs');
    if (!getContainerEditor) {
      setIsReady(true);
      initializeEditor();
    }
    return () => {
      if (editor && typeof editor.destroy === 'function') {
        editor.destroy();
      }
    };
  }, [editorData]);

  function saveEditorContent() {
    editor?.save().then((outputData) => {
      console.log('EditorJS data:', outputData);
      localStorage.setItem('editorData', JSON.stringify(outputData));
      saveArchive(searchParams.get("name") || "name", JSON.stringify(outputData));
      setItemList(outputData);
    }).catch((error) => {
      console.error('Error saving EditorJS data:', error);
    });
  }

  const exportToMarkdown = async (name: string, data: object) => {
    const exportData = await exportToArchive(name, data, 'md');
    console.log(exportData);
    toast('Exported to Markdown: ' + exportData);
  }
  const exportToZET = async (name: string, data: object) => {
    const exportData = await exportToArchive(name, data, 'zet');
    console.log(exportData);
    toast('Exported to ZET: ' + exportData);
  }
  return (
    <main className="w-full h-screen flex-col flex items-center p-4 bg-background">

      {/* <motion.div className='gap-3 w-fit border-gray-300 border-2 bg-gray-100 rounded-lg shadow-lg p-4 mb-8 flex flex-row items-center justify-center'
            initial={{ opacity: 0, scale: 0.95, y: -60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeInOut', stiffness: 100, type: 'spring' }}
          >
            <SelectItem items={ItemList()} />
          </motion.div> */}

      <section className='w-full flex items-start '>
        <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-start text-center mb-8'>
          <div className="w-fit mx-auto flex flex-row">
            <ArrowLeft className="w-10 h-10 text-primary mx-auto cursor-pointer" onClick={() => window.history.back()} />
            <img src="/icon.png" alt="Zettly Logo" className="w-10 h-10 shadow-lg" />
          </div>
          <div className='flex flex-row gap-3 justify-start items-start '>
            <h1 className="text-2xl font-bold">{searchParams.get("name") || "name"}</h1>
            <DropdownMenu>
              <DropdownMenuTrigger><Button variant={'outline'}><Menu /></Button></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => exportToMarkdown(searchParams.get("name") || "name", itemList)}>Export to Markdown</DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportToZET(searchParams.get("name") || "name", itemList)}>Export to ZET</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </section>
      {isReady ?

        <motion.section initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }} id="editorjs" className="border-2 border-gray-300 w-full max-w-4xl rounded-xl shadow-2xl ">

        </motion.section>
        :
        <>
          <p>Loading...</p>
          <p>No charge? Go back o reload</p>
          <Button onClick={() => window.location.reload()} variant={'ghost'}>Reload</Button>
        </>
      }

    </main>
  );
}

export default Editor;
