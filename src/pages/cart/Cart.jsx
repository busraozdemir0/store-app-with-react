import { useEffect, useState } from "react";

import { CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from "@mui/material";
import { currencyTRY } from "../../utils/format";
import { Delete } from "@mui/icons-material";
import Loading from "../../components/Loading";
import { useCartContext } from "../../context/CartContext";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import requests from "../../api/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, deleteItemFromCart, setCart } from "./cartSlice";

export default function CartPage() {
    // const [cart, setCart] = useState(null);

    // useEffect(() => {
    //     requests.cart.get()
    //         .then((cart) => setCart(cart))
    //         .catch((error) => console.log(error))
    //         .finally(() => setLoading(false));
    // }, []);

    // if(loading) 
    //     return <Loading message = "Yükleniyor" />;


    // const { cart, setCart } = useCartContext();

    const { cart, status } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    // const [status, setStatus] = useState({ loading: false, id: "" });

    const subTotal = cart?.cartItems.reduce((toplam, item) => toplam + item.product.price * item.product.quantity, 0);

    const tax = subTotal * 0.2;
    const total = subTotal + tax;

    if (!cart || cart.cartItems.length === 0)
        return <Typography component="h4">Sepetinizde ürün yok.</Typography>

    // function handleAddItem(productId, id) {
    //     setStatus({ loading: true, id: id });
    //     requests.cart.addItem(productId)
    //         .then((cart) => dispatch(setCart(cart)))
    //         .catch(error => console.log(error))
    //         .finally(() => setStatus({ loading: false, id: "" }));
    // }

    // function handleRemoveItem(productId, id, quantity = 1) {
    //     setStatus({ loading: true, id: id });
    //     requests.cart.deleteItem(productId, quantity)
    //         .then((cart) => dispatch(setCart(cart)))
    //         .catch(error => console.log(error))
    //         .finally(() => setStatus({ loading: false, id: "" }));
    // }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: 100 }}></TableCell>
                        <TableCell>Ürün</TableCell>
                        <TableCell sx={{ width: 120 }}>Fiyat</TableCell>
                        <TableCell sx={{ width: 170 }}>Adet</TableCell>
                        <TableCell sx={{ width: 120 }}>Toplam</TableCell>
                        <TableCell sx={{ width: 50 }}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.cartItems.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <img src={`http://localhost:5000/images/${item.product.image}`} style={{ width: "100%" }} />
                            </TableCell>
                            <TableCell>{item.product.title}</TableCell>
                            <TableCell>{currencyTRY.format(item.product.price)}</TableCell>
                            <TableCell>
                                <Button onClick={() => dispatch(addItemToCart(({ productId: item.product.productId })))}>
                                    {status === "pendingAddItem" + item.product.productId
                                        ? <CircularProgress size="20px" /> : <AddCircleOutlinedIcon />}
                                </Button>

                                {item.product.quantity}

                                <Button onClick={() => dispatch(deleteItemFromCart(
                                    {
                                        productId: item.product.productId,
                                        quantity: 1,
                                        key: "single"

                                    }))}>
                                    {status === "pendingDeleteItem" + item.product.productId + "single"
                                        ? <CircularProgress size="20px" /> : <RemoveCircleOutlinedIcon />}
                                </Button>
                            </TableCell>
                            <TableCell>{currencyTRY.format(item.product.price * item.product.quantity)}</TableCell>
                            <TableCell>
                                <Button color="error" onClick={() =>
                                    dispatch(deleteItemFromCart(
                                        {
                                            productId: item.product.productId,
                                            quantity: item.product.quantity,
                                            key: "all"
                                        }))}
                                >
                                    {status === "pendingDeleteItem" + item.product.productId + "all"
                                        ? <CircularProgress size="20px" /> : <Delete />}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell align="right" colSpan={5}>Ara Toplam</TableCell>
                        <TableCell align="right" colSpan={5}>{currencyTRY.format(subTotal)}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell align="right" colSpan={5}>Vergi</TableCell>
                        <TableCell align="right" colSpan={5}>{currencyTRY.format(tax)}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell align="right" colSpan={5}>Toplam</TableCell>
                        <TableCell align="right" colSpan={5}>{currencyTRY.format(total)}</TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </TableContainer>
    );
}