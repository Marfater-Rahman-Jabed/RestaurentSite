import { useContext } from "react";
// import { useQuery } from "react-query";
import { AuthContexts } from "../../Contexts/Contexts";
import BigLoading from '../../Components/Loading/BigLoading'
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
// import { space } from "postcss/lib/list";

const Profile = () => {
    const { user, loading, setLoading } = useContext(AuthContexts)
    const [userprofileDetails, setUserprofileDetails] = useState([])
    // const [userOrderDetails, setUserOrderDetails] = useState([])

    useEffect(() => {
        fetch(`https://resturent-manager-server.vercel.app/allUser/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setUserprofileDetails(data)
                setLoading(false)
            })
    }, [user?.email, setLoading])



    // useEffect(() => {
    //     fetch(`https://resturent-manager-server.vercel.app/allorders/${user?.email}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setUserOrderDetails(data)
    //             setLoading(false)
    //         })
    // }, [user?.email, setLoading])
    // console.log(userOrderDetails)

    const { data: userOrderDetails = [], refetch } = useQuery({
        queryKey: ['UserOrderDetails'],
        queryFn: async () => {
            const res = await fetch(`https://resturent-manager-server.vercel.app/allorders/${user?.email}`);
            const data = res.json();
            return data;
        }
    })
    refetch(`https://resturent-manager-server.vercel.app/allorders/${user?.email}`)

    const handleOrderDelete = (id) => {
        console.log(id)
        fetch(`https://resturent-manager-server.vercel.app/deleteOrderfromProfile/${id}`, {
            method: 'Delete',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('Successfully Delete')

            })
    }
    // console.log(userOrderDetails[0].paymentData.itemDetails)
    if (loading) {
        return <BigLoading></BigLoading>
    }
    else {
        return (
            <div>
                <h1 className="text-center text-3xl font-bold font-serif mt-10 mb-6"><span className="text-fuchsia-700">Your</span> <span className="text-pink-700">Profile</span></h1>
                <div className="lg:flex justify-between mb-44 border-4 border-dashed px-2 ">
                    <div className="lg:w-[40vw]">
                        <h1 className="text-center mb-2 text-3xl font-bold"><span className="text-fuchsia-700">User</span> <span className="text-pink-700">Information</span></h1>
                        <div className="my-10 px-6">
                            <div >
                                <h1>Name: {userprofileDetails?.userName}</h1>
                                <h1>Email: {userprofileDetails?.email}</h1>
                            </div>
                            <div >
                                <h1>Phone: {userprofileDetails?.phone}</h1>
                                <h1>Address: {userprofileDetails?.address}</h1>
                            </div>

                        </div>
                    </div>
                    <div className="lg:border-l-8 border-fuchsia-700">

                    </div>

                    <div className="lg:w-[60vw] ">
                        {
                            userOrderDetails.length > 0 ? <div>
                                <h1 className="text-center  text-3xl font-bold"><span className="text-fuchsia-700">Your</span> <span className="text-pink-700">Orders</span></h1>
                                <div className="my-10">

                                    <div className="overflow-x-auto">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Order <br /> No.</th>
                                                    <th>Time</th>
                                                    <th className="text-center">Item <br />Quantity</th>
                                                    <th>Total <br />Price</th>
                                                    <th>Status</th>
                                                    <th>Payment <br /> status</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userOrderDetails?.map((Order, i) => <tr className="hover" key={i}>
                                                    <th>#{Order?._id?.slice(-5)}</th>
                                                    <td>{new Date(Order?.date).toString().slice(0, 15)} <br />{new Date(Order?.date).toString().slice(15, 25)}</td>
                                                    <td className="text-center"><Link to='/profileOrderDetails' state={{ Order }}>{Order?.itemDetails?.length}</Link></td>
                                                    <td> $ {Order?.OvarAllPrice}</td>
                                                    {
                                                        Order?.delivered == 'yes' ? <td className="text-green-700 font-bold">Delivered</td> : <td>{Order?.process == 'yes' ? <span className="text-yellow-700 font-bold">Processing...</span> : <span className="text-purple-500 font-bold">Pending...</span>}</td>
                                                    }
                                                    <td>{Order?.payment == true ? <span className="text-green-700 font-bold text-xl">paid</span> : <span className="text-red-700 font-bold text-xl">unpaid</span>}</td>
                                                    <td>{
                                                        Order?.payment == true && Order?.process !== 'yes' ? <span className="text-green-600 font-bold">
                                                            Please Wait...
                                                        </span> : <span>
                                                            {Order?.process == 'yes' && Order?.delivered !== 'yes' ? <span className="text-red-500">You can not <br />delete order now</span> : <button className="btn btn-sm bg-red-700 text-white hover:bg-red-700" onClick={() => handleOrderDelete(Order?._id)}>Delete</button>}
                                                        </span>

                                                    }</td>

                                                </tr>)}

                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div> : <div>
                                <h1 className="text-center  text-3xl font-bold"><span className="text-fuchsia-700">Your Does Not</span> <span className="text-pink-700">Orders Yet</span></h1>
                            </div>
                        }

                    </div>
                </div>
            </div>
        );
    }

};

export default Profile;