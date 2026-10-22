import { useEffect, useState } from "react"
import ProductList from "../components/ProductList";
import Loading from "../components/Loading";
import requests from "../api/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectAllProducts } from "./catalog/catalogSlice";

export default function ProductsPage() {
    // const [loadedProducts, setLoadedProducts] = useState([]);
    // const [loading, setLoading] = useState(true); // yükleme işlemi state'i (başlangıçta true)

    const dispatch = useDispatch();
    const loadedProducts = useSelector(selectAllProducts);
    const {status, isLoaded} = useSelector((state) => state.catalog);

    useEffect(() => {
        // async function fetchProducts() {
        //     try {
        //         const data = await requests.products.list();
        //         setLoadedProducts(data);
        //     }
        //     catch(error){
        //         console.log(error);
        //     }
        //     finally{
        //         setLoading(false); // yüklenme işlemi tamamlandı (hata olsa da olmasa da yükleme işlemi tamamlandı olarak baz alınacak)
        //     }         
        // }
        // fetchProducts();

        if(!isLoaded)
            dispatch(fetchProducts());

    }, [isLoaded]); // => Bu satır; isLoaded değiştiğinde bu sorguyu tekrar çalıştır/gönder demek

    if(status === "pendingFetchProducts")
        return <Loading message = "Yükleniyor..." />

    return <ProductList products={loadedProducts} />
}

