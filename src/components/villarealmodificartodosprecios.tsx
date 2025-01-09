
import React, { useState, useEffect } from "react";

interface villarealproductospisos {

    _id: string; 
    num_villa_productos:string;
    medida_vila_productos:string;
    nombre_villa_productos:string;
    color_villa_productos:string;
    cajamedida_villa_productos:string;
    preciometro_villa_productos:string;
    preciocaja_villa_productos:string;
    preciometropub_villa_productos:string;
    preciocajpub_villa_productos:string;
    proveedornom_villa_productos:string;
    imagen_villa_productos:string;
    tipo_villa_productos:string;

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

export default function Villarealmodificartodosprecio(): React.JSX.Element{

  const [arreglovisitas, setArreglovisitas] = useState<villarealproductospisos[]>([]);
  const API_URL = 'https://mi-backend-a3h0.onrender.com/villarealagregarpisos';
  const [productosSeleccionados, setProductosSeleccionados] = useState<Set<string>>(new Set());
  const [mensajeGuardado, setMensajeGuardado] = useState<string | null>(null); // Estado para el mensaje de guardado


  
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

 // Función para manejar el cambio de los checkboxes
 const manejarCheckbox = (id: string) => {
    const nuevosSeleccionados = new Set(productosSeleccionados);
    if (nuevosSeleccionados.has(id)) {
      nuevosSeleccionados.delete(id);
    } else {
      nuevosSeleccionados.add(id);
    }
    setProductosSeleccionados(nuevosSeleccionados);
  };


 //  Función para manejar el cambio de precio de metro
      const manejarCambioPrecioMetro = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const nuevoPrecio = e.target.value;
        setArreglovisitas((prev) =>
        prev.map((producto) =>
        producto._id === id
            ? { ...producto, preciometro_villa_productos: nuevoPrecio}
    : producto
    )
    );
    };
 


 // Función para guardar los cambios
 const guardarCambios = async () => {
  try {
    const productosActualizados = arreglovisitas.filter((producto) =>
      productosSeleccionados.has(producto._id)
    );
    console.log('Productos seleccionados:', productosActualizados);

    if (productosActualizados.length === 0) {
      console.log('No hay productos seleccionados para guardar');
      return;
    }

    for (const producto of productosActualizados) {
      const response = await fetch(`${API_URL}/${producto._id}`, {
        method: 'PUT',
        body: JSON.stringify(producto),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al guardar los productos');
      }
    }

    setMensajeGuardado('Los cambios se han guardado correctamente.'); // Establece el mensaje de éxito
    setTimeout(() => {
      setMensajeGuardado(null); // Borra el mensaje después de un tiempo
    }, 3000);
  } catch (error) {
    console.error('Error al guardar los productos:', error);
  }
};



  // Función para manejar la carga de imágenes
  //const cambiodeImgen = (e: React.ChangeEvent<HTMLInputElement>) => {
   // const archivo = e.target.files?.[0];
   // if (archivo) {
    //  const leer = new FileReader();
     // leer.onload = () => {
      //  setNuevavisita((prev) => ({
       //   ...prev,
        //  imagen_villa_productos: leer.result as string, // Guarda la imagen en base64
        //}));
      //};
     // leer.readAsDataURL(archivo);
  //  }
  //};

 

  return (
    <div>
      <h1>LISTA DE TODOS LOS PISOS</h1>
      <form >
        

       
      <div>
        {arreglovisitas.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          <table>
            <thead>
              <tr>
             
                <th>Numero</th>
                <th>Medida</th>
                <th>Nombre</th>
                <th>Color</th>
                <th>MEdida </th>
                <th>Precio metro</th>
                <th>Precio caja</th>
                <th>Precio metro publico</th>
                <th>Precio caja publico</th>
                <th>Proveedor</th>
                <th>Tipo producto</th>
                <th>Imagen</th>
                </tr>
            </thead>
            <tbody>
              {arreglovisitas.map((producto) => (
                <tr key={producto._id}>
                   <td>
                    <input
                        type="checkbox"
                        checked={productosSeleccionados.has(producto._id)}
                        onChange={() => manejarCheckbox(producto._id)}
                      /> 
                    </td>
                  <td>{producto.num_villa_productos}</td>
                  <td>{producto.medida_vila_productos}</td>
                  <td>{producto.nombre_villa_productos}</td>
                  <td>{producto.color_villa_productos}</td>
                  <td>{producto.cajamedida_villa_productos}</td>

                  <td>
                    {productosSeleccionados.has(producto._id) ? (
                        <input
                          type="text"
                          value={producto.preciometro_villa_productos}
                          onChange={(e) => manejarCambioPrecioMetro(e, producto._id)}
                          style={inputEstilo}
                        />
                      ) : (
                        producto.preciometro_villa_productos
                      )}
                    </td>
                  <td>{producto.preciocaja_villa_productos}</td>
                  <td>{producto.preciometropub_villa_productos}</td>
                  <td>{producto.preciocajpub_villa_productos}</td>
                  <td>{producto.proveedornom_villa_productos}</td>
                  <td>{producto.tipo_villa_productos}</td>
                  <td>
                    {producto.imagen_villa_productos && (
                      <img
                        src={producto.imagen_villa_productos}
                        alt={producto.nombre_villa_productos}
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
      <button type="button" onClick={guardarCambios} style={buttonEstilo}>
          Guardar Cambios
        </button>

      </form>
      {mensajeGuardado && <p>{mensajeGuardado}</p>}
    </div>
  );
}


