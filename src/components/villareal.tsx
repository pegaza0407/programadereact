import { getValue } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
import { Link } from "react-router-dom";



export default function villareal(): React.JSX.Element{

  

    return(
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Villa Real </h1>
        <div className="grid grid-cols-2 gap-4">
          <Link to="/villareal/villarealagregarpiso">
            <button className="w-full">Agregar Pisos</button>
          </Link>
          <Link to="/villareal/villarealmodificartodosprecio">
            <button className="w-full">Modificar precios</button>
          </Link>
          <Link to="/villareal/villarealconsultartodopiso">
            <button className="w-full">Consultar Todo</button>
          </Link>
          <Link to="/villareal/villarealconsultarpisosolo">
            <button className="w-full">Consultar Especifico</button>
          </Link>
        </div>
      </div>
    );
}

