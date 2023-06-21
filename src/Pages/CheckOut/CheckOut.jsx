import { useContext } from "react";
import { AuthContexts } from "../../Contexts/Contexts";
// import { v4 as uuid } from 'uuid';
import moment from "moment/moment";
import { BsDownload, BsPrinter } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
//for download you should install below package
//npm install html2canvas jspdf
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from "react";
// import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { toast } from "react-hot-toast";

const CheckOut = () => {
    const { user } = useContext(AuthContexts);
    const pdfRef = useRef();
    // const location = useLocation();
    // const { cartData, } = location.state;
    // console.log(cartData.length)
    // const unique_id = uuid();
    // const small_id = unique_id.slice(0, 5)
    const date = moment().format("Do MMM YY");
    // const time = moment().format('LTS');
    // const { refetch } = useQuery()
    const { data: cartData = [], refetch } = useQuery({
        queryKey: ['cartData'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/myCart?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = res.json();
            return data;
        },
        // refetch()
    })
    // 
    const handleDelete = (id) => {

        console.log(id)
        fetch(`http://localhost:5000/cart/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('Successfully Deleted !!!')
                refetch(`http://localhost:5000/myCart?email=${user?.email}`)
            })
    }
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
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('CashMemo.pdf');

        });
    };
    return (
        <div className=" lg:mt-2 mb-10" ref={pdfRef}>
            <div className="lg:w-[50vw] w-[95vw] mx-auto bg-gradient-to-r from-fuchsia-400 via-purple-300 to-pink-400 py-4  text-2xl text-center font-serif flex justify-center ">
                <h1 className="text-3xl mr-16 flex items-center mb-2">Hungry Cafe Receipt</h1>
                <div className="flex justify-end">
                    <button onClick={() => window.print()} className="print:hidden" title="Print This Receipt"><BsPrinter className="me-6 " data-html2canvas-ignore="true" ></BsPrinter></button>
                    <button className="print:hidden" onClick={downloadPdf} data-html2canvas-ignore="true" title="Download This Receipt"><BsDownload className="me-6 "></BsDownload></button>
                </div>

            </div>
            <div className="lg:mb-16 lg:mt-6">
                <div className="lg:flex md:flex print:flex lg:mx-24 md:mx-24 mb-6 mt-4">
                    <div className="lg:w-1/2 mx-4">
                        <h1 className="font-serif mb-2">Name : <span className="mx-2">{user?.displayName ? user?.displayName : user?.email.split('@')[0].toUpperCase()}</span></h1>
                        <h1 className="font-serif mb-2">Email : <span className="font-bold mx-2">{user?.email}</span></h1>
                        <h1 className="font-serif mb-2">Phone: <span className="mx-2">{user?.phone ? user.phone : "***********"}</span></h1>
                    </div>
                    <div className="lg:w-1/2 mx-4">
                        <h1 className="font-serif mb-2">Receipt: #online-{user?.email.split('@')[0].slice(0, 4)}{user?.phone ? user?.phone : 1239}</h1>
                        <h1 className="font-serif mb-2">Date: {date}</h1>
                        {/* <h1 className="font-serif mb-2">Time: {new Date(new Date().getTime()).toLocaleTimeString()}</h1> */}
                    </div>
                </div>
                <hr />
                <hr />
                {
                    cartData.length > 0 ? <h1 className="text-center text-2xl font-bold py-4 font-serif"><span className="text-fuchsia-700">Your Item</span> <span className="text-pink-700">Listed Here</span></h1> : <h1 className="text-center text-2xl font-bold py-4 font-serif"><span className="text-fuchsia-700">No Item</span> <span className="text-pink-700">You Select</span></h1>
                }
                <div className="grid grid-cols-1 gap-2 ">
                    {
                        cartData?.map((cart, i) => <div key={i} className="flex justify-between border-2 items-center lg:w-[60vw] mx-auto bg-base-300 gap-2" >
                            <img src={cart.picture} alt="" className="lg:w-64 w-32 lg:h-full h-32" />
                            <div className="lg:me-32">
                                <h1 className="text-2xl font-bold font-serif text-fuchsia-700" title={cart.name}>{cart.name.slice(0, 12)}</h1>
                                <h1 className="text-xl font-bold font-serif">Price : {cart.price}</h1>
                                <h1 className="text-xl font-bold font-serif">Discount : {cart?.discount > 0 ? cart?.discount : 'No'}{cart?.discount > 0 ? '%' : ''}</h1>

                            </div>
                            <button className="lg:me-12 hover:bg-fuchsia-700 p-4 rounded-full" title="Delete Item" onClick={() => handleDelete(cart?._id)}><RiDeleteBinLine className="text-2xl"></RiDeleteBinLine></button>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default CheckOut;