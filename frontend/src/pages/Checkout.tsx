
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Package, Truck, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const addressSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  addressLine1: z.string().min(5, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(6, "Valid postal code is required"),
  country: z.string().min(2, "Country is required"),
  phone: z.string().min(10, "Valid phone number is required"),
});

const paymentSchema = z.object({
  cardHolder: z.string().min(2, "Cardholder name is required"),
  cardNumber: z.string().min(16, "Valid card number is required"),
  expiryDate: z.string().min(5, "Valid expiry date is required"),
  cvv: z.string().min(3, "Valid CVV is required"),
  paymentMethod: z.enum(["card", "upi", "cod"]),
});

type AddressFormValues = z.infer<typeof addressSchema>;
type PaymentFormValues = z.infer<typeof paymentSchema>;

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState<"address" | "payment" | "confirmation">("address");
  const [addressDetails, setAddressDetails] = useState<AddressFormValues | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentFormValues | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const addressForm = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
      phone: "",
    },
  });

  const paymentForm = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardHolder: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      paymentMethod: "card",
    },
  });

  const handleAddressSubmit = (values: AddressFormValues) => {
    setAddressDetails(values);
    setStep("payment");
  };

  const handlePaymentSubmit = (values: PaymentFormValues) => {
    setPaymentDetails(values);
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep("confirmation");
    }, 2000);
  };

  const handlePlaceOrder = () => {
    clearCart();
    toast({
      title: "Order placed successfully!",
      description: "Thank you for shopping with Bharat Connect.",
    });
    navigate("/");
  };

  // If cart is empty, redirect to home
  if (items.length === 0 && step !== "confirmation") {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-28 pb-12 flex flex-col items-center justify-center bg-gradient-to-b from-indian-cream to-white">
          <div className="text-center max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg animate-fade-in">
            <Package className="h-16 w-16 text-indian-red mx-auto mb-4" />
            <h2 className="text-2xl font-bold font-serif mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">There are no items in your cart to checkout.</p>
            <Button 
              onClick={() => navigate("/products")} 
              className="bg-indian-red hover:bg-indian-red/90 text-white"
            >
              Explore Products
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen pt-28 pb-12 bg-gradient-to-b from-indian-cream to-white">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Checkout Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className={`flex items-center ${step === "address" ? "text-indian-red" : "text-gray-400"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step === "address" ? "bg-indian-red text-white" : "bg-gray-200 text-gray-500"}`}>
                  1
                </div>
                <span className="font-medium">Address</span>
              </div>
              <div className="w-16 h-[2px] mx-2 bg-gray-200"></div>
              <div className={`flex items-center ${step === "payment" ? "text-indian-red" : "text-gray-400"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step === "payment" ? "bg-indian-red text-white" : "bg-gray-200 text-gray-500"}`}>
                  2
                </div>
                <span className="font-medium">Payment</span>
              </div>
              <div className="w-16 h-[2px] mx-2 bg-gray-200"></div>
              <div className={`flex items-center ${step === "confirmation" ? "text-indian-red" : "text-gray-400"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step === "confirmation" ? "bg-indian-red text-white" : "bg-gray-200 text-gray-500"}`}>
                  3
                </div>
                <span className="font-medium">Confirmation</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {step === "address" && (
                <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in">
                  <h2 className="text-2xl font-bold font-serif mb-6">Shipping Address</h2>
                  <Form {...addressForm}>
                    <form onSubmit={addressForm.handleSubmit(handleAddressSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={addressForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={addressForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+91 98765 43210" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={addressForm.control}
                        name="addressLine1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address Line 1</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main Street" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={addressForm.control}
                        name="addressLine2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address Line 2 (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Apartment, suite, unit, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={addressForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="Mumbai" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={addressForm.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input placeholder="Maharashtra" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={addressForm.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal Code</FormLabel>
                              <FormControl>
                                <Input placeholder="400001" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={addressForm.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input placeholder="India" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="pt-4 flex justify-end">
                        <Button
                          type="submit"
                          className="bg-indian-red hover:bg-indian-red/90 text-white"
                        >
                          Continue to Payment
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              )}

              {step === "payment" && (
                <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in">
                  <h2 className="text-2xl font-bold font-serif mb-6">Payment Method</h2>
                  <Form {...paymentForm}>
                    <form onSubmit={paymentForm.handleSubmit(handlePaymentSubmit)} className="space-y-6">
                      <FormField
                        control={paymentForm.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                              >
                                <div className={`relative flex flex-col items-center rounded-lg border-2 p-4 cursor-pointer transition-all ${field.value === 'card' ? 'border-indian-red bg-indian-red/5' : 'border-gray-200'}`}>
                                  <RadioGroupItem
                                    value="card"
                                    id="payment-card"
                                    className="sr-only"
                                  />
                                  <CreditCard className="h-8 w-8 mb-2" />
                                  <label
                                    htmlFor="payment-card"
                                    className="font-medium cursor-pointer"
                                  >
                                    Credit Card
                                  </label>
                                </div>
                                <div className={`relative flex flex-col items-center rounded-lg border-2 p-4 cursor-pointer transition-all ${field.value === 'upi' ? 'border-indian-red bg-indian-red/5' : 'border-gray-200'}`}>
                                  <RadioGroupItem
                                    value="upi"
                                    id="payment-upi"
                                    className="sr-only"
                                  />
                                  <svg className="h-8 w-8 mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 0C5.37 0 0 5.37 0 12C0 18.63 5.37 24 12 24C18.63 24 24 18.63 24 12C24 5.37 18.63 0 12 0ZM18.58 14.58L11.31 19.31C10.82 19.62 10.18 19.16 10.33 18.59L11.88 12.92L7.42 10.58C6.91 10.31 7.03 9.54 7.61 9.43L16.89 7.59C17.38 7.5 17.79 7.97 17.63 8.46L15.42 14.47C15.38 14.61 15.47 14.76 15.61 14.79L18.24 15.25C18.73 15.34 18.91 15.93 18.58 16.29V14.58Z" fill="currentColor"/>
                                  </svg>
                                  <label
                                    htmlFor="payment-upi"
                                    className="font-medium cursor-pointer"
                                  >
                                    UPI Payment
                                  </label>
                                </div>
                                <div className={`relative flex flex-col items-center rounded-lg border-2 p-4 cursor-pointer transition-all ${field.value === 'cod' ? 'border-indian-red bg-indian-red/5' : 'border-gray-200'}`}>
                                  <RadioGroupItem
                                    value="cod"
                                    id="payment-cod"
                                    className="sr-only"
                                  />
                                  <Truck className="h-8 w-8 mb-2" />
                                  <label
                                    htmlFor="payment-cod"
                                    className="font-medium cursor-pointer"
                                  >
                                    Cash on Delivery
                                  </label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Card payment details */}
                      {paymentForm.watch("paymentMethod") === "card" && (
                        <div className="space-y-4 animate-fade-in">
                          <FormField
                            control={paymentForm.control}
                            name="cardHolder"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Cardholder Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={paymentForm.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="1234 5678 9012 3456" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={paymentForm.control}
                              name="expiryDate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Expiry Date</FormLabel>
                                  <FormControl>
                                    <Input placeholder="MM/YY" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={paymentForm.control}
                              name="cvv"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>CVV</FormLabel>
                                  <FormControl>
                                    <Input type="password" placeholder="123" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}

                      {/* UPI Payment */}
                      {paymentForm.watch("paymentMethod") === "upi" && (
                        <div className="p-6 border rounded-lg bg-gray-50 animate-fade-in">
                          <div className="text-center">
                            <p className="mb-4">Enter your UPI ID to continue payment</p>
                            <Input 
                              placeholder="yourname@upi"
                              className="max-w-xs mx-auto mb-2"
                            />
                            <p className="text-sm text-gray-500">You will receive a payment request on your UPI app</p>
                          </div>
                        </div>
                      )}

                      {/* Cash on Delivery */}
                      {paymentForm.watch("paymentMethod") === "cod" && (
                        <div className="p-6 border rounded-lg bg-gray-50 animate-fade-in">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                              <Check className="h-5 w-5 text-green-500" />
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-700">Pay with cash upon delivery. India Post will verify cash when delivered.</p>
                              <p className="text-sm text-gray-500 mt-1">Please keep exact amount ready for a smooth delivery experience.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="pt-4 flex justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          className="border-indian-red text-indian-red hover:bg-indian-red/5"
                          onClick={() => setStep("address")}
                        >
                          Back to Address
                        </Button>
                        <Button
                          type="submit"
                          className="bg-indian-red hover:bg-indian-red/90 text-white"
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Processing...
                            </div>
                          ) : (
                            "Place Order"
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              )}

              {step === "confirmation" && (
                <div className="bg-white p-8 rounded-xl shadow-lg text-center animate-fade-in">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold font-serif mb-4">Order Confirmed</h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for your order! Your items will be shipped soon.
                  </p>
                  <div className="mb-8 p-4 bg-gray-50 rounded-lg max-w-md mx-auto">
                    <p className="text-sm font-medium text-gray-600 mb-1">Order Number</p>
                    <p className="text-xl font-semibold">#IND{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</p>
                  </div>
                  <Button
                    onClick={handlePlaceOrder}
                    className="bg-indian-red hover:bg-indian-red/90 text-white"
                  >
                    Return to Homepage
                  </Button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            {step !== "confirmation" && (
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-lg sticky top-28">
                  <h3 className="text-xl font-bold font-serif mb-4">Order Summary</h3>
                  <div className="max-h-80 overflow-y-auto mb-4 space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium truncate">{item.name}</h4>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>₹{(totalPrice > 1000 ? 0 : 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span>₹{(totalPrice * 0.18).toFixed(2)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>₹{(totalPrice + (totalPrice > 1000 ? 0 : 100) + (totalPrice * 0.18)).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {addressDetails && step === "payment" && (
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-medium mb-2">Shipping Address</h4>
                      <p className="text-sm text-gray-600">
                        {addressDetails.fullName}<br />
                        {addressDetails.addressLine1}<br />
                        {addressDetails.addressLine2 && <>{addressDetails.addressLine2}<br /></>}
                        {addressDetails.city}, {addressDetails.state} {addressDetails.postalCode}<br />
                        {addressDetails.country}<br />
                        Phone: {addressDetails.phone}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
