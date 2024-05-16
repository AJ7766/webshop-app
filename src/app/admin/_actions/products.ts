"use server"

import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"

//the zod is checking if the file imported is a file.
const fileSchema = z.instanceof(File, {message:"Required"})
//using refine from zod library, it adds additional criteria for image checking, if file.size =0 no file uploaded or file has to be an image
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"))

//defines an overall schema using Zod 'object' 
const addSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    priceInSEK: z.coerce.number().int().min(1),
    file: fileSchema.refine(file => file.size >0 , "Required"),
    image: imageSchema.refine(file => file.size >0 , "Required")
})


//this function takes a argument named formData in an instance of FormData
export async function addProduct(prevState: unknown, formData: FormData){
    //result = using previous addSchema to parse and valdiate the form data extracted from the passed argument formData. safeParse method returns a result of the object if its successfully parsed data or error information if validation fails.
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
    //if validation fails, function returns an object containing information about form validation errors.
    if (result.success === false) {
        return result.error.formErrors.fieldErrors
    }
    // if validation succedes the data is further processing
    const data = result.data
    
    //it creates a directory named products, using the fs.mkdir a method from Node.js, recursive means it ensure it is created recursively meaning it creates parent directiories if they dont already exist
    await fs.mkdir("products", { recursive: true})
    //generating a unique file path for the product file
    //using the new directory then generating a random UUID and then the original filename extracted from data.file.name
    const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
    //writes the product file to the file.system using fs.writeFile
    //it writes the contents of the file obtained by converting the files ArrayBuffer (obtained asynchronously using data.file.arrayBuffer() into the file specified by filePath
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))

    await fs.mkdir("public/products", { recursive: true})
    const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

    //this is responsible to create a new product using Prisma create method
    await db.product.create({
        data: {
            isAvailableForPurchase: false,
            name: data.name,
            description: data.description,
            priceInSEK: data.priceInSEK,
            filePath,
            imagePath
    },
})
    redirect("/admin/products")
}

export async function toggleProductAvailability(
    id:string,
    isAvailableForPurchase: boolean
){
    await db.product.update({where: {id}, 
        data:{isAvailableForPurchase}
    })}

const editSchema = addSchema.extend({
        file: fileSchema.optional(),
        image: imageSchema.optional()
})

export async function deleteProduct(id:string){
    const product = await db.product.delete({where: {id}})
    if (product === null) return notFound()
        //fs=file system and unlink means it removes, in this case it removes the filepath and image from the product
    await fs.unlink(product.filePath)
    await fs.unlink(`public${product.imagePath}`)
}

export async function updateProduct(id: string, prevState: unknown, formData: FormData){
    //result = using previous addSchema to parse and valdiate the form data extracted from the passed argument formData. safeParse method returns a result of the object if its successfully parsed data or error information if validation fails.
    const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
    //if validation fails, function returns an object containing information about form validation errors.
    if (result.success === false) {
        return result.error.formErrors.fieldErrors
    }
    // if validation succedes the data is further processing
    const data = result.data
    const product = await db.product.findUnique({where: {id}})

    if (product == null) return notFound()
    
    let filePath = product.filePath
    //if there is a new data.file then delete the old filepath and add a new filepath
    if (data.file != null && data.file.size > 0){
        await fs.unlink(product.filePath)
        filePath = `products/${crypto.randomUUID()}-${data.file.name}`
        await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))
}
    let imagePath = product.imagePath
    if (data.image != null && data.image.size> 0){
        await fs.unlink(`public${product.imagePath}`)
        imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
        await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))
    }

    //this is responsible to update a new product using Prisma update method
    await db.product.update({where: {id},
        data: {
            name: data.name,
            description: data.description,
            priceInSEK: data.priceInSEK,
            filePath,
            imagePath
    },
})
    redirect("/admin/products")
}