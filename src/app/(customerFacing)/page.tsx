import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import db from "@/db/db"
import { cache } from "@/lib/cache"
import { Product } from "@prisma/client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export const getNewestProducts = cache(() =>{
    //we are sorting for orders that is avaiable for purchase and sorting it by "desc"
    return db.product.findMany({where: {isAvailableForPurchase: true}, orderBy: {createdAt:"desc"}, take:6})
}, ["/", "getMostPopularProducts",], {revalidate: 60*60*24})

export const getMostPopular = cache(() =>{
    return db.product.findMany({where: {isAvailableForPurchase: true}, orderBy: {orders: {_count:"desc"}}, take:6})
},["/", "getMostPopular",], {revalidate: 60*60*24})

export default function HomePage(){
    return (
        <main className="space-y-12">
            <ProductGridSection title="Newest Products" productsFetcher={getNewestProducts} />
            <ProductGridSection title="Most Popular" productsFetcher={getMostPopular} />
        </main>
    )
}

type ProductGridSectionProps = {
    title: string
    productsFetcher: () => Promise<Product[]>
}
export async function ProductGridSection({title, productsFetcher}: ProductGridSectionProps){
    return (
    <div className="space-y-4">
        <div className="flex-gap-4 space-y-5">
            <h2 className="text-3xl font-bold">{title}</h2>
            <Button variant="outline" asChild>
                <Link href="/products" className="space-x-2">
                    <span>View All</span>
                    <ArrowRight className="size-4"/>
                </Link>
            </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(await productsFetcher()).map(product =>(
                <ProductCard key={`${product.id}`} {...product} />
            )
            )}
        </div>
    </div>
    )
}
