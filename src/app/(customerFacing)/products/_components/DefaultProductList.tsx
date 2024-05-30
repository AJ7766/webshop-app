import { ProductCard } from "@/components/ProductCard"
import { getNewestProducts } from "../../page"

export default async function DefaultProductList(){
    const products = await getNewestProducts()
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
            <ProductCard key={`${product.id}`} {...product} />
        ))}
    </div>
    )
}