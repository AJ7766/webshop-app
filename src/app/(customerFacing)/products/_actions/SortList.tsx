"use client"
import { ChevronDownIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Field, Select } from "@headlessui/react";
import clsx from "clsx";
import { ChangeEvent, useEffect, useState } from "react";


export default function SortList(){
    const pathname = usePathname()
    const [selectedValue, setSelectedValue] = useState<string>("");

    const handleSelectChange = async (event: ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);
    }

  // Update state based on URL path
  useEffect(() => {
    const pathValue = pathname.split('/').pop() || "";
    if (pathValue === "products") {
      setSelectedValue(""); // If pathValue is "products", set selectedValue to empty string
    } else {
      setSelectedValue(pathValue); // Otherwise, set selectedValue to pathValue
    }
  }, [pathname]);

  type Product = {
    id: string;
    name: string;
    priceInSEK: number;
    filePath: string;
    imagePath: string;
    description: string;
    isAvailableForPurchase: boolean;
    createdAt: Date;
    updatedAt: Date;
  };

  const [products, setProducts] = useState<Product[]>([]); // Initialize as empty array

  useEffect(() => {
    fetch('api/products')
     .then(response => response.json())
     .then(setProducts)
     .catch(error => console.error('Error fetching data:', error));
}, []);
console.log(products); // Moved outside of the useEffect hook

    return(
        <>
         <div className="w-1/4">
      <Field>
        <div className="relative">
          <Select
            className={clsx(
              'outline :mt-3 w-full appearance-none rounded bg-white/5 py-1.5 px-3 text-sm/6 text-black',
              'data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
            value={selectedValue}
            onChange={handleSelectChange}
          >
            <option value="" disabled>Sort By:</option>
            <option value="newest">Newest</option>
            <option value="most-popular">Most Popular</option>
          </Select>
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
            aria-hidden="true"
          />
        </div>
      </Field>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div>
            {products.map(product => (
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <p>Price: {product.priceInSEK}</p>
                    {/* Render other product details here */}
                </div>
            ))}
        </div>
        </div>
        </>
    )
}
