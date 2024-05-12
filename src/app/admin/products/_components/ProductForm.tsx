"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { addProduct } from "../../_actions/products"

export function ProductForm() {
    const [priceInSEK, setPriceInSEK] = useState<number>()

    return (
    <form action={addProduct} className="space-y-8">
        <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              required>
            </Input>
        </div>
        <div className="space-y-2">
            <Label htmlFor="priceInSEK">Price in SEK</Label>
            <Input
              type="text"
              id="priceInSEK"
              name="priceInSEK"
              required
              value={priceInSEK}
              onChange={e=> setPriceInSEK(Number(e.target.value) ||
              undefined)}
            />
              <div className="text-muted-foreground">
                    {`${priceInSEK} SEK`}
                </div>   
        </div>
        <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              required
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="file">File</Label>
            <Input
              type="file"
              id="file"
              name="file"
              required>
            </Input>
        </div>
        <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input
              type="file"
              id="image"
              name="image"
              required>
            </Input>
        </div>
        <Button type="submit">Save</Button>
    </form>
    )
}