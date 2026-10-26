import { createBrowserRouter, RouterProvider } from "react-router"
import HomePage from "./pages/Home"
import ProductsPage from "./pages/Products"
import RegisterPage from "./pages/account/Register"
import LoginPage from "./pages/account/Login"
import CartPage from "./pages/cart/Cart"
import ProductDetailsPage from "./pages/ProductDetails"
import ErrorPage from "./pages/errors/Error"
import ServerErrorPage from "./pages/errors/ServerError"
import NotFoundPage from "./pages/errors/NotFound"
import { useContext, useEffect, useState } from "react"
import requests from "./api/apiClient"
import { useCartContext } from "./context/CartContext"
import { useDispatch } from "react-redux"
import { getCart, setCart } from "./pages/cart/cartSlice"
import { getUser, logout, setUser } from "./pages/account/accountSlice"
import MainLayout from "./layouts/Main"
import Loading from "./components/Loading"
import CheckoutPage from "./pages/checkout/Checkout"
import AuthGuard from "./auth/AuthGuard"

export const router = createBrowserRouter([
  {
    path: "/", element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      {
        path: "products",
        children: [
          { index: true, element: <ProductsPage /> },
          { path: ":id", element: <ProductDetailsPage /> },
        ]
      },
      { path: "cart", element: <CartPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },

      {
        element: <AuthGuard />, 
        children: [   // ilk başta AuthGuard izin veriyorsa onun child elemanlarına erişebiliriz
          { path: "checkout", element: <CheckoutPage /> },
        ]
      },
     
      {
        path: "errors", children: [
          { index: true, element: <ErrorPage /> },
          { path: "server-error", element: <ServerErrorPage /> },
          { path: "not-found", element: <NotFoundPage /> },
        ]
      },
      { path: "*", element: <NotFoundPage /> },
    ]
  }
])

function App() {

  // const { setCart } = useCartContext();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = async () => {
    await dispatch(getUser());
    await dispatch(getCart());
  };

  useEffect(() => {

    // dispatch(setUser(JSON.parse(localStorage.getItem("user"))));

    // requests.account
    //   .getUser()
    //   .then(user => {
    //     setUser(user);
    //     localStorage.setItem("user", JSON.stringify(user));
    //   }).catch(error => {
    //     console.log(error);
    //     dispatch(logout());
    //   });

    // requests.cart.get()
    //   .then((cart) => dispatch(setCart(cart)))
    //   .catch((error) => console.log(error));

    initApp().then(() => setLoading(false));

  }, []);

  if (loading)
    return <Loading message="Uygulama başlatılıyor" />

  return <RouterProvider router={router} />
}

export default App
