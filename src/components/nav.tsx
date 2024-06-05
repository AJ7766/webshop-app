"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

//we export a function of a element Nav, we can pass in children or rather the element nav in this case. children:reactNode means we can pass in any JSX element, we are passing in a nav with a styling from tailwind.css.
export function Nav({ children }: { children: ReactNode }) {
    return <nav id="navMenu" className="bg-primary text-primary-foreground flex justify-center px-4">{children}</nav>
}
//here we pass in all the props from the element so lets say we have <NavLink "href="hej" then the href=hej would be passed in here, but we exclude the className with omit.
export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
    const pathName = usePathname();
    const urlArray = []
    var parts = pathName.split("/")
    var adminPage = ""
    var userPage = ""

    if(parts[1] === "admin"){
        if(parts[2] != undefined){
            adminPage = "/" + parts[1] + "/" + parts[2];
        } else{
            adminPage = "/" + parts[1]
        }
        urlArray.push(adminPage);
    }else{
        userPage = "/" + parts[1]
        urlArray.push(userPage)
    }

    const purchasePage = "/" + parts[parts.length-1]
    const isActive: boolean = urlArray[0] === props.href && purchasePage !== "/purchase";
    
    //return a <link element with all the props(id, className etc...) in the className="(cn is a condition, so the default is the long text and the condition is, if the pathName(for example admin, users, products etc is === the prop.href then it has special styling"
    return <Link {...props} className={cn("p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foregorund", isActive && "bg-background text-foreground")} /> 
}