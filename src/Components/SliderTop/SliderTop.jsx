import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";

import { CiCircleMinus } from "react-icons/ci";
// import { useForm } from "react-hook-form";
import { BsPlusCircle } from "react-icons/bs";




const SliderTop = () => {

    const imageKey = import.meta.env.VITE_imagekey

    const { data: arr = [], refetch } = useQuery({
        queryKey: ['arr'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/allBanner`)
            const data = res.json()
            return data
        }
    })
    const handleImage = (e) => {
        e.preventDefault()
        const image = e.target.files[0]
        console.log(image)
        const formData = new FormData();
        formData.append('image', image);
        fetch(`https://api.imgbb.com/1/upload?key=${imageKey}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(image => {
                console.log(image)
                if (image.success) {
                    const imageHolder = {
                        img: image.data.url
                    }

                    fetch(`http://localhost:5000/AddBanner`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(imageHolder)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result)
                            refetch()
                        })
                }
            })


    }

    const handleDelete = (id) => {
        console.log(id)
        fetch(`http://localhost:5000/banner/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                refetch()
            })
    }

    // const handleAdd = () => {
    //     console.log("added file")
    // }
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


        <div>
            <Slider {...settings} className="w-full  bg-cover">
                {
                    arr.map((arry, i) => <div key={i}>
                        <img src={arry.img} alt="" className="w-full lg:h-[75vh] md:h-72 h-64 " />
                        <div className="flex justify-end">
                            <button onClick={() => handleDelete(arry._id)} className="btn" title="Delete Banner"><CiCircleMinus className="text-xl"></CiCircleMinus></button>

                        </div>
                    </div>)
                }

            </Slider>
            <form className="flex justify-end">
                <input type="file" name="photo" id="takephoto" className="invisible" onChange={handleImage} />
                <label htmlFor="takephoto" className="btn mt-1" title="ADD Banner"  ><BsPlusCircle className="text-xl"></BsPlusCircle></label>
            </form>
        </div>

    );
};

export default SliderTop;