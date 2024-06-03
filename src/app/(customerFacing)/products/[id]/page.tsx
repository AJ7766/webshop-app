import { ProductCard } from "@/components/ProductCard";
import db from "@/db/db";
import { notFound } from "next/navigation";
import SortList from "../_actions/SortList";
import { cache } from "@/lib/cache";

const allowedCategories = [{ category: "mostPopular"}, { category: "newest"}]

export const getDatabase = cache(async (id: string) => {
    const newestProducts = db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { createdAt: "desc" }
    });

    const mostPopularProducts = db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { orders: { _count: "desc" } },
    });

    if (id === "newest") {
        return newestProducts;
    } else {
        return mostPopularProducts;
    }
}, ["/products", "getDatabase"], {revalidate: 60*60*24}); // Use the function name and the id as key parts

export function generateStaticParams(){
    const categoryNames = allowedCategories.map(item => item.category);
    return categoryNames
}

export default async function ProductList({params}: {params: {id:string}}){
    const staticParams = generateStaticParams();
    const isCategoryValid = staticParams.includes(params.id);
    const products = await getDatabase(params.id)

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
