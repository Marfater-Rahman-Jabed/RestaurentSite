import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import Slider from "react-slick";
import ClientReviewCard from "./ClientReviewCard";


function ClientReview() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch("clientReview.json")
            .then(res => res.json())
            .then(data => {
                setItems(data)
            })
    }, [])
    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 2,
        swipeToSlide: true,

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
        <div className="py-10" >
            <Fade direction="down" delay={500}>
                <h2 className="text-5xl font-serif font-bold mb-6 mt-10 text-center text-fuchsia-700"> Client <span className="text-pink-700">Says</span> </h2>
            </Fade>
            <Slider {...settings} className="lg:mx-12 md:mx-14 mx-14">
                {
                    items.map((item, i) => <ClientReviewCard key={i} item={item}></ClientReviewCard>)
                }
            </Slider>
        </div >
    );
}

export default ClientReview;