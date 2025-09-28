import Header from './components/header/Header.jsx';
import Navbar from "./components/navbar/NavBar.jsx";
import Footer from "./components/footer/Footer.jsx";
import {Box, Container} from "@mui/material";


function Home() {
    return (
        <Box sx={{backgroundColor: '#f5f5f5',}}>
            <Header />
            <Navbar />
            <Footer/>
        </Box>
    );
}

export default Home;


