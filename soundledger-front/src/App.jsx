import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/home/Index.jsx';

export default function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

