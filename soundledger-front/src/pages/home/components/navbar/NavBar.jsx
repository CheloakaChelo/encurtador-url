import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";

export default function Navbar() {
    return (
        <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h6">🎵 SoundLedger</Typography>
                <Box>
                    <Button color="inherit">Quem somos?</Button>
                    <Button color="inherit">Login</Button>
                    <Button variant="contained">Cadastre-se</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
