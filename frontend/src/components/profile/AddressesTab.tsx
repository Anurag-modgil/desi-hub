
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface Address {
  id: number;
  type: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

interface AddressesTabProps {
  addresses: Address[];
  setAddresses: (addresses: Address[]) => void;
  setAddAddressOpen: (open: boolean) => void;
}

const AddressesTab = ({ addresses, setAddresses, setAddAddressOpen }: AddressesTabProps) => {
  const { toast } = useToast();

  const handleSetDefaultAddress = (id: number) => {
    const updatedAddresses = addresses.map(address => ({
      ...address,
      isDefault: address.id === id,
    }));
    
    setAddresses(updatedAddresses);
    localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));
    
    toast({
      title: "Default address updated",
      description: "Your default address has been updated successfully.",
    });
  };
  
  const handleEditAddress = (id: number) => {
    // In a real app, this would open an edit form
    toast({
      title: "Edit address",
      description: "Address editing would be implemented in a full application.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Addresses</CardTitle>
        <CardDescription>
          Manage your shipping and billing addresses.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div 
              key={address.id} 
              className={`border rounded-lg p-4 relative ${
                address.isDefault ? 'border-indian-red/50 bg-indian-red/5' : 'border-gray-200'
              }`}
            >
              {address.isDefault && (
                <span className="absolute top-2 right-2 text-xs bg-indian-red text-white px-2 py-0.5 rounded-full">
                  Default
                </span>
              )}
              <div className="mb-2 font-medium flex items-center gap-2">
                <span>{address.type}</span>
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p>{address.address}</p>
                <p>{address.city}, {address.state} {address.postalCode}</p>
                <p>{address.country}</p>
                <p className="pt-1">{address.phone}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEditAddress(address.id)}>
                  Edit
                </Button>
                {!address.isDefault && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSetDefaultAddress(address.id)}
                  >
                    Set as Default
                  </Button>
                )}
              </div>
            </div>
          ))}
          
          <div 
            className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center h-full min-h-[180px] cursor-pointer hover:bg-gray-50"
            onClick={() => setAddAddressOpen(true)}
          >
            <Plus className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-gray-600 mb-4">Add a new address</p>
            <Button variant="outline" onClick={() => setAddAddressOpen(true)}>
              Add Address
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressesTab;
