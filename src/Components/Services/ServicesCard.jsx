
import { Fade } from "react-awesome-reveal";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Slider from "react-slick";


function ServicesCard() {

    const { data: dataItem = [] } = useQuery({
        queryKey: ['dataItem'],
        queryFn: async () => {
            const res = await fetch(`https://resturent-manager-server.vercel.app/allItem`)
            const data = res.json()
            return data
        }
    })

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
            <Fade direction="down" >
                <h2 className="text-5xl font-serif font-bold mb-6 mt-10 text-center text-fuchsia-700"> Our <span className="text-pink-700">Menu</span> </h2>
            </Fade>
            <Slider {...settings} className="">
                {
                    dataItem.map((item, i) => <Link key={i} to={`/allItem/${item._id}`} >
                        <div >
                            <img src={item.logo} alt="" title={item.title} className="h-52 w-11/12 mx-auto" />
                            <h1 className="text-2xl text-center font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-700 to-pink-800">{item.title}</h1>
                        </div>
                    </Link>)
                }
            </Slider>
        </div >
    );
}

export default ServicesCard;