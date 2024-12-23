import React, { useState, useEffect } from "react";

interface Vendedor {

    
    _id: string;
  peg_num_clien: string;
  peg_nom_clien: string;
  peg_ciu_clien: string;
  peg_est_clien: string;
  peg_nom_enc_clien: string;
  peg_tel_clien: string;
  peg_tex_clien: string;
  peg_ima_clien: string;
  peg_sino_clien: boolean;
  peg_ubi_clien: string;

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

const bonitoBoton: React.CSSProperties = {
  background: '#06200ea',
  color: 'red',
  fontSize: '16px',
  fontWeight: 'bold',
  padding: '12px 24px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const imagenestilo: React.CSSProperties = {
  width: '30%',
};
export default function ConsultarCliente(): React.JSX.Element{


  const [nuevavisita, setNuevavisita] = useState<Omit<Vendedor, '_id'>>({

    
    peg_num_clien: '',
    peg_nom_clien: '',
    peg_ciu_clien: '',
    peg_est_clien:'',
    peg_nom_enc_clien: '',
    peg_tel_clien: '',
    peg_tex_clien: '',
    peg_ima_clien: '',
    peg_sino_clien: false,
    peg_ubi_clien: '',
    
   
  });

  const [arreglovisitas, setArreglovisitas] = useState<Vendedor[]>([]);
  const API_URL = 'https://mi-backend-a3h0.onrender.com/vendedores';
                  

  
 // Función para cargar los productos desde la base de datos
 const cargarProductos = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Error al cargar los productos");
      }
      const data = await response.json();
      setArreglovisitas(data); // Guarda los productos en el estado
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  };

  // useEffect para cargar los productos al montar el componente
  useEffect(() => {
    cargarProductos();
  }, []);

  useEffect(() => {
    console.log(arreglovisitas); // Verificar si los datos se actualizan correctamente
  }, [arreglovisitas]);

  // Función para manejar la carga de imágenes
  const cambiodeImgen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (archivo) {
      const leer = new FileReader();
      leer.onload = () => {
        setNuevavisita((prev) => ({
          ...prev,
          imagen_villa_productos: leer.result as string, // Guarda la imagen en base64
        }));
      };
      leer.readAsDataURL(archivo);
    }
  };

 

  return (
    <div>
      <h1>LISTA DE DATOS DE CLIENTES</h1>
      <form >
               
      <div>
        {arreglovisitas.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          <table>
            <thead>
              <tr>
             
                <th>Numero</th>
                <th>Nombre</th>
                <th>Ciudad</th>
                <th>Estado</th>
                <th>Nombre Encargado</th>
                <th>Telefono </th>
                <th>texto Negocio</th>
                <th>Cliente s/n</th>
                <th>Ubicacion</th>
                <th>Imagen</th>
                
                </tr>
            </thead>
            <tbody>
              {arreglovisitas.map((producto) => (
                <tr key={producto._id}>
                  <td>{producto.peg_num_clien}</td>
                  <td>{producto.peg_nom_clien}</td>
                  <td>{producto.peg_ciu_clien}</td>
                  <td>{producto.peg_est_clien}</td>
                  <td>{producto.peg_nom_enc_clien}</td>
                  <td>{producto.peg_tel_clien}</td>
                  <td>{producto.peg_tex_clien}</td>
                  <td>{producto.peg_sino_clien ?  "Sí" : "No"}</td>
                  <td>{producto.peg_ubi_clien}</td>
                 
                  <td>
                    {producto.peg_ima_clien && (
                      <img
                        src={producto.peg_ima_clien}
                        alt={producto.peg_nom_clien}
                        style={imagenestilo}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>


      </form>
    </div>
  );
}








 