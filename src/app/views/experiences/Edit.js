import { useEffect, useState } from "react";
import { toast } from "sonner";
import { updateExperience } from "@/services/experiences.service";

export default function EditExperiences ({ values, action, update }) { 

    const [formData, setFormData] = useState({
        experience_name: "",
        tour_name: "",
        availability: "",
        difficulty_level: "",
        duration: "",
        price_min: "",
        price_max: ""
    });
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        if (values) {
            setFormData({
                experience_name: values.experience_name || "",
                tour_name: values.tour_name || "",
                availability: values.availability || "",
                difficulty_level: values.difficulty_level || "",
                duration: values.duration || "",
                price_min: values.price_min || "",
                price_max: values.price_max || ""
            });
        }
    }, [values]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleCancel = () => action({type: '', values: null});

    const handleSaved = async () => {
        try {
            setLoading(true);
            const data = await updateExperience(values.id, formData);
            update(prevList =>
                prevList.map(item =>
                    item.id === data.id
                        ? { ...item, ...data }
                        : item
                )
            );
            action({type: '', values: null})
            toast.success('Éxito', { description: 'Se guardó los cambios con éxito' })
        } catch (error) {
            toast.error(`Error: ${error.message}`)
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
        
            <h3>Editar experiencia</h3>
            <div className="w-full h bg-secondary mv-2" style={{"--h": "2px"}}></div>
            <div className="flex flex-col gap-2">
                <div className="w-full">
                    <label htmlFor="experience_name" className="block text-xs text-gray mb-2">Ingresa el nombre de la experiencia</label>
                    <input type="text" className="w-full h rounded-md bg-secondary ph-2" style={{"--h": "50px"}} value={formData.experience_name} id='experience_name' name="experience_name" placeholder={`Ingresa el nombre de la experiencia`} aria-label={`Ingresa el nombre de la experiencia`} onChange={handleChange} />
                </div>
                <div className="w-full">
                    <label htmlFor="tour_name" className="block text-xs text-gray mb-2">Ingresa el nombre del tour</label>
                    <input type="text" className="w-full h rounded-md bg-secondary ph-2" style={{"--h": "50px"}} value={formData.tour_name} id='tour_name' name="tour_name" placeholder="Ingresa el nombre del tour" aria-label="Ingresa el nombre del tour" onChange={handleChange} />
                </div>
                <div className="w-full">
                    <label htmlFor="availability" className="block text-xs text-gray mb-2">Disponibilidad del tour</label>
                    <input type="text" className="w-full h rounded-md bg-secondary ph-2" style={{"--h": "50px"}} value={formData.availability} id='availability' name="availability" placeholder="Disponibilidad del tour" aria-label="Disponibilidad del tour" onChange={handleChange} />
                </div>
                <div className="w-full">
                    <label htmlFor="difficulty_level" className="block text-xs text-gray mb-2">Dificultad del tour</label>
                    <input type="text" className="w-full h rounded-md bg-secondary ph-2" style={{"--h": "50px"}} value={formData.difficulty_level} id='difficulty_level' name="difficulty_level" placeholder="Dificultad del tour" aria-label="Dificultad del tour" onChange={handleChange} />
                </div>
                <div className="w-full">
                    <label htmlFor="duration" className="block text-xs text-gray mb-2">Duración del tour</label>
                    <input type="text" className="w-full h rounded-md bg-secondary ph-2" style={{"--h": "50px"}} value={formData.duration} id='duration' name="duration" placeholder="Duración del tour" aria-label="Duración del tour" onChange={handleChange} />
                </div>
                <div className="w-full flex gap-2">
                    <div className="w-full">
                        <label htmlFor="price_min" className="block text-xs text-gray mb-2">Precio mínimo del tour</label>
                        <input type="text" className="w-full h rounded-md bg-secondary ph-2" style={{"--h": "50px"}} value={formData.price_min} id='price_min' name="price_min" placeholder="Precio mínimo del tour" aria-label="Precio mínimo del tour" onChange={handleChange} />
                    </div>
                    <div className="w-full">
                        <label htmlFor="price_max" className="block text-xs text-gray mb-2">Precio máximo del tour</label>
                        <input type="text" className="w-full h rounded-md bg-secondary ph-2" style={{"--h": "50px"}} value={formData.price_max} id='price_max' name="price_max" placeholder="Precio máximo del tour" aria-label="Precio máximo del tour" onChange={handleChange} />
                    </div>
                </div>
                <div className="w-full flex gap-2">
                    <button className="w-full h bg-secondary rounded-md" style={{"--h":"40px"}} onClick={handleCancel}>Cancel</button>
                    <button className="w-full h bg-primary text-white rounded-md" style={{"--h":"40px"}} onClick={handleSaved}>{loading ? 'Guardando...' : 'Guardar'}</button>
                </div>
            </div>

        </>
    )
}