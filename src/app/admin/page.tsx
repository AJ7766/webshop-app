import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db/db";


async function getSalesData() {
    const data = await db.order.aggregate({
        _sum: { pricePaidinSEK: true },
        _count: true
    })

    return {
        amount: data._sum.pricePaidinSEK || 0,
        numberOfSales: data._count
    }
}

async function getUserData() {
    const [userCount, orderData] = await Promise.all([
        db.user.count(),
        db.order.aggregate({
        _sum: { pricePaidinSEK: true },
        }),
    ])

    return {
        userCount,
        averageValuePerPerson: userCount === 0 ? 0 : (orderData._sum.pricePaidinSEK)
    }
}
export default async function AdminDashboard() {
    const [salesData, userData] = await Promise.all([
        getSalesData(),
        getUserData()
    ])

    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard
            title="Sales"
            subtitle={`${salesData.numberOfSales} Orders`}
            body={`${salesData.amount} SEK`} 
        />
        <DashboardCard
            title="Customer"
            subtitle={`${userData.averageValuePerPerson} Average Value`}
            body={`${userData.userCount} Customers`} 
        />
    </div>
}

type DashboardCardProps = {
    title: string
    subtitle: string
    body: string
}

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
    return <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
            <p>{body}</p>
        </CardContent>
    </Card>
}