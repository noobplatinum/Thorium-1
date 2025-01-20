import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const User_Avatar = () => {
    const { user } = useUser();

    return (
        <Avatar className="h-8 w-8">
            <AvatarFallback>{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</AvatarFallback>
        </Avatar>
    );
};

export default User_Avatar;