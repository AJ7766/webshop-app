import db from '@/db/db'
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const products = await db.product.findMany({where: {isAvailableForPurchase: true}})
    console.log('Fetched products:', products) // Log the fetched products
    return NextResponse.json({
        products
    });
}