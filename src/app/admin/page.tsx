import { formatPrice } from "@/actions/priceFormatter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db/db";


async function getSalesData() {
    const data = await db.order.aggregate({ //adding every sum of order from database, and counting the total orders
        _sum: { pricePaidInSEK: true },
        _count: true
    })

    return {
        amount: data._sum.pricePaidInSEK || 0,
        numberOfSales: data._count
    }
}

async function getUserData() {
    const [userCount, orderData] = await Promise.all([ // the promise is returned as an array so userCount is assigned in db.count and orderData in db.order
        db.user.count(),
        db.order.aggregate({
        _sum: { pricePaidInSEK: true },
        }),
    ])

    return {
        userCount,
        averageValuePerPerson: userCount === 0 ? 0 : (orderData._sum.pricePaidInSEK || 0) / userCount
    }
}

async function getProductData() {
    const [activeCount, inactiveCount] = await Promise.all([
        db.product.count({where: {isAvailableForPurchase: true}}),
        db.product.count({where: {isAvailableForPurchase: false}})
    ])
    
    return{
        activeCount, inactiveCount
    }
}


export default async function AdminDashboard() {
    const [salesData, userData, productData] = await Promise.all([ // waiting for all the promises and get access to all the variables in the functions requested.
        getSalesData(),
        getUserData(),
        getProductData()
    ])

    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard
            title="Sales"
            subtitle={`${salesData.numberOfSales} Orders`}
            body={`${formatPrice(salesData.amount)}`} 
        />
        <DashboardCard
            title="Customer"
            subtitle={`Average Value: ${formatPrice(userData.averageValuePerPerson)}`}
            body={`${userData.userCount} Customers`} 
        />
        <DashboardCard
            title="Active Products"
            subtitle={`${productData.inactiveCount} Inactive Products`}
            body={`${productData.activeCount} Active Products`} 
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