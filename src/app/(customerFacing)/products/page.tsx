import SortList from "./_actions/SortList";
import DefaultProductList from "./_components/DefaultProductList";

export default function ProductsPage(){
    return (
    <div className="space-y-4">
    <div className="flex-gap-4 space-y-5" >
    <h2 className="text-3xl font-bold inline-block">Products</h2>
    </div>
    <SortList />
    <DefaultProductList/>
</div>

    )
}