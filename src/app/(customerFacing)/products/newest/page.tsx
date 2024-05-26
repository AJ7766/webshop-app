import SortList from "../_actions/SortList";
import { NewestProducts } from "../_components/NewestProducts";

export default async function ProductsPage(){

    return (
    <div className="space-y-4">
    <div className="flex-gap-4 space-y-5" >
    <h2 className="text-3xl font-bold inline-block">Products</h2>
    </div>
    <SortList />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NewestProducts />
        </div>

</div>
    )
}