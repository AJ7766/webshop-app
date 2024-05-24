import { Button } from "@/components/ui/button";
import { ProductList } from "./_components/ProductList";
import SortButton from "./_actions/SortList";
import SortList from "./_actions/SortList";

export default async function ProductsPage(){

    return (
    <div className="space-y-4">
    <div className="flex-gap-4 space-x-2" >
    <h2 className="text-3xl font-bold inline-block">Products</h2>
        <SortList />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ProductList />
        </div>

</div>
    )
}