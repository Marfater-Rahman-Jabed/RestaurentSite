import { useEffect } from "react";
import ClientReview from "../../Components/ClientReview/ClientReview";
import OurMoto from "../../Components/OurMoto/OurMoto";
import PopularItems from "../../Components/PopularItems/PopularItems";
import ServicesCard from "../../Components/Services/ServicesCard";
import SliderTop from "../../Components/SliderTop/SliderTop";


const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200">
            <SliderTop></SliderTop>
            <OurMoto></OurMoto>
            <ServicesCard></ServicesCard>
            <PopularItems></PopularItems>
            <ClientReview></ClientReview>
        </div>
    );
};

export default Home;