'use client'  // indica que se ejecuta del lado del cliente


import React,{useState, useEffect} from "react";
// importar react y los hooks usestate y useEffect  para manejar las variables y ponerle valores useffect ejecutar codigo cuantas veces queramos

interface User{
// Define una interfaz objeto del usuario es como declarar variable.. o ver de que tipo son las variables
    _id:string; // Cambiado de id a _id para conincidir con MongoDB
    name:string; //nombre de usuario
    phonenumber:string; // numero de telefono
    price:number; // variable con numero
}


const formStyle: React.CSSProperties={
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    margin:'20px 0',

};

const inputStyle: React.CSSProperties={
    margin:'5px',
    padding:'10px',
    width:'100%',
    borderRadius:'5px',
    border:'1px solid #ccc',

};

const buttonStyle: React.CSSProperties={
    padding: '10px 15px',
    margin:'5px',
    backgroundColor:'#0070F3',
    color: 'white',
    border: 'none',
    borderRadius:'5px',
    cursor:'pointer',
};

const userCardStyle: React.CSSProperties={
    border:'1px solid #ccc',
    borderRadius: '5px',
    padding: '15px',
    margin:'10px 0',
};

export default function Userform(){
    const[usarios,setUsuarios]=useState<User[]>([]);
    const[nuevoUsuario,setNuevoUsuario]=useState<Omit<User,'_id'|'price'>>({name:'',phonenumber:''});
    const[editingUSer,setEditingUSer]=useState<User|null>(null);
    const API_URL='https://mi-backend-a3h0.onrender.com';

    useEffect(()=>{
        //es un hook se ejecuta pro primera vez o cuando cambias ciertas dependencias.
        fetchUsers();   // es para optener usuarios desde la app

    }, []);  // lista de depencias de vacias donde indica que el codigo al inicio del reenderizado


    const fetchUsers=async ()=>{
        // para optener los usuarios a la api

        try{  
            const response= await fetch(API_URL);

            if(!response.ok){
                throw new Error(`http error! status ${response.status}`);
                
            }
            const data=await response.json();

            setUsuarios(data);

        }catch(error){
            console.error('error buscando usuarios',error);
        }
    };

    const handleSubmit= async (e:React.FormEvent)=>{  
        //manejar el envio del formulario para agregador o editar usuarios
        e.preventDefault(); // evitar que el formulario recarge la pagina.

        try{
            const method=editingUSer? 'PUT':'POST';
            // DETERMINA SI se usara put(editar) o post (crear)
            const url=editingUSer?`${API_URL}/${editingUSer._id}`:API_URL;

            const response =await fetch( url,{
                method:method,
                headers:{'Content_Type':'application/json'},
                body: JSON.stringify(nuevoUsuario)

            });
            if(!response.ok){
                throw new Error(`hubo un error http estado ${response.status}`);
            }
            setNuevoUsuario({name:'',phonenumber:''});

            setEditingUSer(null);
            fetchUsers();
            
        }catch(error){
            console.error('error al imprimir el usario',error);

        }

    };


    const handleDelete = async(id:string)=>{
        // maneja la eliminacion de un usuariio

        try{
            const response = await fetch (`${API_URL}/${id}`,{method:`DELETE`});

            if (!response.ok){
                throw new Error(`HTTP eror ! status: ${response.status}`);

            }
            fetchUsers();
        }catch (error){
            console.error('Error eliminacion el usuario',error);
        }

    };

    const handleEdit=(user:User)=>{
        //configura el usuario en edicion
        setEditingUSer(user);
        setNuevoUsuario({name:user.name,phonenumber:user.phonenumber});

    };

    return(
    // renderiza el componente
        <div>
            <h1 style={{fontSize:'24px', fontWeight:'bold',margin:'20px 0'}}>Gestion de usuarios</h1>
            <form onSubmit={handleSubmit} style={formStyle}>
                {/*formulacion pra agregar editar usuarios */}
                <input type="text" value={nuevoUsuario.name} onChange={(e)=>setNuevoUsuario({...nuevoUsuario, name: e.target.value})}
                placeholder="nombre del usuario"
                style={inputStyle}
                required
                />
                <input
                    type="tel"
                    value={nuevoUsuario.phonenumber}
                    onChange={(e)=>setNuevoUsuario({...nuevoUsuario,phonenumber:e.target.value})}
                    placeholder="numero de telefono"
                    style={inputStyle}
                    required
                
                />
                <button type="submit" style={buttonStyle}>
                    {/*boton para enviar el formulario */}
                    {editingUSer?'Actualizar':'Agregar'} Usuario
                </button>               
            </form>
            <div>
                {/**lista de usuarios renderizados */}

                {usarios.map((user)=>(
                    <div key={user._id} style={userCardStyle}>
                        <h3 style={{fontSize:'18px' , fontWeight:'bold'}}>{user.name}</h3>
                        <p>Telefono: {user.phonenumber}</p>
                        <button onClick={()=>handleEdit(user)} style={buttonStyle}> Editar
                        </button>
                        <button onClick={()=>handleDelete(user._id)} style={{...buttonStyle, backgroundColor:'#ff4040' }}>Eliminar
                        </button>
                    </div>


                ))
                }
            </div>

        </div>
    );
};

