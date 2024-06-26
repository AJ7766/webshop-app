import db from "@/db/db"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DeleteDropdownItem } from "./_components/UserActions";

export default function AdminUsersPage() {

    return(
        <UsersTable/>
    )
}

    async function getUsers() {
        return db.user.findMany({
            select: {
                id:true,
                email: true,
                orders: {select: { pricePaidInSEK: true}},
            },
            orderBy: { createdAt: "desc" }
        })
    }
    
    async function UsersTable(){
        const users = await getUsers()

        if (users.length === 0) {
            return <p>No users found</p>
        }

        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead className="w-0">
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map(user =>(
                    <TableRow key={user.id}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.orders.length}</TableCell>
                        <TableCell>{user.orders.reduce((sum ,o) => o.pricePaidInSEK + sum, 0)/100} SEK</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical />
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DeleteDropdownItem id={user.id} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
            )
    }
       
