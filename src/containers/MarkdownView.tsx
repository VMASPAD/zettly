import { ArrowLeft, File } from 'lucide-react'
import React from 'react'

function MarkdownView() {
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
            <h1 className="text-xl font-semibold text-gray-800">Markdown Editor</h1>
          </div>
        </div>
      </header>
      <iframe 
        src="https://readme-canvas.vercel.app/zettly" 
        className="flex-1 w-full border-0" 
        title="Markdown Editor"
      />
    </div>
  )
}

export default MarkdownView
