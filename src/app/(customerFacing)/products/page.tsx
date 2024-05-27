import db from "@/db/db";
import SortList from "./_actions/SortList";

async function Products(){
    const products = await db.product.findMany({where: {isAvailableForPurchase: true}})
    console.log('Products:', products);
    try {
        const response = await fetch('http://localhost:3000/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ products }),
        });
  
        if (response.ok) {
          console.log('Selected value sent successfully');
        } else {
          console.error('Failed to send selected value');
        }
      } catch (error) {
        console.error('Error:', error);
      }
}

export default function ProductsPage(){
Products()
    return (
    <div className="space-y-4">
    <div className="flex-gap-4 space-y-5" >
    <h2 className="text-3xl font-bold inline-block">Products</h2>
    </div>
    <SortList />
</div>

    )
}