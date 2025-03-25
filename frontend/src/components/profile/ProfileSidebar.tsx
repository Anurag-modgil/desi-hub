
import { Edit2, LogOut, UserCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileSidebarProps {
  userData: {
    name: string;
    email: string;
  };
  setIsEditing: (value: boolean) => void;
  handleLogout: () => void;
}

const ProfileSidebar = ({ userData, setIsEditing, handleLogout }: ProfileSidebarProps) => {
  return (
    <div className="flex-shrink-0 w-full md:w-56 lg:w-64">
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 text-center">
        <Avatar className="w-24 h-24 bg-gradient-to-r from-indian-red to-indian-gold mx-auto mb-4">
          <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=B93C3C&color=fff&size=128`} alt={userData.name} />
          <AvatarFallback className="text-3xl font-bold text-white">
            {userData.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        
        <h2 className="font-serif text-xl font-semibold mb-1">{userData.name}</h2>
        <p className="text-gray-500 text-sm mb-4">{userData.email}</p>
        
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => setIsEditing(true)}
          >
            <Edit2 className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
          
          <Button
            variant="ghost"
            className="w-full text-red-500 hover:text-red-700 hover:bg-red-50 justify-start"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
