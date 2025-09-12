import { Container, Grid, Typography, Button, Box } from "@mui/material";

export default function Footer() {
    return (
        <Box bgcolor="#f9f9f9" py={6}>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontWeight="bold">Junte-se ao SoundLedger</Typography>
                        <Box mt={2}>
                            <Button variant="contained" sx={{ mr: 2 }}>Cadastre-se</Button>
                            <Button variant="outlined">Login</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body2" color="text.secondary">
                            © 2025 SoundLedger. Todos os direitos reservados.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
