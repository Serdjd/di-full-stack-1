'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Contactos() {
    const [contactos,setContactos] = useState([])
    useEffect(() => {
        fetchData()
    },[])

    async function fetchData() {
        const response = await fetch("api/contactos",{
            method: "GET",
            headers: {"Content-type": "application-json"}
        })
        setContactos(await response.json())
    }

    async function deleteContacto(id) {
        if(window.confirm("Estas seguro que quieres eliminar?")) {
            const response = await fetch("api/contactos",{
                method:"DELETE",
                headers: {"Content-type": "application-json"},
                body: JSON.stringify({"id": id})
            })
            
            if(response.ok) {
                
                fetchData()
            }
            else {
                alert("Ha ocurrido un error, vuelve a intentarlo")
            }
        }
    }

    function Contacto({contacto}) {
        return(
            <>
                <Link href={"/contactos/add"}></Link>
                <br/>
                <Link href={`/contactos/${contacto.id}`}>
                    {contacto.nombre + " " + contacto.apellidos}
                </Link>
                <button onClick={() => deleteContacto(contacto.id) } className={"deleteButton"}>
                    Eliminar
                </button>
            </>
        )
    }

    return(
        <div className={"container"}>
            <h1>Contactos</h1>
            <div>
                {
                    contactos.map((contacto) => <Contacto contacto={contacto} key={contacto.id}></Contacto>)
                }
            </div>
            
        </div>
    )
}

