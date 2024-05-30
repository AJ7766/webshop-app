"use client"
import { Nav, NavLink } from "@/components/nav";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


export const dynamic ="force-dynamic"

export default function Layout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
        //get pathname, if pathname has "any value of the href, lets say /products/" then make special styling for it
    }>) 
    {
        const pathName = usePathname();
        const [isActive, setIsActive] = useState(false);

        useEffect(() => {
            // Check if the current path includes "/products/"
            console.log(pathName)
            setIsActive(pathName.includes("/products"));
            console.log(isActive)
        }, [pathName,isActive]);
        return <>
        <Nav>
            <NavLink href="/">Dashboard</NavLink>
            <NavLink href="/products">Products</NavLink>
            <NavLink href="/orders">My Orders</NavLink>
        </Nav>
        <div className="container my-6">{children}</div>
        </>//it gets the conten from page.tsx from its export default function
}