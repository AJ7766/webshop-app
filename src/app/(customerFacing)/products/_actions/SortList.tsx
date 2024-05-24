"use client"
import { ArrowDown, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function SortList(){
    const pathname = usePathname()

    return(
        <>
        <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Sort <ArrowDown /></Button>
                </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <Link href={`${pathname}/newest`}>
                                    Newest
                                    </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                            <Link href={`${pathname}/newest`}>
                                    Most Popular
                                    </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
        </>
    )
}
