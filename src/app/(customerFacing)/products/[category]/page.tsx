import { ProductCard } from "@/components/ProductCard";
import db from "@/db/db";
import { notFound } from "next/navigation";
import SortList from "../_actions/SortList";
import { Product } from "@prisma/client";

const allowedCategories = [{ category: "mostPopular"}, { category: "newest"}]

export async function getDatabase(id:string) {
    const newestProducts: Promise<Product[]> = db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { createdAt: "desc" }
    });
    
    const mostPopularProducts: Promise<Product[]> = db.product.findMany({
        where: {isAvailableForPurchase: true}, 
        orderBy: {orders: {_count:"desc"}}, 
    });

    if(id === "newest"){
        return newestProducts
    }else{
        return mostPopularProducts
    }
}

export function generateStaticParams(){
    const categoryNames = allowedCategories.map(item => item.category);
    return categoryNames
}

export default async function ProductList({params}: {params: {category:string}}){
    const staticParams = generateStaticParams();
    const isCategoryValid = staticParams.includes(params.category);
    const products = await getDatabase(params.category)

    return (isCategoryValid ? 
        <div className="space-y-4">
        <div className="flex-gap-4 space-y-5" >
        <h2 className="text-3xl font-bold inline-block">Products</h2>
        </div>
        <SortList />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(products).map(product =>(
                <ProductCard key={`${product.id}`} {...product} />
            )
            )}
            </div>
    </div>
        : notFound())
}
