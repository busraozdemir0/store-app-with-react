import { useEffect, useState } from "react"
import ProductList from "../components/ProductList";
import Loading from "../components/Loading";
import requests from "../api/apiClient";

export default function ProductsPage() {

    const [loadedProducts, setLoadedProducts] = useState([]);
    const [loading, setLoading] = useState(true); // yükleme işlemi state'i (başlangıçta true)

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await requests.products.list();
                setLoadedProducts(data);
            }
            catch(error){
                console.log(error);
            }
            finally{
                setLoading(false); // yüklenme işlemi tamamlandı (hata olsa da olmasa da yükleme işlemi tamamlandı olarak baz alınacak)
            }         
        }
        fetchProducts();
    }, []);

    if(loading)
        return <Loading />

    return <ProductList products={loadedProducts} />
}

