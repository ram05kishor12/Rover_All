import Image from "next/image";
import icon from "@/public/empty.png";

interface EmptyProps {
    label : string; 
}

export const Empty =({
  label
} : EmptyProps) => {
   return(
    <div className="h-full p-5 flex flex-col justify-center items-center mt-1 scroll-m-0"> 
        <div className="relative h-72 w-72  mb-3">
            <Image  
               alt ="Empty"
               layout="fill"
               src={ icon }
            />
        </div>
        <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
    )
}