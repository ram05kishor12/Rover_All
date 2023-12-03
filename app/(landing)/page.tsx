import LandingHero from '@/components/landinghero';
import {LandingNavBar} from '@/components/landingnavbar';
import LandingContent  from '@/components/landingcontent';

const LandingPage =  () => { 
    return (
      <div className="h-full">
         <LandingNavBar />
         <LandingHero />
         <LandingContent />
      </div>
    )
}

export default LandingPage;