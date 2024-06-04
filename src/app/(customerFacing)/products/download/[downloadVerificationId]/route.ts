import db from "@/db/db";
import fs from "fs/promises"
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params: {downloadVerificationId}}: {params: {downloadVerificationId:string}}){
    const data = await db.downloadVerification.findUnique({where:{ id : downloadVerificationId, expiresAt:{gt: new Date}},
    select: { product: { select: {filePath: true, name: true}}}
    })

    if( data == null) {
        return NextResponse.redirect(new URL("/products/download/expired", req.url))
    }
    
    const { size } = await fs.stat(data.product.filePath)
    const file = await fs.readFile(data.product.filePath)
    const extension = data.product.filePath.split(".").pop()
    // we return the file with the correct name and how long the file is for the browser
    return new NextResponse(file, { 
    headers: 
    {"Content-Disposition": `attachement; filename="${data.product.name}.${extension}"`, "Content-Length": size.toString()}})

}