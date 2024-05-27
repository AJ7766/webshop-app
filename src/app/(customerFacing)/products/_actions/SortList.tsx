"use client"
import { ChevronDownIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Field, Select } from "@headlessui/react";
import clsx from "clsx";
import { ChangeEvent, useEffect, useState } from "react";
import { ProductList } from "../_components/ProductList";
import db from "@/db/db";
import { Product } from "@prisma/client";
import { ProductCard } from "@/components/ProductCard";


export default function SortList(){
    const pathname = usePathname()

    const [selectedValue, setSelectedValue] = useState<string>("");
    const [product, setProduct] = useState<Promise<Product[]>>();

    const handleSelectChange = async (event: ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);
        console.log(selectedValue)
        try {
            const response = await fetch('/api/products', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ value: newValue }),
            });
      
            if (response.ok) {
              console.log('Selected value sent successfully');
            } else {
              console.error('Failed to send selected value');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        
       // router.push(`/products/${newValue}`); // Update the URL based on the selected value
      };

  // Update state based on URL path
  useEffect(() => {
    const pathValue = pathname.split('/').pop() || "";
    if (pathValue === "products") {
      setSelectedValue(""); // If pathValue is "products", set selectedValue to empty string
    } else {
      setSelectedValue(pathValue); // Otherwise, set selectedValue to pathValue
    }
  }, [pathname]);

useEffect(() =>{
  const fetchData = async () => {
    try {
        // Make a GET request to your API endpoint
        const response = await fetch('/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        // Parse the JSON response
        const { product } = await response.json();
        // Update the state with the extracted prices
        setProduct(product);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

// Call the fetchData function when the component mounts
fetchData();
}, []); // Empty dependency array ensures the effect runs only once

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
           
        </div>
        </>
    )
}
