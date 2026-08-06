'use client'

import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import { useEffect, useState, useCallback } from 'react'
import { 
  FaBold, 
  FaItalic, 
  FaUnderline,
  FaListUl, 
  FaListOl,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaLink,
  FaUnlink,
  FaEraser
} from 'react-icons/fa'

interface EditorTipTapProps {
  value: string
  onChange: (content: string) => void
  name?: string
  defaultValue?: string
}

const EditorTipTap: React.FC<EditorTipTapProps> = ({ 
  value, 
  onChange, 
  name,
  defaultValue 
}) => {
  const [isClient, setIsClient] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [showLinkInput, setShowLinkInput] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Usar el tipo correcto de TipTap
  const handleUpdate = useCallback(({ editor }: { editor: Editor }) => {
    const html = editor.getHTML()
    onChange(html)
  }, [onChange])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-4',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-4',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'my-1',
          },
        },
        heading: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      Placeholder.configure({
        placeholder: 'Escribe la historia de la noticia aquí...',
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
        defaultAlignment: 'left',
      }),
    ],
    content: value || defaultValue || '',
    onUpdate: handleUpdate,
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] p-3 border border-gray-300 rounded-b',
      },
    },
    immediatelyRender: false,
  }, [handleUpdate, defaultValue])

  const handleSetLink = useCallback(() => {
    if (!editor) return
    
    if (linkUrl.trim()) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkUrl })
        .run()
      setLinkUrl('')
      setShowLinkInput(false)
    }
  }, [editor, linkUrl])

  const handleUnsetLink = useCallback(() => {
    if (!editor) return
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    setShowLinkInput(false)
  }, [editor])

  const handleClearFormat = useCallback(() => {
    if (!editor) return
    editor.chain().focus().clearNodes().unsetAllMarks().run()
  }, [editor])

  const toggleLinkInput = useCallback(() => {
    setShowLinkInput(!showLinkInput)
    if (!showLinkInput && editor) {
      editor.chain().focus().run()
    }
  }, [showLinkInput, editor])

  const toggleBulletList = useCallback(() => {
    if (!editor) return
    editor.chain().focus().toggleBulletList().run()
  }, [editor])

  const toggleOrderedList = useCallback(() => {
    if (!editor) return
    editor.chain().focus().toggleOrderedList().run()
  }, [editor])

  if (!isClient || !editor) {
    return (
      <div className="w-full">
        <textarea 
          className='w-full p-3 border border-gray-100 bg-slate-100 h-[200px]' 
          defaultValue={defaultValue}
          readOnly
        />
      </div>
    )
  }

  return (
    <div className="w-full">
      <input 
        type="hidden" 
        name={name} 
        value={value}
        readOnly
      />
      
      {/* Barra de herramientas */}
      <div className="flex flex-wrap items-center gap-2 mb-2 p-3 border border-gray-300 rounded-t bg-gray-50">
        
        {/* Formato básico */}
        <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-300 text-gray-800' : 'text-gray-600 hover:bg-gray-200'}`}
            title="Negrita (Ctrl+B)"
          >
            <FaBold />
          </button>
          
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-300 text-gray-800' : 'text-gray-600 hover:bg-gray-200'}`}
            title="Cursiva (Ctrl+I)"
          >
            <FaItalic />
          </button>
          
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded ${editor.isActive('underline') ? 'bg-gray-300 text-gray-800' : 'text-gray-600 hover:bg-gray-200'}`}
            title="Subrayado (Ctrl+U)"
          >
            <FaUnderline />
          </button>
        </div>
        
        {/* Listas */}
        <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
          <button
            type="button"
            onClick={toggleBulletList}
            className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-300 text-gray-800' : 'text-gray-600 hover:bg-gray-200'}`}
            title="Lista con viñetas"
          >
            <FaListUl />
          </button>
          
          <button
            type="button"
            onClick={toggleOrderedList}
            className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-gray-300 text-gray-800' : 'text-gray-600 hover:bg-gray-200'}`}
            title="Lista numerada"
          >
            <FaListOl />
          </button>
        </div>
        
        {/* Alineación */}
        <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-2 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-300 text-gray-800' : 'text-gray-600 hover:bg-gray-200'}`}
            title="Alinear a la izquierda"
          >
            <FaAlignLeft />
          </button>
          
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-2 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-300 text-gray-800' : 'text-gray-600 hover:bg-gray-200'}`}
            title="Centrar texto"
          >
            <FaAlignCenter />
          </button>
          
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-2 rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-300 text-gray-800' : 'text-gray-600 hover:bg-gray-200'}`}
            title="Alinear a la derecha"
          >
            <FaAlignRight />
          </button>
          
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`p-2 rounded ${editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-300 text-gray-800' : 'text-gray-600 hover:bg-gray-200'}`}
            title="Justificar texto"
          >
            <FaAlignJustify />
          </button>
        </div>
        
        {/* Enlaces */}
        <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
          <button
            type="button"
            onClick={toggleLinkInput}
            className={`p-2 rounded ${editor.isActive('link') ? 'bg-gray-300 text-gray-800' : 'text-gray-600 hover:bg-gray-200'}`}
            title="Agregar enlace (Ctrl+K)"
          >
            <FaLink />
          </button>
          
          {editor.isActive('link') && (
            <button
              type="button"
              onClick={handleUnsetLink}
              className="p-2 rounded text-gray-600 hover:bg-gray-200"
              title="Quitar enlace"
            >
              <FaUnlink />
            </button>
          )}
        </div>
        
        <div className="flex-1"></div>
        
        {/* Limpiar formato */}
        <button
          type="button"
          onClick={handleClearFormat}
          className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 flex items-center gap-1"
          title="Limpiar todo el formato"
        >
          <FaEraser />
          <span>Limpiar formato</span>
        </button>
      </div>
      
      {/* Input para enlace */}
      {showLinkInput && (
        <div className="flex items-center gap-2 p-2 border border-gray-300 border-t-0 bg-gray-50">
          <input
            type="url"
            placeholder="https://ejemplo.com"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSetLink()
              }
              if (e.key === 'Escape') {
                e.preventDefault()
                setShowLinkInput(false)
                setLinkUrl('')
              }
            }}
            autoFocus
          />
          <button
            type="button"
            onClick={handleSetLink}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={!linkUrl.trim()}
          >
            Aplicar
          </button>
          <button
            type="button"
            onClick={() => {
              setShowLinkInput(false)
              setLinkUrl('')
            }}
            className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      )}
      
      {/* Editor */}
      <EditorContent editor={editor} />
      
      {/* Atajos de teclado */}
      <div className="mt-2 text-xs text-gray-500">
        <p><strong>Atajos:</strong> 
          <kbd className="ml-1 px-1 bg-gray-200 rounded">Ctrl+B</kbd> Negrita | 
          <kbd className="ml-1 px-1 bg-gray-200 rounded">Ctrl+I</kbd> Cursiva |
          <kbd className="ml-1 px-1 bg-gray-200 rounded">Ctrl+U</kbd> Subrayado |
          <kbd className="ml-1 px-1 bg-gray-200 rounded">Ctrl+K</kbd> Enlace
        </p>
      </div>
    </div>
  )
}

export default EditorTipTap