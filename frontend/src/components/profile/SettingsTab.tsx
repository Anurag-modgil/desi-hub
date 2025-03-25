
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface NotificationSettings {
  orderUpdates: boolean;
  promotionalEmails: boolean;
  newsletter: boolean;
}

interface SettingsTabProps {
  notificationSettings: NotificationSettings;
  setNotificationSettings: (settings: NotificationSettings) => void;
  setChangePasswordOpen: (open: boolean) => void;
  handleDeleteAccount: () => void;
}

const SettingsTab = ({ 
  notificationSettings, 
  setNotificationSettings, 
  setChangePasswordOpen, 
  handleDeleteAccount 
}: SettingsTabProps) => {
  const { toast } = useToast();

  const handleSaveSettings = () => {
    // Save notification settings to localStorage
    localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings));
    
    toast({
      title: "Settings saved",
      description: "Your notification preferences have been updated successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Manage your account preferences and settings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-lg mb-4">Notification Preferences</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Order Updates</p>
                  <p className="text-sm text-gray-500">Receive updates about your orders</p>
                </div>
                <div className="flex items-center h-6">
                  <input
                    id="order-updates"
                    type="checkbox"
                    checked={notificationSettings.orderUpdates}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      orderUpdates: e.target.checked
                    })}
                    className="rounded border-gray-300 text-indian-red focus:ring-indian-red"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Promotional Emails</p>
                  <p className="text-sm text-gray-500">Receive emails about new products and offers</p>
                </div>
                <div className="flex items-center h-6">
                  <input
                    id="promotional-emails"
                    type="checkbox"
                    checked={notificationSettings.promotionalEmails}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      promotionalEmails: e.target.checked
                    })}
                    className="rounded border-gray-300 text-indian-red focus:ring-indian-red"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Newsletter</p>
                  <p className="text-sm text-gray-500">Receive our weekly newsletter</p>
                </div>
                <div className="flex items-center h-6">
                  <input
                    id="newsletter"
                    type="checkbox"
                    checked={notificationSettings.newsletter}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      newsletter: e.target.checked
                    })}
                    className="rounded border-gray-300 text-indian-red focus:ring-indian-red"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-100">
            <h3 className="font-medium text-lg mb-4">Account Security</h3>
            <Button 
              variant="outline" 
              className="mb-4"
              onClick={() => setChangePasswordOpen(true)}
            >
              Change Password
            </Button>
            <p className="text-sm text-gray-500">
              Last password change: Never
            </p>
          </div>
          
          <div className="pt-4 border-t border-gray-100">
            <h3 className="font-medium text-lg text-red-600 mb-2">Danger Zone</h3>
            <p className="text-sm text-gray-500 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button 
              variant="outline" 
              className="text-red-600 border-red-200 hover:bg-red-50"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          className="bg-indian-red hover:bg-indian-red/90"
          onClick={handleSaveSettings}
        >
          Save Settings
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SettingsTab;
