import db from "@/db/db";
import fs from "fs/promises"
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, 
{params: {id}}: {params : { id: string}}){

const product = await db.product.findUnique({
    where: {id}, 
    select: {filePath:true, name: true},
})

if (product == null) return notFound()
    //we are getting the file stats from the product afterwards we are reading the file and then we will get the extension if its like a "mp3" file etc.
    const { size } = await fs.stat(product.filePath)
    const file = await fs.readFile(product.filePath)
    const extension = product.filePath.split(".").pop()
    // we return the file with the correct name and how long the file is for the browser
    return new NextResponse(file, { 
    headers: 
    {"Content-Disposition": `attachement; filename="${product.name}.${extension}"`, "Content-Length": size.toString()}})
}