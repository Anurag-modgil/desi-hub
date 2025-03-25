
import { useNavigate } from "react-router-dom";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
}

interface OrdersTabProps {
  orders: Order[];
}

const OrdersTab = ({ orders }: OrdersTabProps) => {
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>
          View and track your recent orders.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-100 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="text-sm text-gray-500">Order #{order.id}</span>
                    <p className="font-medium">{formatDate(order.date)}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Status</span>
                      <p className={`font-medium ${order.status === 'Delivered' ? 'text-green-600' : 'text-blue-600'}`}>
                        {order.status}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Total</span>
                      <p className="font-medium">{formatPrice(order.total)}</p>
                    </div>
                    <Button variant="outline" size="sm" className="sm:ml-4">
                      View Details
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium mb-3">Items</h4>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="h-16 w-16 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            {formatPrice(item.price)} × {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No orders yet</h3>
            <p className="text-gray-500 mb-4">
              You haven't placed any orders yet.
            </p>
            <Button 
              onClick={() => navigate("/products")}
              className="bg-indian-red hover:bg-indian-red/90"
            >
              Browse Products
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrdersTab;
