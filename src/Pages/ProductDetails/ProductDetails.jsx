
import { useLocation, useNavigate } from "react-router-dom";
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useEffect } from "react";
import { BsDownload, BsPrinter } from "react-icons/bs";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from "react";

const ProductDetails = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const pdfRef = useRef();
    const location = useLocation();
    const navigete = useNavigate()
    const { item } = location.state;
    console.log(item)

    const downloadPdf = () => {
        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;
            pdf.addImage(imgData, null, imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('Receipi.pdf');

        });
    };
    return (
        <div className="" ref={pdfRef}>
            <div className="card lg:card-side bg-base-100 shadow-xl  bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 flex justify-end pe-4  rounded-none">
                <button className="btn bg-fuchsia-700 hover:bg-fuchsia-500 text-white btn-sm  text-xl  print:hidden" onClick={downloadPdf} data-html2canvas-ignore="true" title="Download This Receipt"><BsDownload className=""></BsDownload></button>
                <button className="btn bg-fuchsia-700 hover:bg-fuchsia-500 text-white btn-sm text-xl text-center print:hidden" onClick={() => { window.print() }} title="Print this Recepi" data-html2canvas-ignore="true"><BsPrinter></BsPrinter></button>

            </div>
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