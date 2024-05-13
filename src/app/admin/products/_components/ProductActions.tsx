"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useTransition } from "react"
import { toggleProductAvailability } from "../../_actions/products"

export function ActiveToggleDropdownItem({
    id,
    isAvailableForPurchase
}: {
    id: string
    isAvailableForPurchase: boolean
}) {
    const [isPending, startTransition] = useTransition()
    return <DropdownMenuItem onClick={() =>
        startTransition(async() => {
            await toggleProductAvailability(id, !isAvailableForPurchase)
        })
    }>

    </DropdownMenuItem>
}

export function DeleteDropdownItem() {
    
}