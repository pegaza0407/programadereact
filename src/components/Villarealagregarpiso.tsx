import React, { useState } from "react";

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

export default function Villarealagregarpiso(): React.JSX.Element {
  const [nuevavisita, setNuevavisita] = useState<Omit<villarealproductospisos, '_id'>>({

    
    num_villa_productos:'',
    medida_vila_productos:'',
    nombre_villa_productos:'',
    color_villa_productos:'',
    cajamedida_villa_productos:'',
    preciometro_villa_productos:'',
    preciocaja_villa_productos:'',
    preciometropub_villa_productos:'',
    preciocajpub_villa_productos:'',
    proveedornom_villa_productos:'',   
    imagen_villa_productos:'',
    tipo_villa_productos:'',

   
  });

  const [arreglovisitas, setArreglovisitas] = useState<villarealproductospisos[]>([]);
  const API_URL = 'https://mi-backend-a3h0.onrender.com/vendedores';

  // Función para manejar los cambios en los inputs
 // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //  const { name, value } = e.target;

  //  if (name === 'fechavisita') {
  //    setNuevavisita((prev) => ({ ...prev, fechavisita: new Date(value) }));
   // } else {
   //   setNuevavisita((prev) => ({ ...prev, [name]: value }));
  //  }
 // };

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

  // Función para manejar el cambio en el checkbox
 // const cambio_pega_sino_clie = (e: React.ChangeEvent<HTMLInputElement>) => {
   // const { type, value } = e.target;
  //  if (type === 'checkbox') {
  //    setNuevavisita((prev) => ({
   //     ...prev,
    //    peg_sino_clien: (e.target as HTMLInputElement).checked,
  //    }));
  //  }
 // };

  // Función para guardar los datos en la base de datos
  const guardarbasedeDatos = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mostrar los datos en consola para depuración
    console.log('Datos a enviar al backend:', nuevavisita);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevavisita), // Asegúrate de que los datos estén en formato JSON
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setNuevavisita({
        num_villa_productos:'',
        medida_vila_productos:'',
        nombre_villa_productos:'',
        color_villa_productos:'',
        cajamedida_villa_productos:'',
        preciometro_villa_productos:'',
        preciocaja_villa_productos:'',
        preciometropub_villa_productos:'',
        preciocajpub_villa_productos:'',
        proveedornom_villa_productos:'',       
        imagen_villa_productos:'',
        tipo_villa_productos:'',
      });

      alert('Datos guardados');
    } catch (error) {
      console.error('Error submitting product:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>REGISTRO VISITAS DE CLIENTES</h1>
      <form onSubmit={guardarbasedeDatos}>
        <input
          type="text"
          placeholder="Numero de piso"
          value={nuevavisita.num_villa_productos}
          onChange={(e) => setNuevavisita({ ...nuevavisita, num_villa_productos: e.target.value })}
          style={inputEstilo}
        /> <br />

        <input
          type="text"
          placeholder="Medida del piso"
          value={nuevavisita.medida_vila_productos}
          onChange={(e) => setNuevavisita({ ...nuevavisita, medida_vila_productos: e.target.value })}
          style={inputEstilo}
        />
        <input
          type="text"
          placeholder="Nombre del piso"
          value={nuevavisita.nombre_villa_productos}
          onChange={(e) => setNuevavisita({ ...nuevavisita, nombre_villa_productos: e.target.value })}
          style={inputEstilo}
        /> <br />
        <input
          type="text"
          placeholder="Color"
          value={nuevavisita.color_villa_productos}
          onChange={(e) => setNuevavisita({ ...nuevavisita, color_villa_productos: e.target.value })}
          style={inputEstilo}
        />
        <input
          type="text"
          placeholder="Medida de la caja"
          value={nuevavisita.cajamedida_villa_productos}
          onChange={(e) => setNuevavisita({ ...nuevavisita, cajamedida_villa_productos: e.target.value })}
          style={inputEstilo}
        /> <br />
        <input
          type="text"
          placeholder="Precio por metro"
          value={nuevavisita.preciometro_villa_productos}
          onChange={(e) => setNuevavisita({ ...nuevavisita, preciometro_villa_productos: e.target.value })}
          style={inputEstilo}
        /> <br />
        <input
          type="text"
          placeholder="Precio por caja"
          value={nuevavisita.preciocaja_villa_productos}
          onChange={(e) => setNuevavisita({ ...nuevavisita, preciocaja_villa_productos: e.target.value })}
          style={inputEstilo}
        /> <br />
        
        <input
          type="text"
          placeholder="Precio por metro al publico"
          value={nuevavisita.preciometropub_villa_productos}
          onChange={(e) => setNuevavisita({ ...nuevavisita, preciometropub_villa_productos: e.target.value })}
          style={inputEstilo}
        /> <br />

        <input
          type="text"
          placeholder="Precio por caja al publico"
          value={nuevavisita.preciocajpub_villa_productos}
          onChange={(e) => setNuevavisita({ ...nuevavisita, preciocaja_villa_productos: e.target.value })}
          style={inputEstilo}
        /> <br />

        <input
          type="text"
          placeholder="nombre proveedor"
          value={nuevavisita.proveedornom_villa_productos}
          onChange={(e) => setNuevavisita({ ...nuevavisita, proveedornom_villa_productos: e.target.value })}
          style={inputEstilo}
        /> <br />

        <input
          type="text"
          placeholder="tipo de piso"
          value={nuevavisita.tipo_villa_productos}
          onChange={(e) => setNuevavisita({ ...nuevavisita, tipo_villa_productos: e.target.value })}
          style={inputEstilo}
        /> <br />
        

        <input type="file" accept="image/*" onChange={cambiodeImgen} /> <br />
        {nuevavisita.imagen_villa_productos && <img src={nuevavisita.imagen_villa_productos} alt="Imagen del negocio" style={imagenestilo} />} <br />

        

        <button type="submit" style={buttonEstilo}>Agregar Piso</button>
      </form>
    </div>
  );
}