import Image from "next/image";
import emptyimg from "@/public/empty.png";

interface EmptyProps {
    label: string;
}

export const Empty = ({
    label
}: EmptyProps) => {
    return ( 
        <div className="h-full p-20 flex flex-col items-center justify-center">
            <div className="relative h-72 w-72">
                <Image
                alt="Empty" fill src={emptyimg}/>
            </div>
            <p className="text-muted-foreground text-sm text-center">
                {label}
            </p>
        </div>
     );
}
 
export default Empty;