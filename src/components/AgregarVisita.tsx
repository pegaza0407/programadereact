import React, { useState, useEffect } from 'react';

interface Ciudad {
  nombre: string;
  ferreterias: Ferreteria[];
}

interface Ferreteria {
  _id: string;
  nombreFerreteria: string;
}

interface FormData {
  ciudad: string;
  clienteId: string;
  descripcion: string;
  fecha: string;
}

const AgregarVisita: React.FC = () => {
  const [ciudades, setCiudades] = useState<Ciudad[]>([]);
  const [ferreterias, setFerreterias] = useState<Ferreteria[]>([]);
  const [formData, setFormData] = useState<FormData>({
    ciudad: '',
    clienteId: '',
    descripcion: '',
    fecha: ''
  });

  useEffect(() => {
    // Simular la carga de ciudades desde la API
    // En una implementación real, esto sería una llamada a la API
    const ciudadesMock: Ciudad[] = [
      { 
        nombre: 'Ciudad A', 
        ferreterias: [
          { _id: '1', nombreFerreteria: 'Ferretería 1' },
          { _id: '2', nombreFerreteria: 'Ferretería 2' }
        ]
      },
      { 
        nombre: 'Ciudad B', 
        ferreterias: [
          { _id: '3', nombreFerreteria: 'Ferretería 3' },
          { _id: '4', nombreFerreteria: 'Ferretería 4' }
        ]
      },
    ];
    setCiudades(ciudadesMock);
  }, []);

  const handleCiudadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCiudad = e.target.value;
    setFormData({ ...formData, ciudad: selectedCiudad, clienteId: '' });
    const ferreteriasEnCiudad = ciudades.find(c => c.nombre === selectedCiudad)?.ferreterias || [];
    setFerreterias(ferreteriasEnCiudad);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/visitas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Visita agregada exitosamente');
        setFormData({
          ciudad: '',
          clienteId: '',
          descripcion: '',
          fecha: ''
        });
      } else {
        alert('Error al agregar visita');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al agregar visita');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Agregar Visita</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="ciudad">Ciudad</label>
          <select
            id="ciudad"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleCiudadChange}
            required
          >
            <option value="">Seleccione una ciudad</option>
            {ciudades.map((ciudad) => (
              <option key={ciudad.nombre} value={ciudad.nombre}>
                {ciudad.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="clienteId">Ferretería</label>
          <select
            id="clienteId"
            name="clienteId"
            value={formData.clienteId}
            onChange={handleChange}
            required
            disabled={!formData.ciudad}
          >
            <option value="">Seleccione una ferretería</option>
            {ferreterias.map((ferreteria) => (
              <option key={ferreteria._id} value={ferreteria._id}>
                {ferreteria.nombreFerreteria}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="descripcion">Descripción de la Visita</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="fecha">Fecha de la Visita</label>
          <input
            id="fecha"
            name="fecha"
            type="date"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Guardar Visita</button>
      </form>
    </div>
  );
};

export default AgregarVisita;