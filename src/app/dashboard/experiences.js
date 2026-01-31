import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { deleteExperience, getExperiences } from "../../services/experiences.service";
import EditExperiences from "../views/experiences/Edit";
import CreateExperience from "../views/experiences/Create";
import { toast } from "sonner";

export default function ExperiencesView () {

    const location = useLocation();
    const [ list, setList ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ action, setAction ] = useState({
        type: '',
        values: null
    })

    const onDelete = async (id) => {
        const toastId = toast.loading("Eliminando experiencia...");
        try {
            
            await deleteExperience(id);
            setList(list.filter(itm => itm.id !== id))
            toast.dismiss(toastId)
            toast.success(`Éxito`, {
                description: 'Se eliminó correctamente la experiencia.'
            })

        } catch (error) {
            toast.error(`No se pudo eliminar la experiencia`, {
                id: toastId
            });
            console.error(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            toast('¿Deseas eliminar esta experiencia?', {
                action: {
                    label: 'Sí, eliminar',
                    onClick: () => onDelete(id)
                },
                cancel: {
                    label: 'No, cancelar'
                }
            })
        } catch (error) {
            toast.error(`Error: ${error.message}`)
            console.error(`Error: ${error.message}`);
        }
    }

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getExperiences();
                setList(data)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    if (loading) return <p className="text-xs text-gray">Cargando experiencias...</p>;
    if (!list) return null;
    
    return (

        <>
        
            <div className="w-full flex items-center justify-between">
                <div>
                    <p className="text-xs text-gray">{location.pathname}</p>
                    <h1 className="mb-4">Experiencias</h1>
                </div>
                <button className="bg-primary text-white rounded-md ph-4 pv-2" onClick={() => setAction({type: 'create'})}>Crear experiencia</button>
            </div>

            <div className="w-full flex gap-4">
                <div className="w-full grid grid-cols gap-4 p-2" style={{"--grid-cols":`repeat(${action.type !== '' ? '2' : '4'}, 1fr)`}}>
                    {list.map((item) => {

                        const bgImage = item?.experience_images ? item?.experience_images.filter((i) => i.is_cover === true) : []
                        const url = bgImage[0]?.image_url || '';

                        return (
                            <div key={item.id} className="w-full bg-white rounded-md border">
                                <div className="w-full h bg-secondary rounded-md" style={{"--h": "200px"}}>
                                    <img src={url} alt={`${item.experience_name} - ${item.tour_name}`} />
                                </div>
                                <div className="w-full p-2 flex flex-col gap-2 justify-between">
                                    <p className="text-xs text-gray">{item.experience_name}</p>
                                    <h3>{item.tour_name}</h3>
                                    <div className="flex gap-2">
                                        <button className="w-full h rounded-md bg-danger-transparent text-danger" style={{"--h": "40px"}} onClick={() => handleDelete(item.id)}>Eliminar</button>
                                        <button className="w-full h rounded-md bg-info-transparent text-info" style={{"--h": "40px"}} onClick={() => setAction({type: 'edit', values: item})}>Editar</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {action.type !== '' && (
                    <div className="w h bg-white border p-2 scroll-y" style={{"--w": "400px", "--h": "calc(100dvh - 120px)"}}>
                        {action.type === 'edit' && (<EditExperiences values={action.values} action={setAction} update={setList} />)}
                        {action.type === 'create' && (<CreateExperience list={list} action={setAction} update={setList}/>)}
                    </div>
                )}
            </div>

        </>
    
    )
}