import { Body, Container, Head, Heading, Html, Preview, Tailwind } from "@react-email/components";
import { OrderInformation } from "./_components/OrderInformation";
import { randomUUID } from "crypto";
import React from "react";
import {Hr} from "@react-email/components"


type OrderHistoryEmailProps ={
    orders: {
        id: string,
        pricePaidInSEK: number,
        createdAt: Date,
        downloadVerificationId: string
        product:{
            name:string,
            imagePath: string,
            description: string,
    }
}[]
}

OrderHistoryEmail.PreviewProps = {
    orders: [
        {
        id: crypto.randomUUID(),
        pricePaidInSEK: 2342423,
        createdAt: new Date(),
        downloadVerificationId: crypto.randomUUID(),
        product:{
            name:"Product Name",
            imagePath: "/products/b7ddd744-2aed-4c62-90b0-c87ad0b40e47-memory.png",
            description: "Product Other Description",
    },
},
{
    id: crypto.randomUUID(),
    pricePaidInSEK: 20,
    createdAt: new Date(),
    downloadVerificationId: crypto.randomUUID(),
    product:{
        name:"Product Name",
        imagePath: "/products/b7ddd744-2aed-4c62-90b0-c87ad0b40e47-memory.png",
        description: "Product Other Description",
},
},
],
} satisfies OrderHistoryEmailProps

export default function OrderHistoryEmail({orders}:OrderHistoryEmailProps){
    return (
        <Html>
            <Preview>Order History & Downloads</Preview>
            <Tailwind>
                <Head/>
                <Body className="font-sans bg-white">
                    <Container className="max-w-xl">
                        <Heading>Order History</Heading>
                        {orders.map((order,index) => (
                            <React.Fragment key={order.id}>
                <OrderInformation order={order} product={order.product} downloadVerificationId={order.downloadVerificationId}
                />
                {index < orders.length - 1 && <Hr/>}
                </React.Fragment>

            ))}
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}