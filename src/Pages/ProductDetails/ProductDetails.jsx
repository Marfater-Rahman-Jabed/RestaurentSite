
import { useLocation, useNavigate } from "react-router-dom";
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useEffect } from "react";

const ProductDetails = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    const location = useLocation();
    const navigete = useNavigate()
    const { item } = location.state;
    console.log(item)
    return (
        <div className="">
            <div className="card lg:card-side bg-base-100 shadow-xl py-6 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200   rounded-none">

                <PhotoProvider>
                    <PhotoView src={item.picture} className="w-[40vw] ">
                        <img src={item.picture} alt="" className="lg:w-[40vw] lg:h-[90vh] print:h-80" />
                    </PhotoView>
                </PhotoProvider>
                <div className="card-body lg:w-[60vw] border-2">
                    <div className="flex justify-between">
                        <div>
                            <h2 className="card-title text-fuchsia-700 font-bold">Name : {item.name}</h2>
                            <h1 className="card-title text-red-700 font-bold animate-pulse">Price: $ {item.price}</h1>
                        </div>
                        <div>
                            <button className="btn btn-primary btn-xs text-center print:hidden" onClick={() => { window.print() }}>print</button>

                        </div>
                    </div>
                    <h1 className="font-bold text-fuchsia-700 text-2xl text-center mt-4">Making Process <span className="text-pink-700">of {item.name}</span> : </h1>

                    <p ><span className="font-bold text-fuchsia-700 text-xl">Necessary Equepment</span> : <br /><span><i className="font-serif">{item.equpment}</i ></span></p>

                    <p><span className="font-bold text-fuchsia-700 text-xl">Making Process</span> : <br /> <span><b className="font-semibold">{item.process}</b ></span></p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary print:hidden" onClick={() => navigete(-1)}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

{/* <div>
                <div>

                    <img src={item.picture} alt="" />
                </div>
                <div>
                    <h1>Item Name: <span>{item.name}</span></h1>
                    <h1>Item Price: <span>{item.price}</span></h1>
                </div>
            </div>
            <div>
                <h1>Necessary Equepment: {item.equpment}</h1>
                <h1>Process:{item.process}</h1>
            </div> */}