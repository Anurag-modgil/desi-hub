
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface AddAddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddAddress: (address: any) => void;
}

const AddAddressDialog = ({ open, onOpenChange, onAddAddress }: AddAddressDialogProps) => {
  const { toast } = useToast();
  const [addressType, setAddressType] = useState("Home");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("USA");
  const [phone, setPhone] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!address || !city || !state || !postalCode || !phone) {
      toast({
        title: "Incomplete information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newAddress = {
      id: Date.now(),
      type: addressType,
      address,
      city,
      state,
      postalCode,
      country,
      phone,
      isDefault
    };

    onAddAddress(newAddress);
    
    toast({
      title: "Address added",
      description: "Your new address has been added successfully",
    });

    // Reset form and close dialog
    setAddressType("Home");
    setAddress("");
    setCity("");
    setState("");
    setPostalCode("");
    setCountry("USA");
    setPhone("");
    setIsDefault(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
          <DialogDescription>
            Add a new shipping or billing address to your account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="address-type">Address Type</Label>
              <Select value={addressType} onValueChange={setAddressType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Home">Home</SelectItem>
                  <SelectItem value="Office">Office</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input 
                id="address" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St, Apt 4B"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="New York"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input 
                  id="state" 
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="NY"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postal-code">Postal Code</Label>
                <Input 
                  id="postal-code" 
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="10001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input 
                  id="country" 
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="USA"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (123) 456-7890"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="default-address"
                className="rounded border-gray-300 text-indian-red focus:ring-indian-red"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
              />
              <label htmlFor="default-address" className="text-sm">Set as default address</label>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-indian-red hover:bg-indian-red/90">Add Address</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressDialog;
