import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";

import { CiCircleMinus } from "react-icons/ci";
// import { useForm } from "react-hook-form";
import { BsPlusCircle } from "react-icons/bs";
import { toast } from "react-hot-toast";
import useAdmin from "../../Hooks/useAdmin";
import { useContext } from "react";
import { AuthContexts } from "../../Contexts/Contexts";




const SliderTop = () => {

    const imageKey = import.meta.env.VITE_imagekey;
    const { user } = useContext(AuthContexts)
    const [Admin] = useAdmin(user?.email)
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
                            console.log(result);
                            toast.success('Successfully Added')

                            refetch()
                        })
                }
            })


    }

    const handleDelete = (id) => {
        console.log(id)
        // alert()
        console.log(arr.length)
        const sure = window.confirm('Do you want to Delete This Banner ?');
        // console.log(sure)


        if (sure && arr.length > 1) {
            fetch(`http://localhost:5000/banner/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(result => {
                    console.log(result);
                    toast.success('Successfully Deleted Item')
                    refetch()
                })
        }
        else {
            toast.error('You Must keep one items Banner')
        }

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
                        {
                            Admin && <div className="flex justify-end">
                                <button onClick={() => handleDelete(arry._id)} className="btn" title="Delete Banner"><CiCircleMinus className="text-xl"></CiCircleMinus></button>

                            </div>
                        }
                    </div>)
                }

            </Slider>
            {
                Admin && <form className="flex justify-end">
                    <input type="file" name="photo" id="takephoto" className="invisible" onChange={handleImage} />
                    <label htmlFor="takephoto" className="btn mt-1" title="ADD Banner"  ><BsPlusCircle className="text-xl"></BsPlusCircle></label>
                </form>
            }
        </div>

    );
};

export default SliderTop;