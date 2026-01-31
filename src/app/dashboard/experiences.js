import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { getExperiences } from "../../services/experiences.service";

export default function ExperiencesView () {

    const location = useLocation();
    const [ list, setList ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ action, setAction ] = useState({
        type: '',
        id: ''
    })

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
        
            <p className="text-xs text-gray">{location.pathname}</p>
            <h1 className="mb-4">Experiencias</h1>

            <div className="w-full flex gap-4">
                <div className="w-full grid grid-cols gap-4 p-2" style={{"--grid-cols":`repeat(${action.type !== '' ? '2' : '4'}, 1fr)`}}>
                    {list.map((item) => {

                        const bgImage = item.experience_images.filter((i) => i.is_cover === true)
                        const url = bgImage[0].image_url;

                        return (
                            <div key={item.id} className="w-full bg-white rounded-md border">
                                <div className="w-full h bg-secondary rounded-md" style={{"--h": "200px"}}>
                                    <img src={url} alt={`${item.experience_name} - ${item.tour_name}`} />
                                </div>
                                <div className="w-full p-2 flex flex-col gap-2 justify-between">
                                    <p className="text-xs text-gray">{item.experience_name}</p>
                                    <h3>{item.tour_name}</h3>
                                    <div className="flex gap-2">
                                        <button className="w-full h rounded-md bg-danger-transparent text-danger" style={{"--h": "40px"}}>Eliminar</button>
                                        <button className="w-full h rounded-md bg-info-transparent text-info" style={{"--h": "40px"}} onClick={() => setAction({type: 'edit', id: item.id})}>Editar</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {action.type !== '' && (
                    <div className="w bg-white border p-2" style={{"--w": "400px"}}></div>
                )}
            </div>

        </>
    
    )
}