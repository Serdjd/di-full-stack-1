import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yrvxotqxpuxnbnrjhnum.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlydnhvdHF4cHV4bmJucmpobnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NTc0MDgsImV4cCI6MjA1MjMzMzQwOH0.76ImGFYULXtaDvTQ9vayCm41KNIQGSb8daUr3oBUPic'
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request) {
    const {searchParams} = new URL(request.url)
    const id = +searchParams.get("id")

    const {data: contacto, error} = await supabase
        .from("contacto")
        .select("*")
        .eq("id", id)

    if(error) {
        return new Response({status: 500})
    }

    return new Response(
        JSON.stringify(contacto[0]), 
        {
            status: 200,
            headers: {"Content-type": "application/json"}
        }
    )
}

export async function PUT(request) {
    
    const {searchParams} = new URL(request.url)
    const id = +searchParams.get("id")
    const body = await request.json()
    const { data, error } = await supabase
        .from("contacto")
        .update([body])
        .eq("id",id)
    if(error) {
        return new Response({status: 500})
    }

    return new Response(
        JSON.stringify({message: "Usuario modificado"}), 
        {
            status: 200,
            headers: {"Content-type": "application/json"}
        }
    )
}