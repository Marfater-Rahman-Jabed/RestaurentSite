import { Fade } from "react-awesome-reveal";
import { toast } from "react-hot-toast";
// import { BiUserCircle } from "react-icons/bi";
import { useQuery } from "react-query";

const AllOrders = () => {
    const { data: OrderData = [], refetch } = useQuery({
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
    // console.log(OrderData[0]?.itemDetails?.length)
    const handleProcess = (id) => {
        console.log(id)
        fetch(`http://localhost:5000/updateProcessing/${id}`, {
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
        fetch(`http://localhost:5000/OrderDelete/${id}`, {
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

    return (
        <div>
            <div className="my-6">
                <Fade direction="down">
                    <h1 className="text-2xl text-center font-bold font-serif "><span className="text-fuchsia-700">All Types Of </span><span className="text-pink-700"> Orders Listed Here</span></h1>
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

                                <td><button className="" onClick={() => handleProcess(Order?._id)}>{Order?.process == 'no' ? <span className="bg-orange-400 hover:bg-orange-500 btn btn-sm ">Unprocess</span> : <span className="text-green-400 hover:text-green-600 text-xl font-serif ">Processing...</span>}</button></td>
                                {/* <td>{Order?.description}</td> */}
                                <td><button>UnDelevered</button></td>
                                <td><button className="btn btn-sm bg-red-600 hover:bg-red-600" onClick={() => handleDelete(Order?._id)}>Delete</button></td>


                            </tr>)
                        }




                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default AllOrders;