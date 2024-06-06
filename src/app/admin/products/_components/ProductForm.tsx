"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { addProduct, updateProduct } from "../../_actions/products"
import { useFormState, useFormStatus } from "react-dom"
import { Product } from "@prisma/client"
import Image from "next/image"
import { formatPrice } from "@/actions/priceFormatter"

export function ProductForm({product}: {product?: Product | null}) {
  const [error, action] = useFormState(product == null ? addProduct : updateProduct.bind(null, product.id), {})
  //if there is a product passed in with priceInSek then its gonna be that, otherwise its undefined
  const [priceInSEK, setPriceInSEK] = useState<number | undefined>(product?.priceInSEK)

    return (
    <form action={action} className="space-y-8">
        <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              required
              defaultValue={product?.name || ""}
              >
            </Input>
            {error.name && <div className="text-destructive">{error.name}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="priceInSEK">Price in SEK</Label>
            <Input
              type="text"
              id="priceInSEK"
              name="priceInSEK"
              required
              defaultValue={product?.priceInSEK || ""}
              value={priceInSEK}
              onChange={e=> setPriceInSEK(Number(e.target.value) ||
              undefined)}
            />
            {error.priceInSEK && <div className="text-destructive">{error.priceInSEK}</div>}
              <div className="text-muted-foreground">
                    {priceInSEK == undefined ? "SEK" : `${priceInSEK} SEK`}
                </div>   
        </div>
        <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={product?.description || ""}
              required
            />
            {error.description && <div className="text-destructive">{error.description}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="file">File</Label>
            <Input
              type="file"
              id="file"
              name="file"
              required={product ==null}>
            </Input>
            {product != null && <div className="text-muted-foreground">{product.filePath}</div>}
            {error.file && <div className="text-destructive">{error.file}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input
              type="file"
              id="image"
              name="image"
              required={product ==null}>
            </Input>
            {product != null && <Image src={product.imagePath} height="400" width="400" alt="Product Image" />}
            {error.image && <div className="text-destructive">{error.image}</div>}
        </div>
        <SubmitButton />
    </form>
    )
}

function SubmitButton(){
  const { pending } = useFormStatus()
  return <Button
    type="submit"
    disabled={pending}>
    {pending? "Saving..." : "Save"}
    </Button>
}