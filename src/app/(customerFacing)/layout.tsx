import { Nav, NavLink } from "@/components/nav";


export const dynamic ="force-dynamic"

export default function Layout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
        return <>
        <Nav>
            <NavLink href="/">Dashboard</NavLink>
            <NavLink href="/products">Products</NavLink>
            <NavLink href="/orders">My Orders</NavLink>
        </Nav>
        <div className="container my-6">{children}</div>
        </>//it gets the conten from page.tsx from its export default function
}