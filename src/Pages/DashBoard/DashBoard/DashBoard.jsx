import { Fade } from "react-awesome-reveal";
import { useQuery } from "react-query";

const DashBoard = () => {
    const { data: allUser = [] } = useQuery({
        queryKey: ['allUser'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/allUser`)
            const data = res.json();
            return data;
        }
    })
    return (
        <div className=" ">
            <label htmlFor="Dashbord-drawer" className="drawer-button btn  lg:hidden md:hidden flex justify-end">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <div>
                <div className="my-6">
                    <Fade direction="down">
                        <h1 className="text-2xl text-center font-bold font-serif "><span className="text-fuchsia-700">All Types Of </span><span className="text-pink-700"> User Listed Here</span></h1>
                    </Fade>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">

                        <thead>
                            <tr>
                                {/* <th>Photo</th> */}
                                <th>SL <br /> No. </th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Rule</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                allUser?.map((user, i) => <tr className="hover" key={i}>
                                    <td className="font-semibold text-xl">{i + 1}</td>
                                    <td>
                                        <div>
                                            <div className="font-bold">{user?.userName}</div>
                                            <div className="text-sm opacity-90">{user?.email}</div>
                                        </div>
                                    </td>
                                    <td>
                                        {user?.address}
                                    </td>
                                    <td>{user?.phone}</td>
                                    <td>{user?.role ? <span className="bg-green-500 px-2 rounded-lg text-white font-semibold py-1">{user?.role}</span> : <span className='font-bold'>User</span>}</td>
                                    <td><button className="btn btn-sm bg-red-500 hover:bg-red-500 text-white">Delete</button></td>

                                </tr>)
                            }




                        </tbody>


                    </table>
                </div>
            </div>

        </div>
    );
};

export default DashBoard;