"use client"

import { ProductCard } from "@/components/ProductCard";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";

type ProductProps = {
  products: Product[] | Promise<Product[]>; // Modify the type to accept a Promise
};

export function ProductList({ products }: ProductProps) {
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (Array.isArray(products)) {
        // If products is already an array, set it directly
        setProductList(products);
      } else {
        // If products is a Promise, await its resolution and then set the list
        try {
          const resolvedProducts = await products;
          setProductList(resolvedProducts);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      }
    };
    fetchData();
  }, [products]);

  return (
<>
    {productList.length === 0 ? (
      <div>Loading...</div>
    ) : (
      <>
        {productList.map(product => (
          <ProductCard key={`${product.id}`} {...product} />
        ))}
      </>
    )}
  </>
  );
}