import { Grid } from "@mui/material"

export default function ProductList({products}){
    return (
        <Grid container spacing={2}>
            {products.map((p) => (
                <Grid sx={{backgroundColor: "primary.light"}} key = {p.id} size={{xs: 6, md: 4, lg: 3}}>{p.title}</Grid>
            ))}
        </Grid>
    );
}