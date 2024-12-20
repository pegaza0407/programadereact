import React, { useState, useEffect } from 'react';

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

interface Visita {
  ferreteriaId: string;
  descripcion: string;
  fecha: string;
}

const API_URL = 'https://mi-backend-a3h0.onrender.com/vendedoresvisista';

const AgregarVisita: React.FC = () => {
  const [vendedores, setVendedores] = useState<Vendedor[]>([]);
  const [ciudades, setCiudades] = useState<string[]>([]);
  const [ciudadBuscada, setCiudadBuscada] = useState('');
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState('');
  const [nuevaVisita, setNuevaVisita] = useState<Visita>({
    ferreteriaId: '',
    descripcion: '',
    fecha: ''
  });

  useEffect(() => {
    const fetchVendedores = async () => {
      try {
        const response = await fetch('https://mi-backend-a3h0.onrender.com/vendedores');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Vendedor[] = await response.json();
        setVendedores(data);
        const uniqueCiudades = Array.from(new Set(data.map((v: Vendedor) => v.peg_ciu_clien.toLowerCase())))
          .map(ciudad => ciudad.charAt(0).toUpperCase() + ciudad.slice(1));
        setCiudades(uniqueCiudades);
      } catch (error) {
        console.error('Error fetching vendedores:', error);
      }
    };

    fetchVendedores();
  }, []);

  const ciudadesFiltradas = ciudadBuscada
    ? ciudades.filter(ciudad => 
        ciudad.toLowerCase().startsWith(ciudadBuscada.toLowerCase())
      )
    : [];

  const ferreteriasFiltradas = vendedores.filter(vendedor => 
    vendedor.peg_ciu_clien.toLowerCase() === ciudadSeleccionada.toLowerCase()
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const method = 'POST';
      const url = API_URL;
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaVisita)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok'); 
      }
      setNuevaVisita({
        ferreteriaId: '',
        descripcion: '',
        fecha: ''
      });
      
      alert('Visita guardada con éxito');   

    } catch (error) {
      console.error('Error al guardar la visita:', error);
      alert('Error al guardar la visita');
    }
  };

  



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Consultar Vendedor</h1>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar ciudad"
          value={ciudadBuscada}
          onChange={(e) => setCiudadBuscada(e.target.value)}
          className="border p-2 rounded"
        />
        {ciudadesFiltradas.length > 0 && (
          <ul className="mt-2">
            {ciudadesFiltradas.map((ciudad, index) => (
              <li 
                key={index} 
                onClick={() => {
                  setCiudadSeleccionada(ciudad);
                  setCiudadBuscada('');
                }}
                className="cursor-pointer hover:bg-gray-100 p-1"
              >
                {ciudad}
              </li>
            ))}
          </ul>
        )}
      </div>

      {ciudadSeleccionada && (
        <div className="mb-4">
          <select 
            value={nuevaVisita.ferreteriaId} 
            onChange={(e) => setNuevaVisita({...nuevaVisita, ferreteriaId: e.target.value})}
            className="border p-2 rounded w-full"
          >
            <option value="">Seleccione una ferretería</option>
            {ferreteriasFiltradas.map((ferreteria) => (
              <option key={ferreteria._id} value={ferreteria._id}>
                {ferreteria.peg_nom_clien}
              </option>
            ))}
          </select>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            placeholder="Descripción de la visita"
            value={nuevaVisita.descripcion}
            onChange={(e) => setNuevaVisita({...nuevaVisita, descripcion: e.target.value})}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <input
            type="date"
            value={nuevaVisita.fecha}
            onChange={(e) => setNuevaVisita({...nuevaVisita, fecha: e.target.value})}
            className="border p-2 rounded"
          />
        </div>
        <button type="submit">
          Guardar Visita
        </button>
      </form>
      
    </div>
  );
};

export default AgregarVisita;