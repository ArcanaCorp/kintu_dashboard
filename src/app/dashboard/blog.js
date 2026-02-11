import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { deleteBlog, getBlogs } from "../../services/blog.service";
import { toast } from "sonner";
import { IconX } from "@tabler/icons-react";
import EditBlog from "../views/blogs/Edit";
import CreateBlog from "../views/blogs/Create";

export default function BlogView () {

    const location = useLocation();
    const [ blogs, setBlogs ] = useState([])
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState('')
    const [ action, setAction ] = useState({
        type: '',
        values: null
    })

    const onDelete = async (id) => {
        const toastId = toast.loading('Eliminando blog...')
        try {
            await deleteBlog(id)
            setBlogs(blogs.filter(itm => itm.id !== id))
            toast.dismiss(toastId)
            toast.success('Éxito', { description: 'Se eliminó correctamente el blog.' })
        } catch (error) {
            toast.error('No se pudo eliminar el blog', {
                id: toastId
            })
            console.error(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            toast('¿Deseas eliminar este blog?', {
                action: {
                    label: 'Sí, eliminar',
                    onClick: () => onDelete(id)
                },
                cancel: {
                    label: 'No, cancelar'
                }
            })
        } catch (error) {
            toast.error('Error', { description: error.message })
            console.error(error);
        }
    }

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getBlogs();
                setBlogs(data) 
            } catch (error) {
                setError(error)
                console.error(error);
            } finally {
                setLoading(false)
            }
        }
        load();
    }, [])

    return (


        <>
        
            <div className="w-full flex items-center justify-between">
                <div>
                    <p className="text-xs text-gray">{location.pathname}</p>
                    <h1 className="mb-4">Blogs</h1>
                </div>
                <button className="bg-primary text-white rounded-md ph-4 pv-2" onClick={() => setAction({type: 'created', values: ''})}>Crear blog</button>
            </div>

            <div className="w-full flex gap-4">

                <div className="w-full grid grid-cols gap-4 p-2" style={{"--grid-cols":`repeat(${action.type !== '' ? '2' : '4'}, 1fr)`}}>
                    {loading ? (
                        <p>Cargando...</p>
                    ) : (
                        error ? (
                            <p>{error}</p>
                        ) : (
                            blogs.length === 0 ? (
                                <p>No hay blogs</p>
                            ) : (
                                blogs.map((b) => {
                                    return (
                                        <div key={b.id} className="w-full bg-white rounded-md border overflow-hidden">
                                            <div className="w-full h bg-secondary" style={{"--h": "200px"}}>
                                                <img src={b.cover} alt={`${b.titulo}`} />
                                            </div>
                                            <div className="w-full p-2 flex flex-col gap-2 justify-between">
                                                <p className="text-xs text-gray">{b.category} · {b.published ? 'Publicado' : 'No visible'}</p>
                                                <h3>{b.titulo}</h3>
                                                <div className="flex gap-2">
                                                    <button className="w-full h rounded-md bg-danger-transparent text-danger" style={{"--h": "40px"}} onClick={() => handleDelete(b.id)}>Eliminar</button>
                                                    <button className="w-full h rounded-md bg-info-transparent text-info" style={{"--h": "40px"}} onClick={() => setAction({type: 'edit', values: b})}>Editar</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            )
                        )
                    )}
                </div>

                {action.type !== '' && (
                    <div className="w h bg-white border p-2 scroll-y rounded-md" style={{"--w": "400px", "--h": "calc(100dvh - 120px)"}}>
                        <div className="w-full h flex flex-row items-center justify-between" style={{"--h": "40px"}}>
                            <h3>{action.type === 'edit' ? 'Editar blog' : 'Crear blog'}</h3>
                            <button className="w h grid-center rounded-pill" style={{"--w": "35px", "--h": "35px"}} onClick={() => setAction({type: '', values: ''})}><IconX/></button>
                        </div>
                        <div className="w-full h pv-2" style={{"--h": "calc(100% - 40px)"}}>
                            {action.type === 'edit' && ( <EditBlog values={action.values} action={setAction} update={setBlogs} /> )}
                            {action.type === 'created' && ( <CreateBlog update={setBlogs} action={setAction}/> )}
                        </div>
                    </div>
                )}

            </div>
        
        </>

    )

}