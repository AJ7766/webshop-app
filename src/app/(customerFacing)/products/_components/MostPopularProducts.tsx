import { ProductCard } from "@/components/ProductCard";
import { getMostPopular } from "../../page";

export async function MostPopularProducts(){
    return(
    (await getMostPopular()).map(product =>(
        <ProductCard key={`${product.id}`} {...product} />
    )
    )
)
}