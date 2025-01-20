import Heading from "@/components/ui/heading";
import { SubscriptionButton } from "@/components/ui/subscription-button";
import { checkSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";

const SettingsPage = async () => {
    const isPro = await checkSubscription();
    return ( 
        <div>
            <Heading
            title = "Settings"
            description="Manage account settings."
            icon={Settings}
            iconColor="text-gray-600"
            bgcolor="text-gray-600/10"/>
            <div className="px-4 lg:px-8 space-y-4">
                <div className="text-muted-foreground text-sm">
                    {isPro ? "Currently on Thorium-1X" : "Currently on Thorium-1"}
                </div>
                <SubscriptionButton isPro={isPro}/>
            </div>
        </div>
     );
}
 
export default SettingsPage;