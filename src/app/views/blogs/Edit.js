import { useState } from "react"
import ContentEditable from "../../../components/ContentEditable"
import { IconPhoto } from "@tabler/icons-react"

export default function EditBlog ({ values, action, update }) {

    const [ formData, setFormData ] = useState({
        titulo: '',
        category: '',
        summary: '',
        content: '',
        cover: ''
    })

    const handleChangeContent = (html) => {
        setFormData(prev => ({
            ...prev,
            content: html
        }))
    }

    return (

        <>
        
            <div className="w-full flex flex-col gap-4">
                <div className="w-full">
                    <label className="block text-xs text-gray mb-2">Ingresar el titulo del blog</label>
                    <input type="text" className="w-full h border rounded-sm ph-2" style={{"--h": "40px"}} placeholder="Ingresar titulo del blog" />
                </div>

                <div className="w-full">
                    <label className="block text-xs text-gray mb-2">Ingresar la cateogoria del blog</label>
                    <input type="text" className="w-full h border rounded-sm ph-2" style={{"--h": "40px"}} placeholder="Ingresar la categoria del blog" />
                </div>

                <div className="w-full">
                    <label className="block text-xs text-gray mb-2">Ingresa el resumen del blog</label>
                    <ContentEditable value={formData.content} onChange={handleChangeContent} />
                </div>

                <div className="w-full">
                    <label className="block text-xs text-gray mb-2">Ingresa el contenido del blog</label>
                    <ContentEditable value={formData.content} onChange={handleChangeContent} />
                </div>
                <div className="w-full flex gap-2">
                    <button className="w-full h rounded-md bg-secondary" style={{"--h": "40px"}}>Cancelar</button>
                    <button className="w-full h rounded-md bg-primary text-white" style={{"--h": "40px"}}>Actualizar</button>
                </div>
            </div>
        
        </>

    )

}