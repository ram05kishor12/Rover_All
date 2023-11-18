import { Button } from "@/components/ui/button"
import  Link from "next/link";

const LandingPage =  () => { 
    return (
        <div>
           Landing Page
           <div>
             <Link href= "/sign-in">
                <Button>Login In</Button>
              </Link>
                <Link href= "/sign-up">
                    <Button>Sign Up</Button>
                </Link>
           </div>
         </div>
    )
}

export default LandingPage;