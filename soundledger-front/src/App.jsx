import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/home/Index.jsx';
import Cadastro from './pages/cadastro/Cadastro.jsx';

export default function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<Cadastro />} />
            </Routes>
        </BrowserRouter>
    );
}

