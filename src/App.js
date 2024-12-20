import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Vendedores from './components/ventas.tsx';
import AgregarCliente from './components/AgregarCliente.tsx';
import AgregarVisita from './components/AgregarVisita.tsx';
import ConsultarCliente from './components/ConsultarCliente.tsx';
import ConsultarVisitas from './components/ConsultarVisitas.tsx';
import Datosdevendedor from './components/ventas.tsx';
import Villareal from './components/villareal.tsx';
import Villarealagregarpiso from './components/villarealagregarpiso.tsx';


function App() {
  return (
    <div>
      <Router>
      <div >
        <Routes>
          <Route path="/" element={
            <>
              <h1 >Página Principal</h1>
              <div>
                <Link to="/vendedores">
                  <button className="w-full">Vendedores</button>
                </Link>
                <Link to="/personas">
                  <button className="w-full">Pegaza</button>
                </Link>
                <Link to="/compradores">
                  <button className="w-full">Agregados</button>
                </Link>
                <Link to="/mina">
                  <button className="w-full">Mina</button>
                </Link>
                <Link to="/villareal">
                  <button className="w-full">Villareal</button>
                </Link>
              </div>
            </>
          } />
          <Route path="/vendedores" element={<Datosdevendedor/>} />
          <Route path="/vendedores/agregar-cliente" element={<AgregarCliente />} />
          <Route path="/vendedores/agregar-visita" element={<AgregarVisita />} />
          <Route path="/vendedores/consultar-cliente" element={<ConsultarCliente />} />
          <Route path="/vendedores/consultar-visitas" element={<ConsultarVisitas />} />

          <Route path="/villareal" element={<Villareal/>} />
          <Route path="/villareal/villarealagregarpiso" element={<Villarealagregarpiso/>} />
          
        </Routes>

        
      </div>
    </Router>
    </div>
  );
}

export default App;