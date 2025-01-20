import LandingContent from "@/components/ui/landingcontent";
import LandingHero from "@/components/ui/landinghero";
import LandingNavbar from "@/components/ui/landingnavbar";

const LandingPage = () => {
    return (
        <div className="h-full">
            <LandingNavbar/>
            <LandingHero/>
            <LandingContent/>
        </div>
    );
}

export default LandingPage;