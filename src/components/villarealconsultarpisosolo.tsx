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

const precioMetroEstilo: React.CSSProperties = {
    backgroundColor: '#FFD700', // Color de fondo dorado
    color: '#000', // Color del texto negro
    fontWeight: 'bold', // Texto en negrita
    padding: '5px 10px', // Espaciado alrededor del texto
    borderRadius: '5px', // Bordes redondeados
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Sombra suave para resaltar
   
  };

const inputEstilo: React.CSSProperties = {
  margin: '5px',
  padding: '10px',
  width: '15%',
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

export default function Villarealconsultartodopiso(): React.JSX.Element{

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
  const API_URL = 'https://mi-backend-a3h0.onrender.com/villarealagregarpisos';
   // Estados para los filtros
  const [medidaFilter, setMedidaFilter] = useState<string>('');  // Nuevo estado para el filtro
  const [nombreFilter, setNombreFilter] = useState<string>("");  // ESTADO PARA EL NOMBRE EL FILTRO
  const [colorFilter, setColorFilter] = useState<string>("");  // ESTADO PARA EL NOMBRE EL FILTRO
  const [tipo_villaFilter, setTipo_villaFilter] = useState<string>("");  // ESTADO PARA EL NOMBRE EL FILTRO
  const [proveedornomFilter, setProveedorFilter] = useState<string>("");  // ESTADO PARA EL PROVEEDOR EL FILTRO
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

 // Función para manejar los filtros
 const manejarFiltro = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMedidaFilter(e.target.value);
  }

  const manejarFiltroNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombreFilter(e.target.value);
  };

  const manejarFiltrotipo_villa = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTipo_villaFilter(e.target.value);
  };

  const manejarFiltroColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorFilter(e.target.value);
  };

  const manejarFiltroproveedornom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProveedorFilter(e.target.value);
  };

  const productosFiltrados = arreglovisitas.filter((producto) => {
    const medidaCoincide =
      medidaFilter === "" || producto.medida_vila_productos.toLowerCase().includes(medidaFilter.toLowerCase());
    const nombreCoincide =
      nombreFilter === "" || producto.nombre_villa_productos.toLowerCase().includes(nombreFilter.toLowerCase());
    const tipo_villaCoincide =
        tipo_villaFilter === "" || producto.tipo_villa_productos.toLowerCase().includes(tipo_villaFilter.toLowerCase());
    const colorCoincide =
         colorFilter === "" || producto.color_villa_productos.toLowerCase().includes(colorFilter.toLowerCase());
    const proveedornomCoincide =
        proveedornomFilter === "" || producto.proveedornom_villa_productos.toLowerCase().includes(proveedornomFilter.toLowerCase());
    return medidaCoincide && nombreCoincide && tipo_villaCoincide && proveedornomCoincide && colorCoincide;
  });

  //const productosFiltrados = medidaFilter
   // ? arreglovisitas.filter(producto =>
   //     producto.medida_vila_productos.toLowerCase().includes(medidaFilter.toLowerCase())
    //  )
    //: arreglovisitas;

   


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
      <h1>LISTA PISOS ESPECIFICADOS</h1>

      <div>
      

      {/* Input para filtrar por medida */}
      <div>
        <input
          type="text"
          value={medidaFilter}
          onChange={manejarFiltro}
          placeholder="Filtrar por medida"
          style={inputEstilo}
        />
          <input
            type="text"
            value={nombreFilter}
            onChange={manejarFiltroNombre}
            placeholder="Filtrar por nombre"
            style={inputEstilo}
          />
        <input
            type="text"
            value={colorFilter}
            onChange={manejarFiltroColor}
            placeholder="Color de piso"
            style={inputEstilo}
          />
      </div>
       {/* Input para filtrar por nombre */}
       <div>
                 
          <input
            type="text"
            value={tipo_villaFilter}
            onChange={manejarFiltrotipo_villa}
            placeholder="Filtrar por tipo de piso"
            style={inputEstilo}
          />
          
           <input
            type="text"
            value={proveedornomFilter}
            onChange={manejarFiltroproveedornom}
            placeholder="Nombre del proveedor"
            style={inputEstilo}
          />
        </div>

      <form>
        <div>
          {productosFiltrados.length === 0 ? (
            <p>No hay productos disponibles.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Numero</th>
                  <th>Medida</th>
                  <th>Nombre</th>
                  <th>Color</th>
                  <th>Medida Caja</th>
                  <th>Precio metro</th>
                  <th>Precio caja</th>
                  <th>Precio metro público</th>
                  <th>Precio caja público</th>
                  <th>Proveedor</th>
                  <th>Tipo producto</th>
                  <th>Imagen</th>
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.map((producto) => (
                  <tr key={producto._id}>
                    <td>{producto.num_villa_productos}</td>
                    <td>{producto.medida_vila_productos}</td>
                    <td>{producto.nombre_villa_productos}</td>
                    <td>{producto.color_villa_productos}</td>
                    <td>{producto.cajamedida_villa_productos}</td>
                    <td>{producto.preciometro_villa_productos}</td>
                    <td>{producto.preciocaja_villa_productos}</td>
                    <td style={precioMetroEstilo}>{producto.preciometropub_villa_productos}</td>
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
      </form>
    </div>
    </div>

    
  );
}



