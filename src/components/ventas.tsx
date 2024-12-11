import { getValue } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";

interface Vendedor{
_id:string;
nom_ferre:string;
ciudad:string;
estado:string;
nombreencargado:string;
telefono:string;
label_registro:string;
fechavisita:Date;
}


const inputEstilo: React.CSSProperties = {
    margin: '5px',
    padding: '10px',
    width: '30%',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };


  const buttonEstilo: React.CSSProperties = {
    padding: '10px 15px',
    margin: '5px',
    backgroundColor: '#A70700',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

export default function Datosdevendedor(): React.JSX.Element{

    const[nuevavisita,setNuevavisita]=useState < Omit < Vendedor,'_id'>>({
        nom_ferre:'',
        ciudad:'',
        estado:'',
        nombreencargado:'',
        telefono:'',
        label_registro:'',
        fechavisita: new Date()});

        const  API_URL = 'https://mi-backend-a3h0.onrender.com/visitas';


        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
        
            // Si el input es de tipo 'date', convertimos el valor a un objeto Date.
            if (name === 'fechavisita') {
              setNuevavisita((prev) => ({ ...prev, fechavisita: new Date(value) }));
            } else {
              setNuevavisita((prev) => ({ ...prev, [name]: value }));
            }
          };

          const guardarbasedeDatos = async (e: React.FormEvent) => {
            e.preventDefault();
            try {
              const method =  'POST';
              const url = API_URL;
              const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevavisita)
              });
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              setNuevavisita({  
                nom_ferre:'',
                ciudad:'',
                estado:'',
                nombreencargado:'',
                telefono:'',
                label_registro:'',
                fechavisita: new Date()});
              
            } catch (error) {
              console.error('Error submitting product:', error);
            }
          };

        

    return(
        <div>
            <h1>REGISTRO VISITAS DE CLIENTES</h1>
            <form onSubmit={guardarbasedeDatos}>
                <input type="text" placeholder="Nombre del negocio" value={nuevavisita.nom_ferre}
                        onChange={(e)=>setNuevavisita({...nuevavisita,nom_ferre:e.target.value})} style={inputEstilo}/> <br></br>
                <input type="text" placeholder="Ciudad" value={nuevavisita.ciudad}
                        onChange={(e)=>setNuevavisita({...nuevavisita,ciudad:e.target.value})}style={inputEstilo}/>
                <input type="text" placeholder="Estado" value={nuevavisita.estado}
                        onChange={(e)=>setNuevavisita({...nuevavisita,estado:e.target.value})}style={inputEstilo}/><br></br>
                <input type="text" placeholder="Nombre del encargado" value={nuevavisita.nombreencargado}
                        onChange={(e)=>setNuevavisita({...nuevavisita,nombreencargado:e.target.value})}style={inputEstilo}/>
                <input type="text" placeholder="Telefono" value={nuevavisita.telefono}
                        onChange={(e)=>setNuevavisita({...nuevavisita,telefono:e.target.value})}style={inputEstilo}/><br></br>
                <textarea  placeholder="Texto de la visita" value={nuevavisita.label_registro}
                        onChange={(e)=>setNuevavisita({...nuevavisita,label_registro:e.target.value})}style={inputEstilo}/><br></br>
                
                <input type="date" placeholder="Fecha de la visita" 
                    value={nuevavisita.fechavisita.toISOString().split('T')[0] }
                    onChange={handleChange} name="fechavisita"/>

                <input type="file"  />

                <button type="submit" style={buttonEstilo}>Agregar visita</button>
               
            </form>
        </div>

    );
}