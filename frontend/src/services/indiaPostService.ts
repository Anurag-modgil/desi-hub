
// This is a simulated India Post API service

export interface ShippingRate {
  id: string;
  service: string;
  deliveryTime: string;
  rate: number;
}

export interface TrackingInfo {
  trackingId: string;
  status: string;
  location: string;
  timestamp: string;
  estimatedDelivery: string;
}

// Simulated shipping rates by pincode ranges
const getShippingRatesByPincode = (fromPincode: string, toPincode: string, weight: number): ShippingRate[] => {
  // This is a mock implementation that would connect to India Post API in production
  return [
    {
      id: "speed-post",
      service: "Speed Post",
      deliveryTime: "1-2 business days",
      rate: Math.round(weight * 80) + (Math.abs(parseInt(fromPincode) - parseInt(toPincode)) % 400),
    },
    {
      id: "registered-post",
      service: "Registered Post",
      deliveryTime: "2-4 business days",
      rate: Math.round(weight * 60) + (Math.abs(parseInt(fromPincode) - parseInt(toPincode)) % 300),
    },
    {
      id: "parcel-post",
      service: "Parcel Post",
      deliveryTime: "3-7 business days",
      rate: Math.round(weight * 40) + (Math.abs(parseInt(fromPincode) - parseInt(toPincode)) % 200),
    },
  ];
};

// Generate a simulated tracking ID in the format used by India Post
const generateTrackingId = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'IP';
  for (let i = 0; i < 11; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result + 'IN';
};

// Simulate creating a shipping label
const createShippingLabel = (
  fromAddress: any,
  toAddress: any,
  weight: number,
  serviceType: string
): { trackingId: string; labelUrl: string; rate: number } => {
  // This would connect to the India Post API in production
  return {
    trackingId: generateTrackingId(),
    labelUrl: "https://example.com/shipping-label.pdf", // This would be a real URL in production
    rate: Math.round(weight * 60) + Math.floor(Math.random() * 200),
  };
};

// Simulate tracking a package
const trackPackage = (trackingId: string): TrackingInfo => {
  // This would connect to the India Post API in production
  const statuses = [
    "Shipment information received",
    "Picked up",
    "In transit",
    "Out for delivery",
    "Delivered",
  ];
  
  const cities = [
    "Mumbai",
    "Delhi",
    "Kolkata",
    "Chennai",
    "Bengaluru",
    "Hyderabad",
    "Ahmedabad",
    "Jaipur",
  ];
  
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  
  const now = new Date();
  const randomPastDate = new Date(now.getTime() - Math.random() * 5 * 24 * 60 * 60 * 1000);
  const randomFutureDate = new Date(now.getTime() + Math.random() * 10 * 24 * 60 * 60 * 1000);
  
  return {
    trackingId,
    status: randomStatus,
    location: randomCity,
    timestamp: randomPastDate.toISOString(),
    estimatedDelivery: randomFutureDate.toISOString().split('T')[0],
  };
};

export const indiaPostService = {
  getShippingRatesByPincode,
  createShippingLabel,
  trackPackage,
  generateTrackingId,
};
