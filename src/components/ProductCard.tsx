import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { formatPrice } from "@/actions/priceFormatter";

type ProductCardProps = {
    id: string
    name: string
    priceInSEK: number
    description: string
    imagePath: string
}
export function ProductCard({ id, name, priceInSEK, description, imagePath }: ProductCardProps){
    return (
    <Card className="flex overflow-hidden flex-col">
        <div className="relative w-full h-auto aspect-video">
            <Image src={`${imagePath}`} fill alt={`${name}`} className="object-cover"/>
        </div>
        <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{formatPrice(priceInSEK)}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
            <p className="line-clamp-4">{description}</p>
        </CardContent>
        <CardFooter>
            <Button asChild size="lg" className="w-full">
                <Link href={`/products/${id}/purchase`}>Purchase</Link>
            </Button>
        </CardFooter>
    </Card>
    )
}