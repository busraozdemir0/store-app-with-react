import { Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function AddressForm() {
    const { register, formState: { errors } } = useFormContext();

    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    {...register("firstname", {
                        required: "firstname zorunlu alan",
                    })}
                    label="Enter firstname"
                    size="small"
                    fullWidth
                    autoFocus
                    sx={{ mb: 2 }}
                    error={!!errors.firstname}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    {...register("lastname", {
                        required: "lastname zorunlu alan",
                    })}
                    label="Enter lastname"
                    size="small"
                    fullWidth
                    sx={{ mb: 2 }}
                    error={!!errors.lastname}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    {...register("phone", {
                        required: "phone zorunlu alan",
                    })}
                    label="Enter phone"
                    size="small"
                    fullWidth
                    sx={{ mb: 2 }}
                    error={!!errors.phone}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    {...register("city", {
                        required: "city zorunlu alan",
                    })}
                    label="Enter city"
                    size="small"
                    fullWidth
                    sx={{ mb: 2 }}
                    error={!!errors.city}
                />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <TextField
                    {...register("address", {
                        required: "address zorunlu alan",
                    })}
                    label="Enter address"
                    size="small"
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ mb: 2 }}
                    error={!!errors.address}
                />
            </Grid>

        </Grid>
    );
}