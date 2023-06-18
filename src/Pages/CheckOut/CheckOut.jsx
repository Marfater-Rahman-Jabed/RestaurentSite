import { useContext } from "react";
import { AuthContexts } from "../../Contexts/Contexts";
import { v4 as uuid } from 'uuid';
import moment from "moment/moment";

const CheckOut = () => {
    const { user } = useContext(AuthContexts);

    const unique_id = uuid();
    const small_id = unique_id.slice(0, 5)
    const date = moment().format("Do MMM YY");
    const time = moment().format('LTS');
    return (
        <div className=" lg:mt-2">
            <div className="w-60 mx-auto ">
                <h1 className="bg-gradient-to-r from-fuchsia-400 via-purple-300 to-pink-400 py-4  text-2xl text-center font-serif ">Hungry Cafe Receipt</h1>
            </div>
            <div className="lg:mb-16 lg:mt-6">
                <div className="lg:flex md:flex lg:mx-24 md:mx-24 mb-6 mt-4">
                    <div className="lg:w-1/2 mx-4">
                        <h1 className="font-serif mb-2">Name : <span className="mx-2">{user?.displayName ? user?.displayName : user?.email.split('@')[0].toUpperCase()}</span></h1>
                        <h1 className="font-serif mb-2">Email : <span className="font-bold mx-2">{user?.email}</span></h1>
                        <h1 className="font-serif mb-2">Phone: <span className="mx-2">{user?.phone ? user.phone : "***********"}</span></h1>
                    </div>
                    <div className="lg:w-1/2 mx-4">
                        <h1 className="font-serif mb-2">Receipt: #online-{user?.email.split('@')[0].slice(0, 4)}{small_id}</h1>
                        <h1 className="font-serif mb-2">Date: {date}</h1>
                        <h1 className="font-serif mb-2">Time: {time}</h1>
                    </div>
                </div>
                <hr />
                <hr />
                <div>
                    <h1>Table of order here</h1>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;