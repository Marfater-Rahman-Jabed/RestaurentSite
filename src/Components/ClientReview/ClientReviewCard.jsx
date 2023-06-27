import { FaUserCircle } from 'react-icons/fa';
const ClientReviewCard = ({ item }) => {
    return (
        <div>
            <div>
                <div className="card mx-2 rounded-ss-none rounded-ee-none rounded-se-3xl rounded-es-3xl  bg-gradient-to-r from-stone-400 via-fuchsia-400 to-blue-300 h-52">
                    <div className="card-body">

                        <p className="font-bold "><i>&quot;{item.description}&quot;</i></p>
                        <div className="flex gap-2 justify-center  mt-4">
                            <div className="avatar">
                                <div className="w-12  rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    {item?.picture ? <img src={item.picture} /> : <FaUserCircle className='text-5xl'></FaUserCircle>}

                                </div>
                            </div>
                            <div className="">
                                <h1 className="ml-2 "><strong>{item.name}</strong></h1>
                                <h1 className="font-semibold ml-2"><small>{item.address}</small></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientReviewCard;