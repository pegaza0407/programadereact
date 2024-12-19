import React, { useState } from "react";

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

export default function AgregarCliente(): React.JSX.Element {
  const [nuevavisita, setNuevavisita] = useState<Omit<Vendedor, '_id'>>({
    peg_num_clien: '',
    peg_nom_clien: '',
    peg_ciu_clien: '',
    peg_est_clien: '',
    peg_nom_enc_clien: '',
    peg_tel_clien: '',
    peg_tex_clien: '',
    peg_ima_clien: '',
    peg_sino_clien: false,
    peg_ubi_clien: '',
  });

  const [arreglovisitas, setArreglovisitas] = useState<Vendedor[]>([]);
  const API_URL = 'https://mi-backend-a3h0.onrender.com/vendedores';

  // Función para manejar los cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'fechavisita') {
      setNuevavisita((prev) => ({ ...prev, fechavisita: new Date(value) }));
    } else {
      setNuevavisita((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Función para manejar la carga de imágenes
  const cambiodeImgen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (archivo) {
      const leer = new FileReader();
      leer.onload = () => {
        setNuevavisita((prev) => ({
          ...prev,
          peg_ima_clien: leer.result as string, // Guarda la imagen en base64
        }));
      };
      leer.readAsDataURL(archivo);
    }
  };

  // Función para manejar el cambio en el checkbox
  const cambio_pega_sino_clie = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, value } = e.target;
    if (type === 'checkbox') {
      setNuevavisita((prev) => ({
        ...prev,
        peg_sino_clien: (e.target as HTMLInputElement).checked,
      }));
    }
  };

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
        peg_num_clien: '',
        peg_nom_clien: '',
        peg_ciu_clien: '',
        peg_est_clien: '',
        peg_nom_enc_clien: '',
        peg_tel_clien: '',
        peg_tex_clien: '',
        peg_ima_clien: '',
        peg_sino_clien: false,
        peg_ubi_clien: '',
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
          placeholder="Numero de cliente"
          value={nuevavisita.peg_num_clien}
          onChange={(e) => setNuevavisita({ ...nuevavisita, peg_num_clien: e.target.value })}
          style={inputEstilo}
        /> <br />

        <input
          type="text"
          placeholder="Nombre del negocio"
          value={nuevavisita.peg_nom_clien}
          onChange={(e) => setNuevavisita({ ...nuevavisita, peg_nom_clien: e.target.value })}
          style={inputEstilo}
        />
        <input
          type="text"
          placeholder="Ciudad"
          value={nuevavisita.peg_ciu_clien}
          onChange={(e) => setNuevavisita({ ...nuevavisita, peg_ciu_clien: e.target.value })}
          style={inputEstilo}
        /> <br />
        <input
          type="text"
          placeholder="Estado"
          value={nuevavisita.peg_est_clien}
          onChange={(e) => setNuevavisita({ ...nuevavisita, peg_est_clien: e.target.value })}
          style={inputEstilo}
        />
        <input
          type="text"
          placeholder="Encargado"
          value={nuevavisita.peg_nom_enc_clien}
          onChange={(e) => setNuevavisita({ ...nuevavisita, peg_nom_enc_clien: e.target.value })}
          style={inputEstilo}
        /> <br />
        <input
          type="text"
          placeholder="Telefono"
          value={nuevavisita.peg_tel_clien}
          onChange={(e) => setNuevavisita({ ...nuevavisita, peg_tel_clien: e.target.value })}
          style={inputEstilo}
        /> <br />
        <input
          type="text"
          placeholder="Texto de negocio"
          value={nuevavisita.peg_tex_clien}
          onChange={(e) => setNuevavisita({ ...nuevavisita, peg_tex_clien: e.target.value })}
          style={inputEstilo}
        /> <br />
        <label>
          Activo
          <input
            type="checkbox"
            checked={nuevavisita.peg_sino_clien}
            onChange={cambio_pega_sino_clie}
          /> <br />
        </label>
        <input
          type="text"
          placeholder="Ubicacion"
          value={nuevavisita.peg_ubi_clien}
          onChange={(e) => setNuevavisita({ ...nuevavisita, peg_ubi_clien: e.target.value })}
          style={inputEstilo}
        /> <br />

        <input type="file" accept="image/*" onChange={cambiodeImgen} /> <br />
        {nuevavisita.peg_ima_clien && <img src={nuevavisita.peg_ima_clien} alt="Imagen del negocio" style={imagenestilo} />} <br />

        <button type="submit" style={buttonEstilo}>Agregar Cliente</button>
      </form>
    </div>
  );
}