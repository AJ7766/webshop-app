import { Body, Container, Head, Heading, Html, Preview, Tailwind } from "@react-email/components";
import { OrderInformation } from "./_components/OrderInformation";
import { randomUUID } from "crypto";


type PurchaseReceiptEmailProps ={
    product:{
        name:string,
        imagePath: string
    },
    order:{ id: string; createdAt: Date; pricePaidInSEK: number},
    downloadVerificationId:string
}

PurchaseReceiptEmail.PreviewProps = {
    product:{
        name: "Product Name",
        imagePath: "/products/087b1eab-f26b-4a5c-b705-8286b967058c-wallpaepr.jpg"
    },order:{
        id: crypto.randomUUID(),
        createdAt: new Date(),
        pricePaidInSEK: 100000,
    }, downloadVerificationId: randomUUID()
} satisfies PurchaseReceiptEmailProps

export default function PurchaseReceiptEmail({product, order, downloadVerificationId}:PurchaseReceiptEmailProps){
    return (
        <Html>
            <Preview>Download {product.name} and view receipt.</Preview>
            <Tailwind>
                <Head/>
                <Body className="font-sans bg-white">
                    <Container className="max-w-xl">
                        <Heading>Purchase Receipt</Heading>
                        <OrderInformation order={order} product={product} downloadVerificationId={downloadVerificationId}/>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}