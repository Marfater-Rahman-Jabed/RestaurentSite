import { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Logo1 from "../../assets/TopSlider/First Logo.jpeg"
import Logo2 from "../../assets/TopSlider/Fizza.jpeg"
import Logo3 from "../../assets/TopSlider/Burger.jpeg"
import Logo4 from "../../assets/TopSlider/HotDog.jpeg"
import Logo5 from "../../assets/TopSlider/Coffee.jpeg"
export default class pauseOnHover extends Component {
    render() {
        const arr = [Logo1, Logo2, Logo3, Logo4, Logo5]
        var settings = {
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            pauseOnHover: true,

        };
        return (


            <Slider {...settings} className="w-full  bg-cover">
                {
                    arr.map((arry, i) => <div key={i}>
                        <img src={arry} alt="" className="w-full lg:h-[75vh] md:h-72 h-64 " />
                    </div>)
                }

            </Slider>

        );
    }
}
