import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/home/Index.jsx';
import Cadastro from './pages/cadastro/Cadastro.jsx';
import Login from './pages/login/Login.jsx';
import Perfil from './pages/perfil/Perfil.jsx';

export default function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<Cadastro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Perfil />} />
            </Routes>
        </BrowserRouter>
    );
}

