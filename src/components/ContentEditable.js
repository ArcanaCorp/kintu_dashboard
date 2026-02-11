import { IconBold, IconItalic, IconList, IconListNumbers, IconPhoto } from '@tabler/icons-react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import { TextStyle, FontSize } from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'

export default function ContentEditable ({ value, to, onChange }) {

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                inline: false,
                allowBase64: true, // importante para carga local
            }),
            FontSize,
            TextStyle,
            Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
            Placeholder.configure({
                placeholder: 'Escribe el contenido del blog…'
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            if (typeof onChange === 'function') {
                onChange(to, html)
            }
        }
    })

    if (!editor) return null

    return (

        <div className="w-full border rounded-sm">
            <MenuBar editor={editor} to={to} />
            <EditorContent className='p-2' placeholder='Ingresa el texto' editor={editor} />
        </div>

    )

}

function MenuBar({ editor, to }) {

    if (!editor) return null

    const handleImageUpload = (event) => {
        const file = event.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = () => {
            editor.commands.focus()
            editor.commands.setImage({
                src: reader.result,
            })
        }
        reader.readAsDataURL(file)

        event.target.value = ''
    }

    return (
        <div className="w-full h flex items-center gap-2 mb-2 border-b ph-2" style={{"--h": "40px"}}>
            <button className='w h grid-center bg-secondary rounded-md' style={{"--w": "30px", "--h": "30px"}} onClick={() => editor.chain().focus().toggleBold().run()}><IconBold size={18}/></button>
            <button className='w h grid-center bg-secondary rounded-md' style={{"--w": "30px", "--h": "30px"}} onClick={() => editor.chain().focus().toggleItalic().run()}><IconItalic size={18}/></button>
            <button className='w h grid-center bg-secondary rounded-md' style={{"--w": "30px", "--h": "30px"}} onClick={() => editor.chain().focus().toggleBulletList().run()}><IconList size={18}/></button>
            <button className='w h grid-center bg-secondary rounded-md' style={{"--w": "30px", "--h": "30px"}} onClick={() => editor.chain().focus().toggleOrderedList().run()}><IconListNumbers size={18}/></button>
            <select className='w h grid-center bg-secondary rounded-md' style={{"--w": "50px", "--h": "30px"}} onChange={(e) => editor.chain().focus().setHeading({ level: Number(e.target.value) }).run()}>
                <option value={''} hidden selected>Tt</option>
                <option value={1}>H1</option>
                <option value={2}>H2</option>
                <option value={3}>H3</option>
                <option value={4}>H4</option>
                <option value={5}>H5</option>
                <option value={6}>H6</option>
            </select>
            <select className="w h bg-secondary rounded-md" style={{ "--w": "70px", "--h": "30px" }} onChange={(e) => editor.chain().focus().setMark('textStyle', { fontSize: e.target.value }).run()}>
                <option value="" hidden>Tamaño</option>
                <option value="12px">12</option>
                <option value="14px">14</option>
                <option value="16px">16</option>
                <option value="18px">18</option>
                <option value="24px">24</option>
                <option value="32px">32</option>
            </select>
            <label htmlFor={`photo-${to}`} className='w h grid-center bg-secondary rounded-md pointer' style={{"--w": "30px", "--h": "30px"}}>
                <IconPhoto size={18} />
                <input type="file" id={`photo-${to}`} accept="image/*" hidden onChange={handleImageUpload} />
            </label>
        </div>
    )
}