import { ProductCard } from "@/components/ProductCard";
import { getNewestProducts } from "../../page";

export async function NewestProducts(){
    return(
    (await getNewestProducts()).map(product =>(
        <ProductCard key={`${product.id}`} {...product} />
    )
    )
)
}