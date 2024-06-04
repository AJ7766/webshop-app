"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Elements, LinkAuthenticationElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Image from "next/image"
import { FormEvent, useState } from "react"
import { userOrderExists } from "../../../_actions/orders"
type CheckoutFormProps = {
    product: {
        id: string
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
    <h1 className="text-2xl font-bold">
        {product.name}
    </h1>
    <div className="line-clamp-3 text-muted-foreground">
        {product.description}
    </div>
    <div className="text-lg">
        {product.priceInSEK} SEK
    </div>
        </div>
        </div>
    <Elements options={{clientSecret}} stripe={stripePromise}>
        <Form priceInSEK={product.priceInSEK} productId={product.id}/>
        </Elements>
        </div>
        </>   
}


function Form({priceInSEK, productId}: {priceInSEK:number, productId: string}){
    const stripe = useStripe()
    const elements = useElements() // all the elements, inputs
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>()
    const [email, setEmail] = useState<string>()

   async function handleSubmit(e: FormEvent){
        e.preventDefault()
        if(stripe == null || elements == null || email == null) return

        setIsLoading(true)

        const orderExists = await userOrderExists(email, productId)

        if (orderExists){
            setErrorMessage("You already purchased this product. Try download it from the My Order page")
            setIsLoading(false)
            return
        }
        //check for existing order
        stripe.confirmPayment({elements, confirmParams:{
            return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchaseSuccess`
        },
    }).then(({ error }) => {
        if(error.type === "card_error" || error.type === "validation_error"){
            setErrorMessage(error.message)
        }else{
            setErrorMessage("A unknown error has occured.")
        }
    }).finally(() => setIsLoading(false))
    }

    return(
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Checkout</CardTitle>
                    {errorMessage && <CardDescription className="text-destructive">{errorMessage}</CardDescription>}
                </CardHeader>
                <CardContent>
                    <PaymentElement />
                    <div className="mt-4">
                      <LinkAuthenticationElement
                      onChange={e => setEmail(e.value.email)}
                      />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" size="lg" disabled={stripe==null || elements ==null || isLoading}>{isLoading ? "Purchasing..." : `Purchase - ${priceInSEK} SEK`}</Button>
                </CardFooter>
            </Card>
        </form>)
}