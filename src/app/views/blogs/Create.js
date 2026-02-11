import { useState } from "react";
import ContentEditable from "../../../components/ContentEditable";
import { toast } from "sonner";
import { createBlog, generateSlug, uploadCoverImage } from "../../../services/blog.service";
import { IconPhoto } from "@tabler/icons-react";

export default function CreateBlog ({ update }) {

    const [ formData, setFormData ] = useState({
        titulo: '',
        category: '',
        summary: '',
        content: '',
        cover: ''
    })
    const [coverPreview, setCoverPreview] = useState(null)
    const [ loading, setLoading ] = useState(false)

    const handleChange = (name, html) => {
        setFormData(prev => ({
            ...prev,
            [name]: html
        }))
    }

    const handleFileChange = (e) => {
        try {
            const file = e.target.files[0]
            if (!file) return
            const previewUrl = URL.createObjectURL(file)
            setFormData(prev => ({
                ...prev,
                cover: file, // 👈 guardas el File
            }))
            setCoverPreview(previewUrl)
        } catch (error) {
            console.error(error);
            toast.error('Error', { description: error.message })
        }
    }

    const handleCreateBlog = async () => {
        try {
            if (!formData.titulo || !formData.category || !formData.summary || !formData.content || !formData.cover) return toast.warning('Alerta', { description: 'Completa todos los campos antes de continuar' })
                
                setLoading(true);

                const slug = generateSlug(formData.titulo);

                const coverUrl = await uploadCoverImage({
                    file: formData.cover,
                    slug: slug
                })

                const data = await createBlog({
                    ...formData,
                    slug,
                    cover: coverUrl
                });

                update(data)
                toast.success('Éxito', { description: 'Se subió correctamente el blog' })

        } catch (error) {
            console.error(error);
            toast.error('Error', { description: error.message })
        } finally {
            setLoading(false)
        }
    }

    return (

        <>
        
            <div className="w-full flex flex-col gap-4">

                <div className="w-full">
                    <label className="grid-center w-full h bg-secondary rounded-sm pointer" htmlFor="fileCover" style={{"--h": "200px"}}>
                        {formData.cover === '' ? (
                            <IconPhoto/>
                        ) : (
                            <img src={coverPreview} alt={`${formData.titulo}`} />
                        )}
                    </label>
                    <input type="file" onChange={handleFileChange} accept="image/*" id="fileCover" hidden/>
                </div>

                <div className="w-full">
                    <label className="block text-xs text-gray mb-2">Ingresar el titulo del blog</label>
                    <input type="text" className="w-full h border rounded-sm ph-2" style={{"--h": "40px"}} value={formData.titulo} placeholder="Ingresar titulo del blog" onChange={(e) => setFormData(prev => ({...prev, titulo: e.target.value}))} />
                </div>

                <div className="w-full">
                    <label className="block text-xs text-gray mb-2">Ingresar la categoria del blog</label>
                    <input type="text" className="w-full h border rounded-sm ph-2" style={{"--h": "40px"}} value={formData.category} placeholder="Ingresar la categoria del blog" onChange={(e) => setFormData(prev => ({...prev, category: e.target.value}))} />
                </div>

                <div className="w-full">
                    <label className="block text-xs text-gray mb-2">Ingresa el resumen del blog</label>
                    <ContentEditable value={formData.summary} to={'summary'} onChange={handleChange} />
                </div>
                
                <div className="w-full">
                    <label className="block text-xs text-gray mb-2">Ingresa el contenido del blog</label>
                    <ContentEditable value={formData.content} to={'content'} onChange={handleChange} />
                </div>
                <div className="w-full flex gap-2">
                    <button className="w-full h rounded-md bg-secondary" style={{"--h": "40px"}}>Cancelar</button>
                    <button className="w-full h rounded-md bg-primary text-white" style={{"--h": "40px"}} onClick={handleCreateBlog} disabled={loading}>Crear</button>
                </div>

            </div>
        
        </>

    )

}