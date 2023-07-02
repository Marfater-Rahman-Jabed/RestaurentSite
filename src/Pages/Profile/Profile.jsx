import { useContext } from "react";
// import { useQuery } from "react-query";
import { AuthContexts } from "../../Contexts/Contexts";
import BigLoading from '../../Components/Loading/BigLoading'
import { useState } from "react";
import { useEffect } from "react";
// import { space } from "postcss/lib/list";

const Profile = () => {
    const { user, loading, setLoading } = useContext(AuthContexts)
    const [userprofileDetails, setUserprofileDetails] = useState([])
    const [userOrderDetails, setUserOrderDetails] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/allUser/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setUserprofileDetails(data)
                setLoading(false)
            })
    }, [user?.email, setLoading])



    useEffect(() => {
        fetch(`http://localhost:5000/allorders/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setUserOrderDetails(data)
                setLoading(false)
            })
    }, [user?.email, setLoading])


    console.log(userOrderDetails)
    if (loading) {
        return <BigLoading></BigLoading>
    }
    else {
        return (
            <div className="lg:flex justify-between mb-10">
                <div className="w-[40vw]">
                    <h1 className="text-center mt-10 mb-6 text-3xl font-bold"><span className="text-fuchsia-700">User</span> <span className="text-pink-700">Information</span></h1>
                    <div className="">
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

                <div className="w-[60vw] ">
                    <h1 className="text-center mt-10 mb-6 text-3xl font-bold"><span className="text-fuchsia-700">Your</span> <span className="text-pink-700">Orders</span></h1>
                    <div className="border-l-8 border-fuchsia-700">

                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>SL No.</th>
                                        <th>Time</th>
                                        <th className="text-center">Item <br />Quantity</th>
                                        <th>Total <br />Price</th>
                                        <th>Status</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userOrderDetails?.map((Order, i) => <tr className="hover" key={i}>
                                        <th>{i + 1}</th>
                                        <td>{Order?.date.split('T')[1].slice(0, -5)} <br /> {Order?.date.split('T')[0]}</td>
                                        <td className="text-center">{Order?.itemDetails.length}</td>
                                        <td> $ {Order?.OvarAllPrice}</td>
                                        {
                                            Order?.delivered == 'yes' ? <td className="text-green-700 font-bold">Delivered</td> : <td>{Order?.process == 'yes' ? <span className="text-yellow-700 font-bold">Processing...</span> : <span className="text-purple-500 font-bold">Pending...</span>}</td>
                                        }
                                        <td>{Order?.process == 'yes' && Order?.delivered !== 'yes' ? <span className="text-red-500">You can not <br />delete order now</span> : <button className="btn btn-sm bg-red-700 text-white hover:bg-red-700">Delete</button>}</td>

                                    </tr>)}

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

};

export default Profile;