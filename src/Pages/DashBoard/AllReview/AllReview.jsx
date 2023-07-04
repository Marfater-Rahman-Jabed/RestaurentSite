import { Fade } from "react-awesome-reveal";
import { toast } from "react-hot-toast";
import { BiUserCircle } from "react-icons/bi";
import { useQuery } from "react-query";

const AllReview = () => {
    const { data: allReview = [], refetch } = useQuery({
        queryKey: ['allUser'],
        queryFn: async () => {
            const res = await fetch(`https://resturent-manager-server.vercel.app/allReview`)
            const data = res.json();
            return data;
        }
    })
    const handleDisplay = (id) => {
        console.log(id)
        fetch(`https://resturent-manager-server.vercel.app/updateReviewDisplay/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'Application/json'
            },

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('Added to display Successfully')
                refetch()
            })
    }

    const handleDelete = (id) => {
        console.log(id)
        fetch(`https://resturent-manager-server.vercel.app/reviewDelete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success(' Review Deleted')
                refetch()
            })
    }
    return (
        <div>
            <label htmlFor="Dashbord-drawer" className="drawer-button btn  lg:hidden  flex justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <div className="my-6">
                <Fade direction="down">
                    <h1 className="text-2xl lg:text-center font-bold font-serif "><span className="text-fuchsia-700">All Types Of </span><span className="text-pink-700"> Review Listed Here</span></h1>
                </Fade>
            </div>
            <div className="overflow-x-auto">
                <table className="table">

                    <thead>
                        <tr>
                            {/* <th>Photo</th> */}
                            <th>SL <br /> No. </th>
                            <th>Name</th>
                            <th>Picture</th>
                            <th>Address</th>
                            <th className="text-center">Review</th>
                            <th>Action</th>
                            <th>Display</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            allReview?.map((review, i) => <tr className="hover:bg-base-300" key={i}>
                                <td className="font-semibold text-xl">{i + 1}</td>
                                <td className="">
                                    <div>
                                        <div className="font-bold">{review?.name}</div>

                                    </div>
                                </td>
                                <td><div >
                                    {review?.picture ? <img src={review?.picture} alt="" className="rounded-full w-12 h-12" /> : <BiUserCircle className="text-5xl"></BiUserCircle>}

                                </div></td>
                                <td>
                                    {review?.address}
                                </td>
                                <td>{review?.description}</td>
                                {/* <td>{user?.role ? <span className="bg-green-500 px-2 rounded-lg text-white font-semibold py-1">{user?.role}</span> : <span className='font-bold'>User</span>}</td> */}
                                <td><button className="btn btn-sm bg-red-500 hover:bg-red-500 text-white" onClick={() => handleDelete(review?._id)}>Delete</button></td>
                                <td>{review?.display ?
                                    '' : <button className="btn btn-sm bg-purple-500 hover:bg-orange-500 text-white" onClick={() => handleDisplay(review?._id)}>Display</button>
                                }</td>

                            </tr>)
                        }




                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default AllReview;