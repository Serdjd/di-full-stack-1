'use client'
import { useRef } from "react"

export default function ContactForm() {
    const formRef = useRef()
    async function onsubmit() {
        const formData = Object.fromEntries(new FormData(formRef.current).entries());
        const response = await fetch("/api/contactos",{
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(formData)
        })
    }
    return(
        <form ref={formRef} action={onsubmit}>
            <label>Nombre: <input name="nombre" type="text" required></input></label><br/>
            <label>Apellidos: <input name="apellidos" type="text" required></input></label><br/>
            <label>Correo: <input  name="correo" type="email" required></input></label><br/>
            <label>Número de telefono: <input name="numero_telefono" type="number" required></input></label><br/>
            <label>Fecha de nacimiento: <input name="fecha_nacimiento" type="date" required></input></label><br/>
            <button type="submit">Añadir</button>
        </form>
    )
}