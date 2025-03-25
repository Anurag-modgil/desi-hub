
// Mock data for the profile page
export const orders = [
  {
    id: "ORD-7291",
    date: "2024-03-15",
    status: "Delivered",
    total: 15800,
    items: [
      {
        id: 10,
        name: "Mysore Silk Saree",
        price: 15800,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1520013225692-fff4010c0ae6?w=500&auto=format&fit=crop&q=60"
      }
    ]
  },
  {
    id: "ORD-6593",
    date: "2024-02-28",
    status: "Processing",
    total: 4500,
    items: [
      {
        id: 8,
        name: "Madhubani Painting",
        price: 4500,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1582201943055-e0571c213adb?w=500&auto=format&fit=crop&q=60"
      }
    ]
  },
  {
    id: "ORD-5127",
    date: "2024-02-10",
    status: "Delivered",
    total: 14300,
    items: [
      {
        id: 1,
        name: "Handwoven Banarasi Saree",
        price: 12500,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1609487435804-640004a48da5?w=500&auto=format&fit=crop&q=60"
      },
      {
        id: 4,
        name: "Joynagar Moya",
        price: 550,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1610500796385-3ffc1ae2fccb?w=500&auto=format&fit=crop&q=60"
      },
      {
        id: 6,
        name: "Traditional Copper Pooja Thali",
        price: 1800,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1635321593217-004db873582e?w=500&auto=format&fit=crop&q=60"
      }
    ]
  }
];

export const defaultAddresses = [
  {
    id: 1,
    type: "Home",
    address: "123 Main Street, Apt 4B",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "USA",
    phone: "+1 234-567-8901",
    isDefault: true
  },
  {
    id: 2,
    type: "Office",
    address: "456 Business Ave, Suite 200",
    city: "New York",
    state: "NY",
    postalCode: "10002",
    country: "USA",
    phone: "+1 234-567-8902",
    isDefault: false
  }
];
