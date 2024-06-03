import db from "@/db/db"
import { notFound } from "next/navigation"
import Stripe from "stripe"
import CheckoutForm from "./_components/CheckoutForm"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
export default async function PurchasePage({params: {id}}:{params: {id:string}}){
    const product = await db.product.findUnique({where:{id}})
    if (product == null) return notFound()
    
    const payementIntent = await stripe.paymentIntents.create({
        amount: product.priceInSEK,
        currency: "SEK",
        metadata: {productId: product.id}
    })

    if(payementIntent.client_secret == null){
        throw Error("Stripe failed to create payment intent")
    }

    return <CheckoutForm product={product} clientSecret={payementIntent.client_secret}/>
}