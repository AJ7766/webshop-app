import db from "@/db/db"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DeleteDropdownItem } from "./_components/OrderActions";

export default function AdminOrdersPage() {

    return(
        <OrdersTable/>
    )
}

    async function getOrders() {
        return db.order.findMany({
            select: {
                id:true,
                pricePaidInSEK:true,
                product: {select: {name:true}},
                user: {select: {email:true}}
            },
            orderBy: { createdAt: "desc" }
        })
    }
    
    async function OrdersTable(){
        const orders = await getOrders()

        if (orders.length === 0) {
            return <p>No orders found</p>
        }

        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Price Paid</TableHead>
                        <TableHead className="w-0">
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map(order =>(
                    <TableRow key={order.id}>
                        <TableCell>{order.product.name}</TableCell>
                        <TableCell>{order.user.email}</TableCell>
                        <TableCell>{order.pricePaidInSEK/100} SEK</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical />
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DeleteDropdownItem id={order.id} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
            )
    }
       
