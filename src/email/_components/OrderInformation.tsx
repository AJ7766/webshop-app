import { formatPrice } from "@/actions/priceFormatter";
import { Column, Img, Row, Section, Text, Button } from "@react-email/components"

type OrderInformationProps = {
    order: { id: string; createdAt: Date; pricePaidInSEK: number},
    product: {
        name:string
        imagePath:string,
        description: string,
    },
    downloadVerificationId: string
}

const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium"})

export function OrderInformation({order, product, downloadVerificationId}: OrderInformationProps){
    return <>
    <Section>
        <Row>
            <Column>
                <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">Order ID</Text>
                <Text className="mt-0 mr-4">{order.id}</Text>
            </Column>
            <Column>
            <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">Purchased On</Text>
                <Text className="mt-0 mr-4">{dateFormatter.format(order.createdAt)}</Text>
            </Column>
            <Column>
            <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">Price Paid</Text>
                <Text className="mt-0 mr-4">{formatPrice(order.pricePaidInSEK)} SEK</Text>
            </Column>
        </Row>
    </Section>
    <Section className="border border-solid border-gray-500 rounded-lg p-4 md:p-6 my-4">
        <Img width="100%" alt={product.name} src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.imagePath}`}/>
        <Row className="mt-8">
            <Column>
                <Text className="text-lg font-bold m-0 mr-4">{product.name}</Text>
                <Text>{product.description}</Text>
            </Column>
            <Column>
            <Button href={`${process.env.NEXT_PUBLIC_SERVER_URL}/products/download/${downloadVerificationId}`} className="bg-black text-white px-6 py-4 rounded-md text-md">
                Download
            </Button>
            </Column>
        </Row>
    </Section>

    </>
}