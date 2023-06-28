import { Fade } from "react-awesome-reveal";
// import { BiUserCircle } from "react-icons/bi";
import { useQuery } from "react-query";

const AllOrders = () => {
    const { data: OrderData = [] } = useQuery({
        queryKey: ['OrderData'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/allOrders`, {
                headers: {
                    'content-type': 'application/json'
                }
            });
            const data = res.json();
            return data;
        },
        // refetch()
    })
    console.log(OrderData[0]?.itemDetails?.length)
    return (
        <div>
            <div className="my-6">
                <Fade direction="down">
                    <h1 className="text-2xl text-center font-bold font-serif "><span className="text-fuchsia-700">All Types Of </span><span className="text-pink-700"> Review Listed Here</span></h1>
                </Fade>
            </div>
            <div className="overflow-x-auto">
                <table className="table">

                    <thead>
                        <tr>
                            {/* <th>Photo</th> */}
                            <th>SL <br /> No. </th>
                            <th>Name /Email</th>
                            <th>Address / Phone</th>

                            <th>Order Qty</th>
                            <th>Total Price</th>
                            <th className="text-center">Process</th>
                            <th>Delivered</th>
                            <th>Action</th>
                            {/* <th>Display</th> */}
                        </tr>
                    </thead>
                    <tbody>

                        {
                            OrderData.map((Order, i) => <tr className="hover:bg-base-300" key={i}>
                                <td className="font-semibold text-xl">{i + 1}</td>
                                <td className="">
                                    <div className="font-bold">{Order?.name}</div>
                                    <div className="">{Order?.email}</div>
                                </td>
                                <td>
                                    <div className="items-center">
                                        <div>{Order?.address}</div>
                                        <div>{Order?.phone}</div>
                                    </div>

                                </td>


                                <td className="text-center font-bold"><div>
                                    {Order?.itemDetails?.length}

                                </div></td>
                                <td className="font-bold"> $ {Order?.OvarAllPrice}</td>

                                <td><button className="btn btn-sm bg-orange-400 hover:bg-orange-500">Unprocess</button></td>
                                {/* <td>{Order?.description}</td> */}
                                <td><button>UnDelevered</button></td>
                                <td><button>Delete</button></td>
                                {/* <td>{user?.role ? <span className="bg-green-500 px-2 rounded-lg text-white font-semibold py-1">{user?.role}</span> : <span className='font-bold'>User</span>}</td> */}
                                {/* <td><button className="btn btn-sm bg-red-500 hover:bg-red-500 text-white" onClick={() => handleDelete(Order?._id)}>Delete</button></td>
                                <td>{Order?.display ?
                                    '' : <button className="btn btn-sm bg-purple-500 hover:bg-orange-500 text-white" onClick={() => handleDisplay(Order?._id)}>Display</button>
                                }</td> */}

                            </tr>)
                        }




                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default AllOrders;