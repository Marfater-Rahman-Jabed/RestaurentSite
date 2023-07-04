import { useContext, useEffect, useState } from "react";
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
import Loading from "../../Components/Loading/Loading";
import { PhotoProvider, PhotoView } from "react-photo-view";
import ReviewModal from "../../Components/ReviewModal/ReviewModal";
import { useNavigate } from "react-router-dom";
// import { Fade } from "react-awesome-reveal";

const CheckOut = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const { user, } = useContext(AuthContexts);
    const pdfRef = useRef();

    const date = moment().format("Do MMM YY");
    const { data: cartData = [], refetch } = useQuery({
        queryKey: ['cartData'],
        queryFn: async () => {
            const res = await fetch(`https://resturent-manager-server.vercel.app/myCart?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = res.json();
            return data;
        },
        // refetch()
    })

    const { data: userDetails = [] } = useQuery({
        queryKey: ['userDetails'],
        queryFn: async () => {
            const res = await fetch(`https://resturent-manager-server.vercel.app/allUser/${user?.email}`)
            const data = res.json();
            return data;
        }
    })
    // 
    const handleIncrease = (id) => {
        console.log(id)
        fetch(`https://resturent-manager-server.vercel.app/quantity/${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }

    const handleDecrease = (id, quantity) => {
        console.log(id, quantity - 1)
        if (quantity > 1) {
            fetch(`https://resturent-manager-server.vercel.app/decrease/${id}`, {
                method: "PUT",
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
        }
        else {
            toast.error('You should Delete this item')
        }

    }
    const handleDelete = (id) => {

        console.log(id)
        fetch(`https://resturent-manager-server.vercel.app/cart/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('Successfully Deleted !!!')
                refetch(`https://resturent-manager-server.vercel.app/myCart?email=${user?.email}`)
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
    const [calculateLoading, setCalculateLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const [kolok, setKolok] = useState(false)
    const calculateTotal = () => {
        // setLoading(true)
        setCalculateLoading(true)
        fetch(`https://resturent-manager-server.vercel.app/cartCalculation?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setTotal(data.sum)
                setCalculateLoading(false)
                // refetch()
            })
    }
    const navigate = useNavigate()
    const handleCashOn = (data, total, phone, email, address, name) => {

        console.log(data, total)
        const orderDetails = {
            date: new Date(),
            itemDetails: data,
            OvarAllPrice: total,
            phone: phone,
            email: email,
            address: address,
            name: name,
            process: 'no',
            payment: false,
            fraud: 'no'
        }
        fetch(`https://resturent-manager-server.vercel.app/createOrder`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('Your Order Created !!! . Starting Download Your Order File. You Should Contain this PDF for Confirmation Purpose');
                // refetch(`https://resturent-manager-server.vercel.app/allOrder/unprocess`)
                navigate('/profile')
            })
    }

    const handlePayment = () => {
        console.log('clickeed')
        const paymentData = {
            date: new Date(),
            itemDetails: cartData,
            OvarAllPrice: total,
            phone: userDetails.phone,
            currency: 'BDT',
            productName: 'HungryCafe Order',
            name: userDetails?.userName,
            email: userDetails?.email,
            address: userDetails?.address,
            process: 'no',
            payment: false,
            fraud: 'ok'
        }
        fetch(' https://resturent-manager-server.vercel.app/onlinePayment', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(paymentData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // if (data.acknowledged) {
                //     toast.success('successfully booked');
                //     setModalName(null)
                // }
                toast.success('Please GO to payment')
                // setModalName(null)

                window.location.replace(data.url)
            })
    }

    return (
        <div className=" lg:pt-2 pb-10 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200" ref={pdfRef}>
            <div className="lg:w-[50vw] w-[95vw] mx-auto bg-gradient-to-r from-fuchsia-400 via-purple-300 to-pink-400 py-4  text-2xl text-center font-serif flex justify-center ">
                <h1 className="text-3xl mr-16 flex items-center mb-2">Hungry Cafe Receipt</h1>
                <div className="flex justify-end">
                    <button onClick={() => window.print()} className="print:hidden" title="Print This Receipt"><BsPrinter className="me-6 " data-html2canvas-ignore="true" ></BsPrinter></button>
                    <button className="print:hidden" onClick={downloadPdf} data-html2canvas-ignore="true" title="Download This Receipt"><BsDownload className="me-6 "></BsDownload></button>
                </div>

            </div>
            <div className="lg:mb-16 lg:mt-6">
                <div className="lg:flex md:flex print:flex lg:mx-24  mb-6 mt-4">
                    <div className="lg:w-1/2 mx-4">
                        <h1 className="font-semibold text-xl mb-2">Name : <span className="mx-2">{user?.displayName ? user?.displayName : user?.email.split('@')[0].toUpperCase()}</span></h1>
                        <h1 className="font-semibold text-xl mb-2">Email : <span className="font-bold mx-2">{user?.email}</span></h1>
                        <h1 className="font-semibold text-xl mb-2">Phone: <span className="mx-2">{userDetails?.phone ? userDetails.phone : <input className=" " placeholder="Set Your Phone Number" type="number" required></input>}</span></h1>
                    </div>
                    <div className="lg:w-1/2 mx-4">
                        <h1 className="font-semibold text-xl mb-2">Receipt: #online-{user?.email.split('@')[0].slice(0, 4)}{userDetails?.phone ? userDetails.phone.slice(-5) : 12345}</h1>
                        <h1 className="font-semibold text-xl mb-2">Date: {date}</h1>
                        <h1 className="font-semibold text-xl mb-2">Address: {userDetails?.address ? userDetails?.address : <select className="select select-bordered select-sm w-full max-w-xs ">
                            <option defaultValue='Dhaka'>Dhaka</option>
                            <option value='chittagong'>Chittagong</option>
                            <option value='Comilla'>Comilla</option>
                            <option value='Rajshahi'>Rajshahi</option>
                            <option value='Sylhet'>Sylhet</option>
                            <option value='Rangpur'>Rangpur</option>
                            <option value='Barishal'>Barishal</option>
                        </select>}</h1>
                    </div>
                </div>
                <hr />
                <hr />
                {
                    cartData.length > 0 ? <h1 className="text-center text-2xl font-bold py-4 font-serif"><span className="text-fuchsia-700">Your Item</span> <span className="text-pink-700">Listed Here</span></h1> : <h1 className="text-center text-2xl font-bold py-4 font-serif mb-[30vh]"><span className="text-fuchsia-700">No Item</span> <span className="text-pink-700">You Select</span></h1>
                }
                <div className="grid grid-cols-1 gap-2 mb-2">
                    {
                        cartData?.map((cart, i) => <div key={i} className="flex justify-between border-2 items-center lg:w-[60vw] md:w-[70vw] mx-auto bg-base-300 gap-2" >
                            {/* <img src={cart.picture} alt=""  /> */}
                            <PhotoProvider>
                                <PhotoView src={cart?.picture}>
                                    <img src={cart?.picture} alt="" className="lg:w-64 w-32 lg:h-full h-32" />
                                </PhotoView>
                            </PhotoProvider>
                            <div className="lg:me-16">
                                <h1 className="lg:text-2xl text-xl font-bold font-serif text-fuchsia-700" title={cart.name}>{cart.name.slice(0, 12)}</h1>
                                <h1 className="lg:text-xl font-bold font-serif">Price : {cart?.price}</h1>
                                <h1 className="lg:text-xl font-bold font-serif">OFF : {cart?.discount > 0 ? cart?.discount : 'No'}{cart?.discount > 0 ? '%' : ''}</h1>

                                <h1 className='font-bold bg-pink-600 text-white lg:px-2 lg:py-2 mt-2 rounded-lg print:text-fuchsia-700 w-full'>SubTotal: <span className="lg:text-xl">${cart?.totalPrice}</span></h1>

                            </div>

                            <div className="flex justify-between items-center mt-1">
                                <button className="btn btn-sm bg-fuchsia-700 hover:bg-pink-700 text-xl text-white print:text-black" onClick={() => { handleDecrease(cart?._id, cart?.quantity); setKolok(false); }}>-</button>
                                <h1 className="text-xl font-bold text-white bg-pink-600 lg:px-10 px-2 rounded-lg py-1 print:text-black" title="Select Your Quantity">{cart?.quantity}</h1>
                                <button className="btn btn-sm bg-fuchsia-700 lg:text-xl text-white hover:bg-pink-700 print:text-black " onClick={() => { handleIncrease(cart?._id); setKolok(false); }}>+</button>
                            </div>
                            <button className="lg:me-8 hover:bg-fuchsia-700 lg:p-4 rounded-full" title="Delete Item" onClick={() => { setKolok(false); handleDelete(cart?._id); }}><RiDeleteBinLine className="text-2xl"></RiDeleteBinLine></button>

                        </div>)
                    }
                    {
                        cartData.length ? <><hr />
                            <hr /></> : ''
                    }

                </div>
                <div className="lg:w-[60vw] mx-auto text-center lg:me-52">
                    {
                        cartData.length ? <button className="btn w-56 mb-4 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-fuchsia-700  text-white print:hidden" onClick={() => { setKolok(true); calculateTotal(); setCalculateLoading(true) }}>{calculateLoading ? <Loading></Loading> : 'CalCulate Total'}</button> : ''
                    }
                    {
                        kolok && !calculateLoading &&
                        <div className="border-4 border-dotted border-fuchsia-700 p-2">
                            <h1 className="text-xl  font-bold  rounded-lg text-white bg-pink-700 p-4 print:text-black mb-2">Total Amount :  <span className="text-2xl">$ {total.toFixed(2)}</span></h1>
                            <div className="flex justify-between">
                                <button className="btn bg-gradient-to-r from-fuchsia-600 via-pink-600 to-fuchsia-700  text-white lg:w-44 w-24 print:hidden" onClick={() => { downloadPdf(); handleCashOn(cartData, total.toFixed(2), userDetails?.phone, user?.email, userDetails?.address, user?.displayName); }}>Cash On Delivery</button>
                                <button className="btn bg-gradient-to-r from-fuchsia-600 via-pink-600 to-fuchsia-700  text-white lg:w-44 w-24 print:hidden" onClick={handlePayment}>Online Payment</button>

                                <button className="btn bg-gradient-to-r from-fuchsia-600 via-pink-600 to-fuchsia-700  text-white lg:w-44 w-24 print:hidden" onClick={() => window.my_modal_3.showModal()}>Gives Review</button>
                            </div>
                        </div>
                    }

                </div>
                {
                    <ReviewModal></ReviewModal>
                }
            </div>
        </div>
    );
};

export default CheckOut;