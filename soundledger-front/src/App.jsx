import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/home/Index.jsx';
import Cadastro from './pages/cadastro/Cadastro.jsx';
import Login from './pages/login/Login.jsx';
import Perfil from './pages/perfil/Perfil.jsx';
import BuscarMusica from "./pages/buscarmusica/Buscar.jsx";
import Relatorio from "./pages/relatorio/Relatorio.jsx";
import CadastroMusica from "./pages/cadastromusica/CadastroMusica.jsx";

export default function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Cadastro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Perfil />} />
                <Route path="/search" element={<BuscarMusica />} />
                <Route path="/rel" element={<Relatorio />}/>
                <Route path="/cadastromusica" element={<CadastroMusica />}/>
            </Routes>
        </BrowserRouter>
    );
}

