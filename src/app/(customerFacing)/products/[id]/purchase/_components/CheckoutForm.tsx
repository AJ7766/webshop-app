"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Image from "next/image"
import { FormEvent, useState } from "react"
type CheckoutFormProps = {
    product: {
        name:string
        imagePath:string
        priceInSEK: number
        description: string
    }
    clientSecret: string
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string)

export default function CheckoutForm({product, clientSecret}: CheckoutFormProps){
    return <>
    <div className="max-w-5xl w-full mx-auto space-y-8">
        <div className="flex gap-4 items-center">
    <div className="aspect-video flex-shrink-0 w-1/3 relative">
        <Image src={product.imagePath} fill alt={product.name} className="object-contain"/>
    </div>
    <div>
    <div className="text-lg">
        {product.priceInSEK} SEK
    </div>
    <h1 className="text-2xl font-bold">
        {product.name}
    </h1>
    <div className="line-clamp-3 text-muted-foreground">
        {product.description}
    </div>
        </div>
        </div>
    <Elements options={{clientSecret}} stripe={stripePromise}>
        <Form priceInSEK={product.priceInSEK}/>
        </Elements>
        </div>
        </>   
}


function Form({priceInSEK}: {priceInSEK:number}){
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)
    
    function handleSubmit(e: FormEvent){
        e.preventDefault()
        if(stripe == null || elements == null) return

        setIsLoading(true)
    }

    return(
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Checkout</CardTitle>
                    <CardDescription className="text-destructive">Error</CardDescription>
                </CardHeader>
                <CardContent>
                    <PaymentElement />
                </CardContent>
                <CardFooter>
                    <Button className="w-full" size="lg" disabled={stripe==null || elements ==null}>{isLoading ? "Purchasing..." : `Purchase - ${priceInSEK} SEK`}</Button>
                </CardFooter>
            </Card>
        </form>)
}