import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yrvxotqxpuxnbnrjhnum.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlydnhvdHF4cHV4bmJucmpobnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NTc0MDgsImV4cCI6MjA1MjMzMzQwOH0.76ImGFYULXtaDvTQ9vayCm41KNIQGSb8daUr3oBUPic'
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
    const { data: contacto, error } = await supabase
      .from("contacto")
      .select("id, nombre, apellidos")
      .order("nombre")
    if (error) {
        return new Response({status: 500})
    }
    return new Response(JSON.stringify(contacto), 
        {
            status: 200,
            headers: {"Content-type": "application/json"}
        }
    )
}

export async function DELETE(request) {
    try {
        const body = await request.json()
        
        const { data, error } = await supabase
        .from("contacto")
        .delete()
        .eq("id", body.id)

        if(error) {
            return new Response({status: 500})
        }

        return new Response(
            JSON.stringify({message: "Usuario eliminado"}), 
            {
                status: 200,
                headers: {"Content-type": "application/json"}
            }
        )
    }
    catch (error) {
        return new Response({status: 500})
    }
}

export async function POST(request) {
   const body = await request.json()

   if(body.nombre && body.apellidos && body.numero_telefono) {
        if(/.+(@(.*?\.)+.*)$/.test(body.correo)) {
            if(String(body.numero_telefono).length === 9) {
                const { data, error } = await supabase
                    .from("contacto")
                    .insert([body])
                if(error) {
                    return new Response({status: 500})
                }
        
                return new Response(
                    JSON.stringify({message: "Usuario añadido"}), 
                    {
                        status: 200,
                        headers: {"Content-type": "application/json"}
                    }
                )
            }
        }
   }
   return new Response({status: 500})
}