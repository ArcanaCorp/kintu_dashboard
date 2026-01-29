import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { CompanyRepository, getCompanyProfile } from "../../services/company.service";
import EditableField from "../../components/EditableField";

export default function CompanyView () {

    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [company, setCompany] = useState(null);
    const [ tab, setTab ] = useState(1)

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const data = await getCompanyProfile();
                setCompany(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) return <p className="text-xs text-gray">Cargando empresa…</p>;
    if (!company) return null;

    const address = company?.company_address?.[0];
    const contact = company?.company_contact[0];

    return (

        <>
        
            <p className="text-xs text-gray">{location.pathname}</p>
            <h1 className="mb-4">Datos de la empresa</h1>

            <div className="w-full bg-white border rounded-md p-2 flex gap-8">
                
                <ul className="w h-full flex flex-col gap-2" style={{"--w": "300px"}}>
                    <li className={`w-full h rounded-md flex items-center ph-2 text-xs pointer ${tab === 1 ? 'bg-primary text-white' : 'bg-secondary'}`} style={{"--h": "40px"}} onClick={() => setTab(1)}>Información Básica</li>
                    <li className={`w-full h rounded-md flex items-center ph-2 text-xs pointer ${tab === 2 ? 'bg-primary text-white' : 'bg-secondary'}`} style={{"--h": "40px"}} onClick={() => setTab(2)}>Slogan's</li>
                    <li className={`w-full h rounded-md flex items-center ph-2 text-xs pointer ${tab === 3 ? 'bg-primary text-white' : 'bg-secondary'}`} style={{"--h": "40px"}} onClick={() => setTab(3)}>Valores</li>
                    <li className={`w-full h rounded-md flex items-center ph-2 text-xs pointer ${tab === 4 ? 'bg-primary text-white' : 'bg-secondary'}`} style={{"--h": "40px"}} onClick={() => setTab(4)}>Dirección</li>
                    <li className={`w-full h rounded-md flex items-center ph-2 text-xs pointer ${tab === 5 ? 'bg-primary text-white' : 'bg-secondary'}`} style={{"--h": "40px"}} onClick={() => setTab(5)}>Contacto</li>
                    <li className={`w-full h rounded-md flex items-center ph-2 text-xs pointer ${tab === 6 ? 'bg-primary text-white' : 'bg-secondary'}`} style={{"--h": "40px"}} onClick={() => setTab(6)}>Redes sociales</li>
                </ul>

                <div className="w-full">
                    {tab === 1 && (
                        <div className="flex flex-col gap-4">
                            <div className="w-full">
                                <p className="text-xs text-gray mb-2">Nombre Legal</p>
                                <EditableField
                                    value={company.legal_name}
                                    onSave={v =>
                                        CompanyRepository.updateCompany(company.id, {
                                            legal_name: v
                                        })
                                    }
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-xs text-gray mb-2">Nombre Comercial</p>
                                <EditableField
                                    value={company.brand_name}
                                    onSave={v =>
                                        CompanyRepository.updateCompany(company.id, {
                                            brand_name: v
                                        })
                                    }
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-xs text-gray mb-2">Descripción</p>
                                <EditableField
                                    value={company.description}
                                    onSave={v =>
                                        CompanyRepository.updateCompany(company.id, {
                                            description: v
                                        })
                                    }
                                    type="textarea"
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-xs text-gray mb-2">Misión</p>
                                <EditableField
                                    value={company.mission}
                                    onSave={v =>
                                        CompanyRepository.updateCompany(company.id, {
                                            mission: v
                                        })
                                    }
                                    type="textarea"
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-xs text-gray mb-2">Visión</p>
                                <EditableField
                                    value={company.vision}
                                    onSave={v =>
                                        CompanyRepository.updateCompany(company.id, {
                                            vision: v
                                        })
                                    }
                                    type="textarea"
                                />
                            </div>
                        </div>
                    )}
                    {tab === 2 && (
                        <div className="flex flex-col gap-4">
                            {company.company_slogans.map((slogan, idx) => {
                                return (
                                    <div className="w-full" key={slogan.id}>
                                        <p className="text-xs text-gray mb-2">Slogan {idx + 1}</p>
                                        <EditableField
                                            value={slogan.slogan}
                                            onSave={v =>
                                                CompanyRepository.updateSlogan(slogan.id, {
                                                    slogan: v
                                                })
                                            }
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    )}
                    {tab === 3 && (
                        <div className="flex flex-col gap-4">
                            {company.company_values.map((valor, idx) => {
                                return (
                                    <div className="w-full" key={valor.id}>
                                        <p className="text-xs text-gray mb-2">Valor {idx + 1}</p>
                                        <EditableField
                                            value={valor.value}
                                            onSave={v =>
                                                CompanyRepository.updateValue(valor.id, {
                                                    value: v
                                                })
                                            }
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    )}
                    {tab === 4 && address && (
                        <div className="flex flex-col gap-4">
                            <div className="w-full">
                                <p className="text-xs text-gray mb-2">Dirección</p>
                                <EditableField
                                    value={address.street}
                                    onSave={v =>
                                        CompanyRepository.updateAddress(address.id, {
                                            street: v
                                        })
                                    }
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-xs text-gray mb-2">Ciudad</p>
                                <EditableField
                                    value={address.city}
                                    onSave={v =>
                                        CompanyRepository.updateAddress(address.id, {
                                            city: v
                                        })
                                    }
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-xs text-gray mb-2">Provincia</p>
                                <EditableField
                                    value={address.province}
                                    onSave={v =>
                                        CompanyRepository.updateAddress(address.id, {
                                            province: v
                                        })
                                    }
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-xs text-gray mb-2">Región</p>
                                <EditableField
                                    value={address.region}
                                    onSave={v =>
                                        CompanyRepository.updateAddress(address.id, {
                                            region: v
                                        })
                                    }
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-xs text-gray mb-2">País</p>
                                <EditableField
                                    value={address.country}
                                    onSave={v =>
                                        CompanyRepository.updateAddress(address.id, {
                                            country: v
                                        })
                                    }
                                />
                            </div>
                        </div>
                    )}
                    {tab === 5 && contact && (
                        <div className="flex flex-col gap-4">
                            <div className="w-full">
                                <p className="text-xs text-gray mb-2">Email</p>
                                <EditableField
                                    value={contact.email}
                                    onSave={v =>
                                        CompanyRepository.updateContact(contact.id, {
                                            email: v
                                        })
                                    }
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-xs text-gray mb-2">Teléfono</p>
                                <EditableField
                                    value={contact.phone}
                                    onSave={v =>
                                        CompanyRepository.updateContact(contact.id, {
                                            phone: v
                                        })
                                    }
                                />
                            </div>
                        </div>
                    )}
                    {tab === 6 && (
                        <div className="flex flex-col gap-4">
                            {company.company_social_media.map((social) => (
                                <div className="w-full" key={social.id}>
                                    <p className="text-xs text-gray mb-2">{social.platform}</p>
                                    <EditableField
                                        value={social.url}
                                        onSave={v =>
                                            CompanyRepository.updateSocialMedia(social.id, {
                                                url: v
                                            })
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>

        </>

    )

}