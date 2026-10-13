import { Alert, Button, Paper, Typography } from "@mui/material";
import { Link, useLocation } from "react-router"

export default function ServerErrorPage() {
    const { state } = useLocation();
    return (
        <Paper sx={{ p: 3 }}>
            {state?.error ? (
                <>
                    <Typography variant="h4" gutterBottom>
                        {state.error.message} - {state.status}
                    </Typography>
                    <Alert severity="error">
                        {state.error.details || "Bilinmeyen bir hata oluştu."}
                    </Alert>
                </>
            ) : (
                <>
                    <Typography variant="h4">
                        Server Error
                    </Typography>
                    <Alert severity="error">
                        Bilinmeyen bir hata oluştu.
                    </Alert>
                </>
            )}
            <Button component={Link} to="/" variant="contained" sx={{mt: 2}} color="secondary">Anasayfa</Button>
        </Paper>
    );
}