'use client'

import { use, useEffect, useRef, useState } from "react"

export default function Contacto({params}) {
    const {id} = use(params);
    const [contacto,setContacto] = useState({})
    const [editMode, setEditMode] = useState(false)
    const formRef = useRef()

    useEffect(() => {
        fetchContacto()
    },[])

    async function fetchContacto() {
        const response = await fetch("/api/contactos/contacto?id="+id, {
            method:"GET",
            headers:{"Content-type": "application-json"}
        })
        const contact = await response.json()
        setContacto(contact)
    }

    async function updateContacto() {
        let formData = Object.fromEntries(new FormData(formRef.current).entries());
        formData = {...formData, numero_telefono: +formData.numero_telefono}
        let modifiedContacto = {}
        Object.entries(formData).forEach(([key,value]) => {
            if(formData[key] !== contacto[key])  {
                modifiedContacto = {...modifiedContacto, [key]: value}
            }
        })
        if (Object.entries(modifiedContacto).length > 0 ) {
            const response = await fetch(`/api/contactos/contacto?id=${id}`,{
                method: "PUT",
                headers: {"Content-type":"apllication/json"},
                body: JSON.stringify(modifiedContacto)
            })

            if(response.ok) {
                fetchContacto()
            }
        }
        setEditMode(false)
    }

    return(
        <div className={"container"}>
        {            
            editMode
            ?
            <>
                <h1>Modo de edición</h1>
                <form ref={formRef} action={updateContacto}>
                        <label>Nombre: <input name={"nombre"} defaultValue={contacto.nombre} type="text" required></input></label><br/>
                        <label>Apellidos: <input name={"apellidos"} defaultValue={contacto.apellidos} type="text" required></input></label><br/>
                        <label>Correo: <input name={"correo"} defaultValue={contacto.correo} type="email" required></input></label><br/>
                        <label>Número de teléfono: <input name={"numero_telefono"} defaultValue={contacto.numero_telefono} type="number" required></input></label><br/>
                        <label>Fecha de nacimiento: <input name={"fecha_nacimiento"} defaultValue={contacto.fecha_nacimiento} type="date" required></input></label><br/>
                        <button type="submit">Editar</button>
                </form>
            </>
            
            :
            <div>
                <h1>{contacto.nombre + " " + contacto.apellidos}</h1>
                <p>Correo: {contacto.correo}</p>
                <p>Teléfono: {contacto.numero_telefono}</p>
                <p>Fecha de nacimiento: {contacto.fecha_nacimiento}</p>
                <button onClick={() => setEditMode(!editMode)} className={"edit"}>Editar</button>
            </div>
        }
        </div>
        
        
    )
}