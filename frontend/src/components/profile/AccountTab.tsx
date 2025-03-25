
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface AccountTabProps {
  userData: {
    name: string;
    email: string;
    phone: string;
  };
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  setUserData: (userData: any) => void;
}

const AccountTab = ({ userData, isEditing, setIsEditing, setUserData }: AccountTabProps) => {
  const { toast } = useToast();

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    
    // Save updated profile to localStorage
    localStorage.setItem("userData", JSON.stringify(userData));
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
        <CardDescription>
          View and update your personal information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                id="name"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                className="w-full"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Email address cannot be changed.</p>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <Input
                id="phone"
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="flex gap-4 pt-2">
              <Button type="submit" className="bg-indian-red hover:bg-indian-red/90">
                Save Changes
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
                <p>{userData.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Email Address</h4>
                <p>{userData.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Phone Number</h4>
                <p>{userData.phone}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Account Created</h4>
                <p>March 10, 2024</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AccountTab;
