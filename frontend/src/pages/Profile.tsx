
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Package, CreditCard, Settings } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import ChangePasswordDialog from "@/components/profile/ChangePasswordDialog";
import AddAddressDialog from "@/components/profile/AddAddressDialog";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import AccountTab from "@/components/profile/AccountTab";
import OrdersTab from "@/components/profile/OrdersTab";
import AddressesTab from "@/components/profile/AddressesTab";
import SettingsTab from "@/components/profile/SettingsTab";
import { orders as mockOrders, defaultAddresses } from "@/data/profileData";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  
  const [addresses, setAddresses] = useState(defaultAddresses);
  
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotionalEmails: true,
    newsletter: false
  });
  
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [addAddressOpen, setAddAddressOpen] = useState(false);
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/sign-in");
      return;
    }
    
    const userEmail = localStorage.getItem("userEmail") || "";
    setUserData({
      name: userEmail.split("@")[0].replace(/\./g, " ").replace(/^./, str => str.toUpperCase()),
      email: userEmail,
      phone: "+1 234-567-8900"
    });
    
    // Load addresses from localStorage if available
    const savedAddresses = localStorage.getItem("userAddresses");
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    }
    
    // Load settings from localStorage if available
    const savedSettings = localStorage.getItem("notificationSettings");
    if (savedSettings) {
      setNotificationSettings(JSON.parse(savedSettings));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    navigate("/");
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };
  
  const handleAddAddress = (newAddress: any) => {
    // If the new address is set as default, update other addresses
    const updatedAddresses = newAddress.isDefault
      ? addresses.map(addr => ({
          ...addr,
          isDefault: false,
        }))
      : [...addresses];
    
    // Add the new address
    const finalAddresses = [...updatedAddresses, newAddress];
    setAddresses(finalAddresses);
    
    // Save to localStorage
    localStorage.setItem("userAddresses", JSON.stringify(finalAddresses));
  };
  
  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    
    if (confirmed) {
      // In a real app, this would call an API to delete the user's account
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userData");
      localStorage.removeItem("userAddresses");
      localStorage.removeItem("notificationSettings");
      
      navigate("/");
      
      toast({
        title: "Account deleted",
        description: "Your account has been successfully deleted.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>My Profile | Bharat Connect</title>
      </Helmet>
      <Header />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-start gap-8 mb-10">
              <ProfileSidebar 
                userData={userData} 
                setIsEditing={setIsEditing} 
                handleLogout={handleLogout} 
              />
              
              <div className="flex-1">
                <Tabs defaultValue="account">
                  <TabsList className="mb-6">
                    <TabsTrigger value="account" className="flex items-center gap-2">
                      <User size={16} />
                      <span className="hidden sm:inline">Account</span>
                    </TabsTrigger>
                    <TabsTrigger value="orders" className="flex items-center gap-2">
                      <Package size={16} />
                      <span className="hidden sm:inline">Orders</span>
                    </TabsTrigger>
                    <TabsTrigger value="addresses" className="flex items-center gap-2">
                      <CreditCard size={16} />
                      <span className="hidden sm:inline">Addresses</span>
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="flex items-center gap-2">
                      <Settings size={16} />
                      <span className="hidden sm:inline">Settings</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="account">
                    <AccountTab 
                      userData={userData} 
                      isEditing={isEditing} 
                      setIsEditing={setIsEditing} 
                      setUserData={setUserData} 
                    />
                  </TabsContent>
                  
                  <TabsContent value="orders">
                    <OrdersTab orders={mockOrders} />
                  </TabsContent>
                  
                  <TabsContent value="addresses">
                    <AddressesTab 
                      addresses={addresses} 
                      setAddresses={setAddresses} 
                      setAddAddressOpen={setAddAddressOpen} 
                    />
                  </TabsContent>
                  
                  <TabsContent value="settings">
                    <SettingsTab 
                      notificationSettings={notificationSettings} 
                      setNotificationSettings={setNotificationSettings} 
                      setChangePasswordOpen={setChangePasswordOpen} 
                      handleDeleteAccount={handleDeleteAccount} 
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
      
      {/* Dialogs */}
      <ChangePasswordDialog
        open={changePasswordOpen}
        onOpenChange={setChangePasswordOpen}
      />
      
      <AddAddressDialog
        open={addAddressOpen}
        onOpenChange={setAddAddressOpen}
        onAddAddress={handleAddAddress}
      />
    </>
  );
};

export default Profile;
