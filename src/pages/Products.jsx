import { useEffect, useState } from "react"
import ProductList from "../components/ProductList";
import Loading from "../components/Loading";

export default function ProductsPage() {

    const [loadedProducts, setLoadedProducts] = useState([]);
    const [loading, setLoading] = useState(true); // yükleme işlemi state'i (başlangıçta true)

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("http://localhost:5000/products/");
                const data = await response.json();
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

