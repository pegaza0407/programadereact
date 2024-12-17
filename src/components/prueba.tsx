
import React, { useState } from 'react';

const FormularioCaptura = () => {
        // Estado para almacenar el valor del input
        const [nombre, setNombre] = useState('');

        // Función para manejar el cambio en el input
        const manejarCambio = (event) => {
            setNombre(event.target.value);
        };

  // Función para manejar el envío del formulario
    const manejarEnvio = (event) => {
        event.preventDefault(); // Evita que la página se recargue
        
        alert( `Nombre capturado: ${nombre}`);
    // Aquí puedes agregar lógica para enviar los datos a un servidor, etc.



  };

  return (
    
    <form>
        <input  value={nombre}/>Nombre:
    
        <button type="submit" >Enviar</button>
               
    </form>
      
    

  );
};

export default FormularioCaptura;