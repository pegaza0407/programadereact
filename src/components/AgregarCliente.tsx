import { getValue } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";

interface Vendedor{
_id:string;
//nom_ferre:string;
//ciudad:string;
//estado:string;
//nombreencargado:string;
//telefono:string;
//label_registro:string;
//fechavisita:Date;
//imagen:string;


peg_num_clien:string;
peg_nom_clien:string;
peg_ciu_clien:string;
peg_est_clien:string;
peg_nom_enc_clien:string;
peg_tel_clien:string;
peg_tex_clien:string;
peg_ima_clien:string;
peg_sino_clien:boolean;
peg_ubi_clien:string;


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


  const bonitoBoton: React.CSSProperties={
    background: '#06200ea',
    color: 'red',
    fontSize:'16px',
    fontWeight:'bold',
    padding:'12px 24px',
    border:'none',
    borderRadius:'8px',
    cursor: 'pointer',
    transition:'all 0.3s ease'

  }

 


  const imagenestilo:React.CSSProperties={
    width: '30%',
    
  }

export default function AgregarCliente(): React.JSX.Element{

    const[nuevavisita,setNuevavisita]=useState < Omit < Vendedor,'_id'>>({
      peg_num_clien:'',
      peg_nom_clien:'',
      peg_ciu_clien:'',
      peg_est_clien:'',
      peg_nom_enc_clien:'',
      peg_tel_clien:'',
      peg_tex_clien:'',
      peg_ima_clien:'',
      peg_sino_clien:false,
      peg_ubi_clien:'',
      
   
       // nom_ferre:'',
       // ciudad:'',
        //estado:'',
        //nombreencargado:'',
        //telefono:'',
        //label_registro:'',
        //fechavisita: new Date(),

    });
        const [arreglovisitas,setArreglovisitas]= useState<Vendedor[]>([]);
        const  API_URL = 'https://mi-backend-a3h0.onrender.com/vendedores';

        
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
        
            // Si el input es de tipo 'date', convertimos el valor a un objeto Date.
            if (name === 'fechavisita') {
              setNuevavisita((prev) => ({ ...prev, fechavisita: new Date(value) }));
            } else {
              setNuevavisita((prev) => ({ ...prev, [name]: value }));
            }
          };


          const cambiodeImgen =(e: React.ChangeEvent<HTMLInputElement>)=>{
            const archivo=e.target.files?.[0];
            if(archivo){
                const leer =new FileReader();
                leer.onload=()=>{
                    setNuevavisita((prev)=>({
                    ...prev,
                    imagen: leer.result as string,
                    }));
                 };
                 leer.readAsDataURL(archivo);

            }



          };

          const cambio_pega_sino_clie=(e: React.ChangeEvent<HTMLInputElement>)=>{
              const {type,value}=e.target;
              if(type=='checkbox'){
              setNuevavisita((prev)=>({
                  ...prev,
                  peg_sino_clien: (e.target as HTMLInputElement).checked
                  }));

              }
          }



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
                peg_num_clien:'',
                peg_nom_clien:'',
                peg_ciu_clien:'',
                peg_est_clien:'',
                peg_nom_enc_clien:'',
                peg_tel_clien:'',
                peg_tex_clien:'',
                peg_ima_clien:'',
                peg_sino_clien:false,
                peg_ubi_clien:'',

               // nom_ferre:'',
                //ciudad:'',
                //estado:'',
                //nombreencargado:'',
                //telefono:'',
                //label_registro:'',
                //fechavisita: new Date(),
                //imagen:'',
                });
              
                alert( `Datos guardados`);   

            } catch (error) {
              console.error('Error submitting product:', error);
            }

            
        };
    

        const verdatos= async()=>{
            try{
                const respuesta =await fetch('https://mi-backend-a3h0.onrender.com/vendedores');
                if (!respuesta.ok) throw new Error('Error buscando datos');
                 const datos1=await respuesta.json();   
                 setArreglovisitas(datos1);
            }catch(error){
                console.error('Error imagen:', error);

            }


        }

    return(
        <div>
            <h1>REGISTRO VISITAS DE CLIENTES</h1>
            <form onSubmit={guardarbasedeDatos}>
                <input type="text" placeholder="Nombre del negocio" value={nuevavisita.peg_num_clien}
                        onChange={(e)=>setNuevavisita({...nuevavisita,peg_num_clien:e.target.value})} style={inputEstilo}/> <br></br>
                <input type="text" placeholder="Ciudad" value={nuevavisita.peg_nom_clien}
                        onChange={(e)=>setNuevavisita({...nuevavisita,peg_nom_clien:e.target.value})}style={inputEstilo}/>
                <input type="text" placeholder="Estado" value={nuevavisita.peg_ciu_clien}
                        onChange={(e)=>setNuevavisita({...nuevavisita,peg_ciu_clien:e.target.value})}style={inputEstilo}/><br></br>
                <input type="text" placeholder="Nombre del encargado" value={nuevavisita.peg_est_clien}
                        onChange={(e)=>setNuevavisita({...nuevavisita,peg_est_clien:e.target.value})}style={inputEstilo}/>
                <input type="text" placeholder="Telefono" value={nuevavisita.peg_nom_enc_clien}
                        onChange={(e)=>setNuevavisita({...nuevavisita,peg_nom_enc_clien:e.target.value})}style={inputEstilo}/><br></br>
                <input type="text" placeholder="Telefono" value={nuevavisita.peg_tel_clien}
                        onChange={(e)=>setNuevavisita({...nuevavisita,peg_tel_clien:e.target.value})}style={inputEstilo}/><br></br>
                <input type="text" placeholder="Telefono" value={nuevavisita.peg_tex_clien}
                        onChange={(e)=>setNuevavisita({...nuevavisita,peg_tex_clien:e.target.value})}style={inputEstilo}/><br></br>
                 <label>algo
                <input type="checkbox" checked={nuevavisita.peg_sino_clien}
                
                        onChange={cambio_pega_sino_clie}/><br></br></label>
                <input type="text" placeholder="Telefono" value={nuevavisita.peg_ubi_clien}
                        onChange={(e)=>setNuevavisita({...nuevavisita,peg_ubi_clien:e.target.value})}style={inputEstilo}/><br></br>
                                    
                               
               
                

                <input type="file" accept="image/*" onChange={cambiodeImgen} />             
              

                <button type="submit" style={buttonEstilo}>Agregar Cliente</button>
               

               
              
            </form>
          {/*  AQUI SE PONEN TODOS LOS DATOS CON MAP
          <div>
              <button onClick={verdatos}>Ver datos</button>
                <div>
                      {arreglovisitas.map((vendedor,index)=>(
                           <div key={index}>

                              <strong>nombre</strong><p>{vendedor.nom_ferre}</p>
                              <strong>imagen</strong><p>{vendedor.imagen}</p>
                              <strong>imagen1</strong> <img src={vendedor.imagen}></img>
                             
                           </div>   
                              

                      ))}                  
                            
                  </div>
              
          </div>
           */} 

        </div>

      


    );
}