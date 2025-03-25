
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const BuyerRegistration = () => {
  const [formStep, setFormStep] = useState(0);
  
  const nextStep = () => {
    setFormStep(formStep + 1);
  };
  
  const prevStep = () => {
    setFormStep(formStep - 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-indian-red p-6 text-white">
              <h1 className="font-serif text-2xl md:text-3xl font-semibold">Buyer Registration</h1>
              <p className="mt-2 opacity-90">Join our global community of Indian diaspora</p>
            </div>
            
            {/* Progress Steps */}
            <div className="p-6 border-b">
              <div className="flex justify-between relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
                <div className="absolute top-1/2 left-0 h-1 bg-indian-red -translate-y-1/2 z-0" style={{ width: `${formStep * 50}%` }}></div>
                
                {[0, 1, 2].map((step, index) => (
                  <div key={index} className="relative z-10 flex flex-col items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        formStep >= step ? "bg-indian-red text-white" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step + 1}
                    </div>
                    <div className="text-sm mt-2">
                      {step === 0 && "Personal Info"}
                      {step === 1 && "Preferences"}
                      {step === 2 && "Review"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-8">
              {formStep === 0 && (
                <div className="space-y-6 animate-fade-up">
                  <h2 className="text-xl font-medium">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter your first name" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter your last name" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Create a secure password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country of Residence</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="sg">Singapore</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="pt-4">
                    <Button onClick={nextStep} className="w-full bg-indian-red hover:bg-indian-red/90">
                      Continue to Preferences
                    </Button>
                  </div>
                </div>
              )}
              
              {formStep === 1 && (
                <div className="space-y-6 animate-fade-up">
                  <h2 className="text-xl font-medium">Your Preferences</h2>
                  <p className="text-gray-600">
                    Help us understand what products you're interested in to personalize your experience.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Product Categories of Interest</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {['Traditional Attires', 'Handicrafts', 'Puja Samagri', 'Regional Foods', 'Home Decor', 'Jewelry', 'Books & Media', 'Health & Wellness'].map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox id={category} />
                            <label htmlFor={category} className="text-sm">{category}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Regions of Interest</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {['North India', 'South India', 'East India', 'West India', 'Central India', 'Northeast India'].map((region) => (
                          <div key={region} className="flex items-center space-x-2">
                            <Checkbox id={region} />
                            <label htmlFor={region} className="text-sm">{region}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="budget">Typical Budget Range</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your typical budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="budget">Budget-friendly (Under ₹2,000)</SelectItem>
                          <SelectItem value="mid">Mid-range (₹2,000 - ₹5,000)</SelectItem>
                          <SelectItem value="premium">Premium (₹5,000 - ₹15,000)</SelectItem>
                          <SelectItem value="luxury">Luxury (Above ₹15,000)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="occasions">Shopping Occasions</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="When do you typically shop?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="festivals">Indian Festivals</SelectItem>
                          <SelectItem value="personal">Personal Events (Birthdays, Anniversaries)</SelectItem>
                          <SelectItem value="weddings">Weddings & Ceremonies</SelectItem>
                          <SelectItem value="gifts">Gifts</SelectItem>
                          <SelectItem value="regular">Regular Use</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <Button onClick={prevStep} variant="outline" className="flex-1">
                      Back
                    </Button>
                    <Button onClick={nextStep} className="flex-1 bg-indian-red hover:bg-indian-red/90">
                      Continue to Review
                    </Button>
                  </div>
                </div>
              )}
              
              {formStep === 2 && (
                <div className="space-y-6 animate-fade-up">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-green-100 mx-auto flex items-center justify-center mb-4">
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-serif font-semibold">Almost Done!</h2>
                    <p className="text-gray-600 mt-1">Please review your information before submitting</p>
                  </div>
                  
                  <div className="space-y-4 border rounded-lg p-5 bg-gray-50">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm text-gray-500">Name</h3>
                        <p className="font-medium">John Doe</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-500">Email</h3>
                        <p className="font-medium">john.doe@example.com</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-500">Country</h3>
                        <p className="font-medium">United States</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-500">Budget Range</h3>
                        <p className="font-medium">Mid-range (₹2,000 - ₹5,000)</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm text-gray-500">Categories of Interest</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">Traditional Attires</span>
                        <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">Handicrafts</span>
                        <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">Puja Samagri</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm text-gray-500">Regions of Interest</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">North India</span>
                        <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">West India</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start pt-2">
                    <Checkbox id="terms" className="mt-1" />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                      I agree to the <a href="#" className="text-indian-red hover:underline">Terms of Service</a> and <a href="#" className="text-indian-red hover:underline">Privacy Policy</a>
                    </label>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <Button onClick={prevStep} variant="outline" className="flex-1">
                      Back
                    </Button>
                    <Button className="flex-1 bg-indian-red hover:bg-indian-red/90">
                      Complete Registration
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BuyerRegistration;
