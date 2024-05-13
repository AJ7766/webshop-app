"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useTransition } from "react"
import { deleteProduct, toggleProductAvailability } from "../../_actions/products"

//creating a component for our form, a active or inactive toggle of a item. we pass in id and isavailable and then checks if that item through ID is available in the db.
export function ActiveToggleDropdownItem({
    id,
    isAvailableForPurchase
}: {
    id: string
    isAvailableForPurchase: boolean
}) {
    const [isPending, startTransition] = useTransition()
    return( 
    
    <DropdownMenuItem disabled={isPending} onClick={() =>
        startTransition(async() => {
            await toggleProductAvailability(id, !isAvailableForPurchase)
        })
    }> {isAvailableForPurchase ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
    )
}

export function DeleteDropdownItem({
    id,
    disabled,
}: {
    id: string
    disabled: boolean
}) {
    const [isPending, startTransition] = useTransition()
    return( 
    
    <DropdownMenuItem variant="destructive" disabled={disabled || isPending} onClick={() =>
        startTransition(async() => {
            await deleteProduct(id)
        })
    }> Delete
    </DropdownMenuItem>
    )
}