import { useState } from "react"
import { toast } from "sonner";
import { login } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function LoginPage () {

    const navigate = useNavigate();
    const [ form, setForm ] = useState({
        username: '',
        password: ''
    })
    const [ loading, setLoading ] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleLogin = async () => {
        try {
            if (!form.username || !form.password) return toast('Ingresa los datos completos')
            setLoading(true)
            const user = await login(form.username, form.password)
            const payload = {id: user.user_id, name: user.username, roles: user.roles}
            localStorage.setItem("session", JSON.stringify(payload));
            toast('Incio de sesión exitoso!')
            navigate('/dashboard')
        } catch (error) {
            console.error(error);
            toast(`Error: ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (

        <div className="w bg-white rounded-md p-2" style={{"--w": "30%"}}>
            <h1 className="text-center mb-4">Iniciar Sesión</h1>
            <div className="w-full flex flex-col gap-4">
                <input type="text" className="w-full h rounded-md bg-secondary ph-2" style={{"--h": "50px"}} id="username" name="username" placeholder="Ingresa tu nombre de usuario" onChange={handleChange} required />
                <input type="password" className="w-full h rounded-md bg-secondary ph-2" style={{"--h": "50px"}} id="password" name="password" placeholder="Ingresa tu contraseña" onChange={handleChange} required />
                <button className="w-full h rounded-md bg-primary text-white" style={{"--h": "50px"}} onClick={handleLogin} disabled={loading}>{loading ? 'Cargando...' : 'Iniciar Sesión'}</button>
            </div>
        </div>

    )

}