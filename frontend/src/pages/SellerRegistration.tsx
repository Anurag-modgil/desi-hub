
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, AlertCircle, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FileUpload from "@/components/shared/FileUpload";
import { documentService, DocumentInfo } from "@/services/documentService";
import { indiaPostService } from "@/services/indiaPostService";

const SellerRegistration = () => {
  const [formStep, setFormStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pincode, setPincode] = useState("");
  const [isValidPincode, setIsValidPincode] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Document upload state
  const [userId] = useState(`user_${Math.random().toString(36).slice(2)}`); // Simulate user ID
  const [documents, setDocuments] = useState<{[key: string]: DocumentInfo[]}>({
    "business-registration": [],
    "id-proof": [],
    "gst-certificate": [],
    "product-images": [],
  });
  
  // Form state
  const [formState, setFormState] = useState({
    businessName: "",
    ownerName: "",
    contactNumber: "",
    email: "",
    state: "",
    district: "",
    address: "",
    businessType: "",
    experience: "",
    productCategory: "",
    productDescription: "",
    priceRange: "",
    currentMarkets: "",
    bankAccountName: "",
    accountNumber: "",
    bankName: "",
    ifscCode: "",
    termsAgreed: false,
    authenticityAgreed: false,
    qualityAgreed: false
  });
  
  const handleChange = (field: string, value: string | boolean) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const nextStep = () => {
    setFormStep(formStep + 1);
    // Scroll to top
    window.scrollTo(0, 0);
  };
  
  const prevStep = () => {
    setFormStep(formStep - 1);
    // Scroll to top
    window.scrollTo(0, 0);
  };
  
  const validatePincode = (value: string) => {
    // Indian pincodes are 6 digits
    const isValid = /^[1-9][0-9]{5}$/.test(value);
    setIsValidPincode(isValid);
    return isValid;
  };
  
  const handleUpload = async (documentType: string, file: File) => {
    try {
      const uploadedDoc = await documentService.uploadDocument(userId, documentType as any, file);
      
      setDocuments(prev => ({
        ...prev,
        [documentType]: [...(prev[documentType] || []), uploadedDoc]
      }));
      
      toast({
        title: "Document uploaded",
        description: "Your document has been uploaded successfully and is pending verification."
      });
      
      return uploadedDoc;
    } catch (error) {
      console.error("Error uploading document:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your document. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const handleRemoveDocument = (documentType: string, fileId: string) => {
    setDocuments(prev => ({
      ...prev,
      [documentType]: prev[documentType].filter(doc => doc.id !== fileId)
    }));
    
    toast({
      title: "Document removed",
      description: "The document has been removed successfully."
    });
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call to register seller
    setTimeout(() => {
      // Generate a tracking ID for seller verification using India Post service
      const trackingId = indiaPostService.generateTrackingId();
      
      setIsSubmitting(false);
      toast({
        title: "Application submitted successfully!",
        description: "Your seller application has been received. You can track the status using tracking ID: " + trackingId
      });
      
      // Redirect to home page after submission
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 2000);
  };
  
  // Validate form based on current step
  const isCurrentStepValid = () => {
    if (formStep === 0) {
      return (
        formState.businessName && 
        formState.ownerName && 
        formState.contactNumber && 
        formState.email && 
        formState.state && 
        formState.district && 
        formState.address && 
        formState.businessType && 
        formState.experience
      );
    } else if (formStep === 1) {
      return (
        formState.productCategory &&
        formState.productDescription &&
        formState.priceRange &&
        formState.currentMarkets
      );
    } else if (formStep === 2) {
      return (
        documents["business-registration"].length > 0 &&
        documents["id-proof"].length > 0 &&
        formState.bankAccountName &&
        formState.accountNumber &&
        formState.bankName &&
        formState.ifscCode &&
        formState.termsAgreed &&
        formState.authenticityAgreed &&
        formState.qualityAgreed
      );
    }
    return false;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-indian-gold p-6 text-gray-900">
              <h1 className="font-serif text-2xl md:text-3xl font-semibold">Seller Registration</h1>
              <p className="mt-2 opacity-80">Connect your artisanal products with the global Indian diaspora</p>
            </div>
            
            {/* Progress Steps */}
            <div className="p-6 border-b">
              <div className="flex justify-between relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
                <div className="absolute top-1/2 left-0 h-1 bg-indian-gold -translate-y-1/2 z-0" style={{ width: `${formStep * 33.333}%` }}></div>
                
                {[0, 1, 2].map((step, index) => (
                  <div key={index} className="relative z-10 flex flex-col items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        formStep >= step ? "bg-indian-gold text-gray-900" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step + 1}
                    </div>
                    <div className="text-sm mt-2 text-center">
                      {step === 0 && "Business Details"}
                      {step === 1 && "Product Information"}
                      {step === 2 && "Verification"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-8">
              {formStep === 0 && (
                <div className="space-y-6 animate-fade-up">
                  <h2 className="text-xl font-medium">Business Details</h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business/Artisan Name</Label>
                    <Input 
                      id="businessName" 
                      placeholder="Enter your business or artisan name" 
                      value={formState.businessName}
                      onChange={(e) => handleChange("businessName", e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ownerName">Owner/Artisan Full Name</Label>
                      <Input 
                        id="ownerName" 
                        placeholder="Enter owner's full name" 
                        value={formState.ownerName}
                        onChange={(e) => handleChange("ownerName", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contactNumber">Contact Number</Label>
                      <Input 
                        id="contactNumber" 
                        placeholder="+91 XXXXX XXXXX" 
                        value={formState.contactNumber}
                        onChange={(e) => handleChange("contactNumber", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Business Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.business@example.com" 
                      value={formState.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select onValueChange={(value) => handleChange("state", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="west-bengal">West Bengal</SelectItem>
                          <SelectItem value="rajasthan">Rajasthan</SelectItem>
                          <SelectItem value="gujarat">Gujarat</SelectItem>
                          <SelectItem value="maharashtra">Maharashtra</SelectItem>
                          <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="district">District</Label>
                      <Input 
                        id="district" 
                        placeholder="Enter your district" 
                        value={formState.district}
                        onChange={(e) => handleChange("district", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Full Address</Label>
                    <Textarea 
                      id="address" 
                      placeholder="Enter your complete business address" 
                      value={formState.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      className="resize-none"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input 
                        id="pincode" 
                        placeholder="Enter 6-digit pincode" 
                        value={pincode}
                        onChange={(e) => {
                          setPincode(e.target.value);
                          validatePincode(e.target.value);
                        }}
                        className={!isValidPincode && pincode ? "border-red-500" : ""}
                      />
                      {!isValidPincode && pincode && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Please enter a valid 6-digit pincode
                        </p>
                      )}
                      {isValidPincode && pincode.length === 6 && (
                        <p className="text-green-500 text-xs mt-1 flex items-center">
                          <Check className="h-3 w-3 mr-1" />
                          Pincode verified with India Post
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="businessType">Business Type</Label>
                      <Select onValueChange={(value) => handleChange("businessType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual-artisan">Individual Artisan</SelectItem>
                          <SelectItem value="artisan-group">Artisan Group/Collective</SelectItem>
                          <SelectItem value="msme">MSME</SelectItem>
                          <SelectItem value="cooperative">Cooperative Society</SelectItem>
                          <SelectItem value="ngo">NGO supporting artisans</SelectItem>
                          <SelectItem value="retailer">Retailer of Handicrafts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Select onValueChange={(value) => handleChange("experience", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select years of experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="more-than-10">More than 10 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      onClick={nextStep} 
                      className="w-full bg-indian-gold hover:bg-indian-gold/90 text-gray-900"
                      disabled={!isCurrentStepValid()}
                    >
                      Continue to Product Information
                    </Button>
                  </div>
                </div>
              )}
              
              {formStep === 1 && (
                <div className="space-y-6 animate-fade-up">
                  <h2 className="text-xl font-medium">Product Information</h2>
                  <p className="text-gray-600">
                    Tell us about your products so we can help you reach the right customers.
                  </p>
                  
                  <div className="space-y-2">
                    <Label htmlFor="productCategory">Primary Product Category</Label>
                    <Select onValueChange={(value) => handleChange("productCategory", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your main product category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="textiles">Textiles & Apparel</SelectItem>
                        <SelectItem value="handicrafts">Handicrafts</SelectItem>
                        <SelectItem value="jewelry">Jewelry & Accessories</SelectItem>
                        <SelectItem value="puja">Puja Samagri</SelectItem>
                        <SelectItem value="food">Food Products</SelectItem>
                        <SelectItem value="home-decor">Home Decor</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Specific Product Types</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {['Sarees', 'Traditional Attires', 'Terracotta', 'Wooden Crafts', 'Metal Crafts', 'Paintings', 'Pottery', 'Puja Items', 'Sweets', 'Spices', 'Leather Goods', 'Bamboo Products'].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox id={type} />
                          <label htmlFor={type} className="text-sm">{type}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="productDescription">Brief Description of Products</Label>
                    <Textarea 
                      id="productDescription" 
                      placeholder="Describe your products, their cultural significance, and any special techniques used"
                      className="min-h-[100px] resize-none"
                      value={formState.productDescription}
                      onChange={(e) => handleChange("productDescription", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priceRange">Price Range of Products</Label>
                    <Select onValueChange={(value) => handleChange("priceRange", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your typical price range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">Budget-friendly (Under ₹1,000)</SelectItem>
                        <SelectItem value="mid">Mid-range (₹1,000 - ₹5,000)</SelectItem>
                        <SelectItem value="premium">Premium (₹5,000 - ₹15,000)</SelectItem>
                        <SelectItem value="luxury">Luxury (Above ₹15,000)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <FileUpload
                      label="Product Images"
                      description="Upload images of your products to help customers understand what you sell"
                      acceptedFileTypes=".jpg,.jpeg,.png"
                      maxSize={5}
                      maxFiles={5}
                      onUpload={(file) => handleUpload("product-images", file)}
                      uploadedFiles={documents["product-images"]}
                      onRemove={(fileId) => handleRemoveDocument("product-images", fileId)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currentMarkets">Current Markets Served</Label>
                    <Select onValueChange={(value) => handleChange("currentMarkets", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Where do you currently sell your products?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Local markets only</SelectItem>
                        <SelectItem value="state">Within state</SelectItem>
                        <SelectItem value="national">National</SelectItem>
                        <SelectItem value="international">Some international presence</SelectItem>
                        <SelectItem value="none">New business/No current sales</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <Button onClick={prevStep} variant="outline" className="flex-1">
                      Back
                    </Button>
                    <Button 
                      onClick={nextStep} 
                      className="flex-1 bg-indian-gold hover:bg-indian-gold/90 text-gray-900"
                      disabled={!isCurrentStepValid()}
                    >
                      Continue to Verification
                    </Button>
                  </div>
                </div>
              )}
              
              {formStep === 2 && (
                <div className="space-y-6 animate-fade-up">
                  <h2 className="text-xl font-medium">Verification & Submission</h2>
                  <p className="text-gray-600">
                    We need a few documents to verify your business and complete your registration.
                  </p>
                  
                  <div className="space-y-4">
                    <FileUpload
                      label="Business Registration Document"
                      description="Upload your business registration, MSME certificate, or artisan card"
                      acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
                      maxSize={5}
                      maxFiles={1}
                      onUpload={(file) => handleUpload("business-registration", file)}
                      uploadedFiles={documents["business-registration"]}
                      onRemove={(fileId) => handleRemoveDocument("business-registration", fileId)}
                    />
                    
                    <FileUpload
                      label="ID Proof"
                      description="Upload a government-issued ID (Aadhaar, PAN, Voter ID)"
                      acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
                      maxSize={5}
                      maxFiles={1}
                      onUpload={(file) => handleUpload("id-proof", file)}
                      uploadedFiles={documents["id-proof"]}
                      onRemove={(fileId) => handleRemoveDocument("id-proof", fileId)}
                    />
                    
                    <FileUpload
                      label="GST Registration (if applicable)"
                      description="Upload your GST registration certificate"
                      acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
                      maxSize={5}
                      maxFiles={1}
                      onUpload={(file) => handleUpload("gst-certificate", file)}
                      uploadedFiles={documents["gst-certificate"]}
                      onRemove={(fileId) => handleRemoveDocument("gst-certificate", fileId)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bankDetails">Bank Account Information</Label>
                    <p className="text-xs text-gray-500 mb-2">
                      This information will be used for payments when your products are sold.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="accountName">Account Holder Name</Label>
                          <Input 
                            id="accountName" 
                            placeholder="Enter account holder name" 
                            value={formState.bankAccountName}
                            onChange={(e) => handleChange("bankAccountName", e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="accountNumber">Account Number</Label>
                          <Input 
                            id="accountNumber" 
                            placeholder="Enter account number" 
                            value={formState.accountNumber}
                            onChange={(e) => handleChange("accountNumber", e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="bankName">Bank Name</Label>
                          <Input 
                            id="bankName" 
                            placeholder="Enter bank name" 
                            value={formState.bankName}
                            onChange={(e) => handleChange("bankName", e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="ifscCode">IFSC Code</Label>
                          <Input 
                            id="ifscCode" 
                            placeholder="Enter IFSC code" 
                            value={formState.ifscCode}
                            onChange={(e) => handleChange("ifscCode", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <div className="flex items-start">
                      <Checkbox 
                        id="terms" 
                        className="mt-1"
                        checked={formState.termsAgreed}
                        onCheckedChange={(checked) => handleChange("termsAgreed", checked === true)}
                      />
                      <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                        I agree to the <a href="#" className="text-indian-gold hover:underline">Terms of Service</a> and <a href="#" className="text-indian-gold hover:underline">Privacy Policy</a>
                      </label>
                    </div>
                    
                    <div className="flex items-start">
                      <Checkbox 
                        id="authentic" 
                        className="mt-1"
                        checked={formState.authenticityAgreed}
                        onCheckedChange={(checked) => handleChange("authenticityAgreed", checked === true)}
                      />
                      <label htmlFor="authentic" className="ml-2 text-sm text-gray-600">
                        I confirm that all the products I will sell are authentic, handmade/handcrafted, and comply with all relevant regulations
                      </label>
                    </div>
                    
                    <div className="flex items-start">
                      <Checkbox 
                        id="quality" 
                        className="mt-1" 
                        checked={formState.qualityAgreed}
                        onCheckedChange={(checked) => handleChange("qualityAgreed", checked === true)}
                      />
                      <label htmlFor="quality" className="ml-2 text-sm text-gray-600">
                        I understand that I am responsible for the quality, packaging, and timely shipping of products via India Post
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <Button onClick={prevStep} variant="outline" className="flex-1">
                      Back
                    </Button>
                    <Button 
                      className="flex-1 bg-indian-gold hover:bg-indian-gold/90 text-gray-900"
                      disabled={!isCurrentStepValid() || isSubmitting}
                      onClick={handleSubmit}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
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

export default SellerRegistration;
