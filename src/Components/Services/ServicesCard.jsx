import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import Slider from "react-slick";


function ServicesCard() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch("items.json")
            .then(res => res.json())
            .then(data => {
                setItems(data)
            })
    }, [])
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className="py-10">
            <Fade direction="down" delay={500}>
                <h2 className="text-5xl font-serif font-bold mb-6 mt-10 text-center text-fuchsia-700"> Our <span className="text-pink-700">Menu</span> </h2>
            </Fade>
            <Slider {...settings} className="">
                {
                    items.map((item, i) => <div key={i}>
                        <img src={item.logo} alt="" title={item.title} className="h-52 w-11/12 mx-auto" />
                        <h1 className="text-2xl text-center font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-700 to-pink-800">{item.title}</h1>
                    </div>)
                }
            </Slider>
        </div>
    );
}

export default ServicesCard;