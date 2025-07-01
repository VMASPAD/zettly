import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { createArchives, deleteArchive, getArchives } from '@/handlers/manageNotes';
import { useEffect, useState } from 'react';
import { Link } from 'react-router'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { File, Plus, Search, FileText, BookOpen, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Aurora from '@/components/ui/Backgrounds/Aurora/Aurora';
import { AuroraText } from '@/components/magicui/aurora-text';
import { SmoothCursor } from '@/components/magicui/SmoothCursor';

function ViewNotes() {
  const [notes, setNotes] = useState<{ title: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [addImportNote, setAddImportNote] = useState([]);
  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simular carga para mostrar animación
      const archives = await getArchives();
      setNotes(archives.map(archive => ({
        title: archive.name.replace('.zet', ''),
      })));
      setIsLoading(false);
    };

    fetchNotes();
  }, []);

  function createFile() {
    const getArchiveName = document.getElementById('getArchiveName') as HTMLInputElement;
    createArchives(getArchiveName.value);
    // Recargar la lista después de crear
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const importNote = async (note) => {
    console.log(note)
    const nameArchive = note[0]
    const newArchive = nameArchive.replace('.zet', '')
    await createArchives(newArchive, JSON.stringify(note[1]))
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const cardHoverVariants = {
    rest: {
      scale: 1,
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    },
    hover: {
      scale: 1.05,
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20
      }
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <Aurora
        colorStops={["#ffa07a", "#FF94B4", "#ffc106"]}
        blend={1}
        amplitude={1.0}
        speed={0.3}
      />
      <SmoothCursor />
      {/* Header con animación */}
      <motion.div
        className="pt-16 pb-8"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          >
            <div className="flex items-center justify-center mb-4 gap-5">
              <img src="/icon.png" alt="Zettly Logo" className="w-16 h-16 shadow-lg" />
              <AuroraText className='text-5xl font-bold text-primary font-pacifico'>
                Zettly Notes</AuroraText>

            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Organize your thoughts, create beautiful notes, and bring your ideas to life
            </p>v1.0.0
          </motion.div>

          {/* Barra de búsqueda y botón con animación */}
            <motion.div
            className="flex flex-wrap sm:flex-nowrap gap-3 sm:gap-4 max-w-7xl mx-auto mb-10 items-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            >
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
              placeholder="Search your notes..."
              className="pl-10 h-10 text-base rounded-lg border-2 focus:border-primary transition-colors bg-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                size="sm"
                className="cursor-pointer h-10 px-5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
                >
                <Plus className="w-4 h-4" />
                New Note
                </Button>
              </motion.div>
              </AlertDialogTrigger>
              <AlertDialogContent className="sm:max-w-xs bg-card border-border rounded-xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-bold text-center text-card-foreground">Create New Note</AlertDialogTitle>
                <AlertDialogDescription className="text-center text-muted-foreground">
                Give your note a memorable name to get started.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="py-3">
                <Input
                placeholder="Enter note name..."
                className="h-10 text-base bg-input border-border rounded-lg"
                id='getArchiveName'
                />
              </div>
              <AlertDialogFooter className="flex gap-2">
                <AlertDialogCancel className="flex-1 border-border rounded-lg">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={createFile} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
                Create
                </AlertDialogAction>
              </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to={`/markdown`}>
              <Button
                size="sm"
                className="cursor-pointer h-10 px-5 rounded-lg bg-black/70 hover:bg-black/90 text-primary-foreground flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Markdown
              </Button>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to={`/canvas`}>
              <Button
                size="sm"
                className="cursor-pointer h-10 px-5 rounded-lg bg-fuchsia-600/70 hover:bg-fuchsia-600/90 text-primary-foreground flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Draw
              </Button>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <label className="cursor-pointer relative group">
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".zet"
                onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                  const content = event.target?.result;
                  setAddImportNote([e.target.files?.[0].name, JSON.parse(content as string)]);
                  importNote([e.target.files?.[0].name, JSON.parse(content as string)]);
                  };
                  reader.readAsText(file);
                }
                }}
              />
              <div className="flex items-center justify-center h-10 px-5 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg border border-border shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-secondary/50 gap-2">
                <File className="w-4 h-4" />
                <span className="font-medium">Import</span>
              </div>
              </label>
            </motion.div>
            </motion.div>




        </div>
      </motion.div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              className="flex flex-col items-center justify-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mb-4"
              />
              <p className="text-xl text-muted-foreground">Loading your notes...</p>
            </motion.div>
          ) : filteredNotes.length === 0 ? (
            <motion.div
              key="empty"
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <FileText className="w-20 h-20 text-muted-foreground/50 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                {searchTerm ? 'No notes found' : 'No notes yet'}
              </h3>
              <p className="text-muted-foreground mb-8">
                {searchTerm
                  ? `No notes match "${searchTerm}". Try a different search term.`
                  : 'Start your journey by creating your first note!'
                }
              </p>
              {!searchTerm && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Plus className="w-5 h-5 mr-2" />
                        Create Your First Note
                      </Button>
                    </motion.div>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-card border-border">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-card-foreground">Create Your First Note</AlertDialogTitle>
                      <AlertDialogDescription className="text-muted-foreground">
                        Welcome to Zettly! Let's create your first note.
                        <Input placeholder="Note name..." className='mt-3 bg-input border-border' id='getArchiveName' />
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="border-border">Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={createFile} className="bg-primary hover:bg-primary/90 text-primary-foreground">Create</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="notes"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredNotes.map((note) => (
                <motion.div
                  key={note.title}
                  variants={itemVariants}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                >
                  <Link to={`/editor?name=${note.title}`}>
                    <motion.div
                      className="bg-card rounded-xl p-6 border border-border cursor-pointer group relative overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                      variants={cardHoverVariants}
                    >
                      {/* Overlay sutil con colores del tema */}
                      <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative z-10 flex flex-row justify-between">
                        <div>
                          <div className="text-primary flex items-center justify-center w-16 h-16 bg-muted rounded-lg mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                            .ZET
                          </div>
                          <h3 className='text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors duration-300'>
                            {note.title}
                          </h3>
                        </div>
                        <Button variant={'ghost'} className='cursor-pointer z-20' onClick={() => deleteArchive(note.title)}><X className="w-4 h-4" /></Button>

                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ViewNotes
