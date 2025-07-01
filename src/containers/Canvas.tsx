import { Button } from '@/components/ui/button'
import { ArrowLeft, File, Download, Image, FileText } from 'lucide-react'
import {
    TLComponents,
    Tldraw,
    TldrawUiButton,
    TldrawUiButtonLabel,
    TldrawUiDialogBody,
    TldrawUiDialogCloseButton,
    TldrawUiDialogFooter,
    TldrawUiDialogHeader,
    TldrawUiDialogTitle,
    useDialogs,
    useEditor,
    useToasts,
} from 'tldraw'
import 'tldraw/tldraw.css'

function Canvas() {
    function ExportDialog({ onClose }: { onClose(): void }) {
        const editor = useEditor()
        const { addToast } = useToasts()

        const exportCanvas = async (format: 'png' | 'jpg' | 'svg' | 'json', transparent: boolean = false) => {
            const shapeIds = editor.getCurrentPageShapeIds()
            if (shapeIds.size === 0) {
                addToast({
                    title: 'No content',
                    description: 'No shapes found on the canvas to export.',
                    severity: 'warning'
                })
                return
            }

            try {
                let blob: Blob
                let fileName: string
                let mimeType: string

                switch (format) {
                    case 'png':
                        const pngResult = await editor.toImage([...shapeIds], { 
                            format: 'png', 
                            background: !transparent,
                            padding: 16,
                            scale: 2
                        })
                        blob = pngResult.blob
                        fileName = `canvas-export-${Date.now()}.png`
                        mimeType = 'image/png'
                        break

                    case 'jpg':
                        const jpgResult = await editor.toImage([...shapeIds], { 
                            format: 'jpeg', 
                            background: true, // JPG doesn't support transparency
                            padding: 16,
                            scale: 2
                        })
                        blob = jpgResult.blob
                        fileName = `canvas-export-${Date.now()}.jpg`
                        mimeType = 'image/jpeg'
                        break

                    case 'svg':
                        const svgResult = await editor.getSvgElement([...shapeIds], {
                            background: !transparent,
                            padding: 16,
                            scale: 1
                        })
                        const svgString = svgResult ? svgResult.svg.outerHTML : '<svg></svg>'
                        blob = new Blob([svgString], { type: 'image/svg+xml' })
                        fileName = `canvas-export-${Date.now()}.svg`
                        mimeType = 'image/svg+xml'
                        break

                    case 'json':
                        const snapshot = editor.getSnapshot()
                        const jsonString = JSON.stringify(snapshot, null, 2)
                        blob = new Blob([jsonString], { type: 'application/json' })
                        fileName = `canvas-export-${Date.now()}.json`
                        mimeType = 'application/json'
                        break

                    default:
                        throw new Error('Unsupported format')
                }

                // Create download link
                const link = document.createElement('a')
                link.href = URL.createObjectURL(blob)
                link.download = fileName
                link.click()
                URL.revokeObjectURL(link.href)

                addToast({
                    title: 'Export successful',
                    description: `Canvas exported as ${format.toUpperCase()}`,
                    severity: 'success'
                })

                onClose()
            } catch (error) {
                addToast({
                    title: 'Export failed',
                    description: 'There was an error exporting the canvas.',
                    severity: 'error'
                })
                console.error('Export error:', error)
            }
        }

        return (
            <>
                <TldrawUiDialogHeader>
                    <TldrawUiDialogTitle>Export Canvas</TldrawUiDialogTitle>
                    <TldrawUiDialogCloseButton />
                </TldrawUiDialogHeader>
                <TldrawUiDialogBody style={{ maxWidth: 400 }}>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium mb-3 text-gray-700">Image Formats</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    onClick={() => exportCanvas('png', false)}
                                    variant="outline"
                                    className="flex items-center gap-2"
                                >
                                    <Image className="w-4 h-4" />
                                    PNG
                                </Button>
                                <Button
                                    onClick={() => exportCanvas('png', true)}
                                    variant="outline"
                                    className="flex items-center gap-2"
                                >
                                    <Image className="w-4 h-4" />
                                    PNG (Transparent)
                                </Button>
                                <Button
                                    onClick={() => exportCanvas('jpg', false)}
                                    variant="outline"
                                    className="flex items-center gap-2"
                                >
                                    <Image className="w-4 h-4" />
                                    JPG
                                </Button>
                                <Button
                                    onClick={() => exportCanvas('svg', false)}
                                    variant="outline"
                                    className="flex items-center gap-2"
                                >
                                    <FileText className="w-4 h-4" />
                                    SVG
                                </Button>
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-sm font-medium mb-3 text-gray-700">Vector Formats</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    onClick={() => exportCanvas('svg', true)}
                                    variant="outline"
                                    className="flex items-center gap-2"
                                >
                                    <FileText className="w-4 h-4" />
                                    SVG (Transparent)
                                </Button>
                                <Button
                                    onClick={() => exportCanvas('json', false)}
                                    variant="outline"
                                    className="flex items-center gap-2"
                                >
                                    <FileText className="w-4 h-4" />
                                    JSON (Data)
                                </Button>
                            </div>
                        </div>

                        <div className="pt-2 border-t">
                            <p className="text-xs text-gray-500">
                                • High quality exports with 2x scale
                                <br />
                                • PNG supports transparency
                                <br />
                                • JSON format preserves all data for re-import
                            </p>
                        </div>
                    </div>
                </TldrawUiDialogBody>
            </>
        )
    }

    // [2]
    function MySimpleDialog({ onClose }: { onClose(): void }) {
        return (
            <div style={{ padding: 16 }}>
                <h2>Title</h2>
                <p>Description...</p>
                <button onClick={onClose}>Okay</button>
            </div>
        )
    }
    const CustomSharePanel = () => {
        const { addDialog } = useDialogs()

        return (
            <div style={{ padding: 8, pointerEvents: 'all' }}>
                <TldrawUiButton
                    type="normal"
                    onClick={() => {
                        addDialog({
                            component: ExportDialog,
                            onClose() {
                                // You can do something after the dialog is closed
                                void null
                            },
                        })
                    }}
                >
                    <TldrawUiButtonLabel>
                        <div className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Export
                        </div>
                    </TldrawUiButtonLabel>
                </TldrawUiButton>
            </div>
        )
    }
    const components: TLComponents = {
        SharePanel: CustomSharePanel,
    }

    return (

        <div className="h-screen flex flex-col">
            <header className="bg-white border-b border-gray-200 px-6 py-2 shadow-sm">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => window.history.back()}
                        className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200 group"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
                    </button>
                    <div className="flex items-center gap-2">
                        <img src="/icon.png" alt="Zettly Logo" className="w-10 h-10 shadow-lg" />
                        <h1 className="text-xl font-semibold text-gray-800">Draw Editor</h1>
                    </div>
                </div>
            </header>
            <div className='w-screen h-screen'>
                <Tldraw components={components} />
            </div>
        </div>
    )
}

export default Canvas
