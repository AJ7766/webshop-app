"use client"
import { ChevronDownIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Field, Select } from "@headlessui/react";
import clsx from "clsx";
import { ChangeEvent, useState } from "react";


export default function SortList(){
    const pathName = usePathname()
    const router = useRouter()

    const [selectedValue, setSelectedValue] = useState<string>(() => {
      const parts = pathName.split('/');
      const category = parts[2];
      return category || '';
  });

    const handleSelectChange = async (event: ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);
        if(pathName === `/products`){
          router.replace(`${newValue}`)
        }
        router.push(`/products/${newValue}`)
    }

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
            <option value="mostPopular">Most Popular</option>
          </Select>
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
            aria-hidden="true"
          />
        </div>
      </Field>
    </div>
        </>
    )
}
