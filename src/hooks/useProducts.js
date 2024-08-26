import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
import "../../firebase.js";

export default function useProducts() {
  const [products, setProducts] = useState([]);

  const db = getDatabase();
  const productsRef = ref(db, `products/`);
  const ProductsQuery = query(productsRef, orderByKey());

  useEffect(() => {
    async function fetchData() {
      try {
        const snapshot = await get(ProductsQuery);
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Check if data is valid before using Object.values
          if (data) {
            setProducts((prev) => {
              return [...prev, ...Object.values(data)];
            });
          } else {
            console.log("No products found");
          }
        } else {
          console.log("Something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return { products };
}
