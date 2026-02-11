import { useEffect, useState } from "react"
import ContentEditable from "../../../components/ContentEditable"
import { IconPhoto } from "@tabler/icons-react";
import { toast } from "sonner";
import { generateSlug, updateBlog, uploadCoverImage } from "../../../services/blog.service";

export default function EditBlog ({ values, action, update }) {

    const [ formData, setFormData ] = useState({
        titulo: '',
        category: '',
        summary: '',
        content: '',
        cover: null,
        published: false
    })
    const [ coverPreview, setCoverPreview ] = useState('')
    const [ loading, setLoading ] = useState(false);


    console.log(formData);

    useEffect(() => {
        if (values) {
            setFormData({
                titulo: values.titulo || "",
                category: values.category || "",
                summary: values.summary || "",
                content: values.content || "",
                published: values.published || false
            });
            setCoverPreview(values.cover)
        }
    }, [values])

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

    const handleUpdate = async () => {
        
        if (!formData.titulo || !formData.category || !formData.summary || !formData.content) return toast.warning('Alerta', { description: 'Todos los campos deben estar completos antes de continuar.' })

        try {
            setLoading(true);
            const slug = await generateSlug(formData.titulo);

            let coverUrl = values.cover // 👈 por defecto mantiene la actual

            // ✅ SOLO si el usuario cambió la imagen
            if (formData.cover instanceof File) {
                coverUrl = await uploadCoverImage({
                    file: formData.cover,
                    slug
                })
            }

            const data = await updateBlog({
                id: values.id,
                titulo: formData.titulo,
                category: formData.category,
                summary: formData.summary,
                content: formData.content,
                published: formData.published,
                slug,
                cover: coverUrl,
            })

            update(prevList => 
                prevList.map((item) =>
                    item.id === data.id ? { ...item, ...data } : item
                )
            )
            action({type: '', values: null})
            toast.success('Éxito', { description: 'Se actualizó el blog correctamente.' })
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
                    <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" id="published" name="published" checked={formData.published} onChange={(e) => setFormData(prev => ({...prev, published: !formData.published}))}/>
                        {formData.published ? 'Publicado' : 'No publicado'}
                    </label>
                </div>
                <div className="w-full">
                    <label className="grid-center w-full h bg-secondary rounded-md pointer" style={{"--h": "200px"}} htmlFor="coverImage">
                        {formData.cover !== '' ? (
                            <img src={coverPreview} alt={`${formData.titulo} ${formData.category}`} />
                        ) : (
                            <IconPhoto/>
                        )}
                    </label>
                    <input type="file" id="coverImage" accept="image/*" hidden onChange={handleFileChange}/>
                </div>

                <div className="w-full">
                    <label className="block text-xs text-gray mb-2">Ingresar el titulo del blog</label>
                    <input type="text" id="titulo" name="titulo" className="w-full h border rounded-sm ph-2" style={{"--h": "40px"}} value={formData.titulo} placeholder="Ingresar titulo del blog" onChange={(e) => setFormData(prev => ({...prev, titulo: e.target.value}))} />
                </div>

                <div className="w-full">
                    <label className="block text-xs text-gray mb-2">Ingresar la cateogoria del blog</label>
                    <input type="text" id="category" name="category" className="w-full h border rounded-sm ph-2" style={{"--h": "40px"}} value={formData.category} placeholder="Ingresar la categoria del blog" onChange={(e) => setFormData(prev => ({...prev, category: e.target.value}))} />
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
                    <button className="w-full h rounded-md bg-secondary" style={{"--h": "40px"}} onClick={() => action({type: '', values: null})}>Cancelar</button>
                    <button className="w-full h rounded-md bg-primary text-white" style={{"--h": "40px"}} disabled={loading} onClick={handleUpdate}>{loading ? 'Actualizando...' : 'Actualizar'}</button>
                </div>
            </div>
        
        </>

    )

}