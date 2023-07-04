import { Fade } from "react-awesome-reveal";
import { toast } from "react-hot-toast";
// import { BiUserCircle } from "react-icons/bi";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";
const AllOrders = () => {
    const { data: OrderData = [], refetch } = useQuery({
        queryKey: ['OrderData'],
        queryFn: async () => {
            const res = await fetch(`https://resturent-manager-server.vercel.app/allOrders`, {
                headers: {
                    'content-type': 'application/json'
                }
            });
            const data = res.json();
            return data;
        },
        // refetch()
    })
    // console.log(OrderData[0]?.itemDetails?.length)
    const handleProcess = (id) => {
        console.log(id)
        fetch(`https://resturent-manager-server.vercel.app/updateProcessing/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                refetch()
                console.log(data)
            })

    }

    const handleDelete = (id) => {
        console.log(id)
        fetch(`https://resturent-manager-server.vercel.app/OrderDelete/${id}`, {
            method: 'Delete',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                refetch()
                toast.success('Deleted Successfully')
                console.log(data)
            })
    }

    const handleDelivered = (id, processs) => {
        console.log(id, processs)
        if (processs === 'yes') {
            fetch(`https://resturent-manager-server.vercel.app/updateDelevered/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    toast.success('Successfully Delivered !!!')
                    refetch()
                    console.log(data)
                })
        }
        else {
            toast.error('Please Process First !!!')
        }

    }

    return (
        <div>
            <label htmlFor="Dashbord-drawer" className="drawer-button btn  lg:hidden  flex justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <div className="my-6">
                <Fade direction="down">
                    <h1 className="text-2xl lg:text-center font-bold font-serif "><span className="text-fuchsia-700">All Types Of </span><span className="text-pink-700"> Orders Listed Here</span></h1>
                </Fade>
            </div>
            <div className="overflow-x-auto ">
                <table className="table ">

                    <thead>
                        <tr>
                            {/* <th>Photo</th> */}
                            {/* <th>SL <br /> No. </th> */}
                            <th>Order <br /> No.</th>
                            <th className="">Name <br /> Email</th>
                            <th>Address / Phone</th>

                            <th>Order Qty</th>
                            <th>Total Price</th>
                            <th>Payment <br />Status</th>
                            <th className="text-center">Process</th>
                            <th>Delivered</th>
                            <th>Action</th>
                            {/* <th>Display</th> */}
                        </tr>
                    </thead>
                    <tbody>

                        {
                            OrderData.map((Order, i) => <tr className="hover:bg-base-300" key={i}>
                                {/* <td className="font-semibold text-xl">{i + 1}</td> */}
                                <td className="font-semibold text-xl">#{Order?._id.slice(-5)}</td>
                                <td className="">
                                    <div className="font-bold">{Order?.name}</div>
                                    <div className="" title={Order?.email}>{Order?.email?.split('@')[0]}...</div>
                                </td>
                                <td>
                                    <div className="items-center">
                                        <div>{Order?.address}</div>
                                        <div>{Order?.phone}</div>
                                    </div>

                                </td>


                                <td className="text-center font-bold"><Link to='/dashboard/seeOrderDetails' state={{ Order }}>{Order?.itemDetails?.length}</Link></td>
                                <td className="font-bold"> $ {Order?.OvarAllPrice}</td>
                                <td>
                                    {
                                        Order?.fraud === 'ok' ? <span className="text-red-500 font-bold  animate-pulse">InComplete <br /> Order</span> : <span>{
                                            Order?.payment == true ? <span className="text-green-500 font-bold text-xl">paid</span> : <span className="text-red-500 font-bold ">Unpaid</span>
                                        }</span>
                                    }

                                </td>

                                {
                                    Order?.delivered == 'yes' ? <TiTick className="text-5xl mx-auto mt-4 text-blue-600" title="Delevered Successfully"></TiTick> : <td><button className="" onClick={() => handleProcess(Order?._id)}>
                                        {
                                            Order?.fraud === 'ok' ? <span className="text-red-500 font-bold  animate-pulse">InComplete <br /> Order</span> : <span>{Order?.process == 'no' ? <span className="bg-orange-400 hover:bg-orange-500 btn btn-sm ">Make <br />Process</span> : <span className="text-green-400 hover:text-green-600  font-bold font-serif ">Processing...</span>}</span>
                                        }

                                    </button></td>
                                }
                                {/* <td>{Order?.description}</td> */}
                                <td>
                                    {
                                        Order?.fraud === 'ok' ? <span className="text-red-500 font-bold  animate-pulse">InComplete <br /> Order</span> : <span>{Order?.delivered == 'yes' && Order?.process == 'yes' ? <span className="bg-green-700 p-2 text-white font-bold rounded-lg">Delivered</span> : <button className="bg-slate-400 hover:bg-orange-500 btn btn-sm " onClick={() => handleDelivered(Order?._id, Order?.process)}>Make <br /> Delivered</button>}</span>
                                    }


                                </td>
                                <td><button className="btn btn-sm bg-red-600 hover:bg-red-600 text-white" onClick={() => handleDelete(Order?._id)}>Delete</button></td>


                            </tr>)
                        }




                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default AllOrders;