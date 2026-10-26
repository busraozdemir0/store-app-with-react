import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, CircularProgress, Container, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import requests from "../../api/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./accountSlice";
import { useForm } from "react-hook-form";

export default function RegisterPage() {

    // const [username, setUsername] = useState("busraozdemir");
    // const [password, setPassword] = useState("12345");

    // const [values, setValues] = useState({
    //     username: "",
    //     password: "",
    // });

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     console.log(values);
    // }

    // function handleInputChange(e) {
    //     const { name, value } = e.target;

    //     setValues({ ...values, [name]: value });
    // }

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.account);

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: {
            userName: "",
            email: "",
            password: "",
        },
    });

    function handleForm(data) {
        // requests.account.register(data)
        // .then((result) => {
        //     console.log(result);
        //     navigate("/login");
        // })
        // .catch(error => console.log(error));

        dispatch(registerUser(data));
    }

    return (
        <Container maxWidth="xs">
            <Paper sx={{ padding: 2 }} elevation={3}>
                <Avatar sx={{ mx: "auto", mb: 2, color: "secondary.main" }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ textAlign: "center", mb: 2 }}>Register</Typography>
                <Box onSubmit={handleSubmit(handleForm)} noValidate component="form" sx={{ mb: 2 }}>
                    <TextField
                        // value={values.username}
                        // onChange={handleInputChange}
                        // name="username"
                        {...register("username", {
                            required: "username zorunlu alan",
                            minLength: {
                                value: 3,
                                message: "username min. 3 karakter olmalıdır."
                            }
                        })}
                        label="Enter username"
                        size="small"
                        fullWidth
                        autoFocus
                        sx={{ mb: 2 }}
                        error={!!errors.username} // username boş değilse true bilgisi getirecek
                        helperText={errors.username?.message}
                    />
                    <TextField
                        // value={values.username}
                        // onChange={handleInputChange}
                        // name="username"
                        {...register("email", {
                            required: "email zorunlu alan",
                            minLength: {
                                value: 3,
                                message: "email min. 3 karakter olmalıdır."
                            }
                        })}
                        label="Enter email"
                        size="small"
                        fullWidth
                        sx={{ mb: 2 }}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        // value={values.password}
                        // onChange={handleInputChange}
                        // name="password"
                        {...register("password", {
                            required: "password zorunlu alan",
                            minLength: {
                                value: 6,
                                message: "username min. 6 karakter olmalıdır."
                            }
                        })}
                        type="password"
                        label="Enter password"
                        size="small"
                        fullWidth
                        sx={{ mb: 2 }}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }} color="secondary" disabled={!isValid}>
                        {status === "pending" ? <CircularProgress size="25px" /> : "Submit"}
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}