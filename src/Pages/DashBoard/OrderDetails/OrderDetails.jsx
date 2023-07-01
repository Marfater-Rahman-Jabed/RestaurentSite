import { BsPrinter } from "react-icons/bs";
import { useLocation } from "react-router-dom";

const OrderDetails = () => {
    const location = useLocation();
    const { Order } = location.state;

    const allItem = Order?.itemDetails
    console.log(allItem)
    return (
        <div className="w-[70vw] mx-auto mt-10 print:w-full">
            <div className="flex justify-end text-3xl text-fuchsia-700" title="Print Order Slip">
                <button onClick={() => window.print()} ><BsPrinter className="me-6 print:hidden" data-html2canvas-ignore="true" ></BsPrinter></button>
            </div>

            <h1 className="text-2xl text-center font-bold font-serif  mb-10"><span className="text-fuchsia-700">Items Details</span> <span className="text-pink-700">for Delivery</span></h1>

            <div className="lg:flex justify-between print:flex">
                <span>
                    <h1 className="font-semibold font-serif mb-2"><span className="text-pink-700">User Name</span> : <span className="text-fuchsia-700"><i>{Order?.name}</i></span></h1>
                    <h1 className="font-semibold font-serif mb-2"><span className="text-pink-700">User Address</span> : <span className="text-fuchsia-700"><i>{Order?.address}</i></span></h1>
                    <h1 className="font-semibold font-serif mb-2"><span className="text-pink-700">Total Price:</span> : <span className="text-fuchsia-700"><i>{Order?.OvarAllPrice} + (delivery charge = $ 5)</i></span></h1>
                </span>
                <span>
                    <h1 className="font-semibold font-serif mb-2"><span className="text-pink-700">User Email</span>: <span className="text-fuchsia-700"><i>{Order?.email}</i></span></h1>
                    <h1 className="font-semibold font-serif mb-2"><span className="text-pink-700">User Phone</span> : <span className="text-fuchsia-700"><i>{Order?.phone}</i></span></h1>
                    <h1 className="font-semibold font-serif mb-2"><span className="text-pink-700">Net Price</span> : <span className="text-fuchsia-700"> $ <i>{parseFloat(Order?.OvarAllPrice) + 5}</i></span></h1>

                </span>

            </div>
            <br />
            <hr />
            <hr />

            <div>
                <h1 className="text-2xl text-center font-bold font-serif  mb-10 mt-6"><span className="text-fuchsia-700">Orders</span> <span className="text-pink-700">Details</span></h1>


                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className="text-center">SL No</th>
                                <th className="">Picture</th>
                                <th className="text-center">Item Name</th>

                                <th className="text-center">Quantity</th>
                                <th className="text-center">Unit Price</th>
                                <th className="text-center">SubTotal Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allItem.map(item => <tr key={item?._id} className="hover:bg-blue-200">
                                    <th className="text-center font-bold text-xl">1</th>
                                    <td className="text-center"><img src={item?.picture} alt="" className="w-24 h-24" /></td>
                                    <td className="text-center font-bold text-xl">{item?.name}</td>
                                    <td className="text-center font-bold text-xl">{item?.quantity}</td>
                                    <td className="text-center font-bold text-xl">$ {item?.price}</td>
                                    <td className="text-center font-bold text-xl">$ {item?.totalPrice}</td>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default OrderDetails;