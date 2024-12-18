import { getValue } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
import { Link } from "react-router-dom";



export default function Datosdevendedor(): React.JSX.Element{

  

    return(
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Vendedores</h1>
        <div className="grid grid-cols-2 gap-4">
          <Link to="/vendedores/agregar-cliente">
            <button className="w-full">Agregar Cliente</button>
          </Link>
          <Link to="/vendedores/agregar-visita">
            <button className="w-full">Agregar Visita</button>
          </Link>
          <Link to="/vendedores/consultar-cliente">
            <button className="w-full">Consultar Cliente</button>
          </Link>
          <Link to="/vendedores/consultar-visitas">
            <button className="w-full">Consultar Visitas</button>
          </Link>
        </div>
      </div>
    );
}