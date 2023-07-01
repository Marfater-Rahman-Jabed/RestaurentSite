import { Link, Outlet } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import { useContext } from "react";
import { AuthContexts } from "../../Contexts/Contexts";
import useAdmin from "../../Hooks/useAdmin";
import AdminNavBar from "../../Components/NavBar/AdminNavBar";
// import Footer from "../../Components/Footer/Footer";

const DashboardLayout = () => {
    const { user } = useContext(AuthContexts);
    const [Admin] = useAdmin(user?.email)
    return (
        <div >
            {Admin ? <AdminNavBar></AdminNavBar> : <NavBar></NavBar>}

            <div className="drawer drawer-mobile lg:drawer-open">
                <input id="Dashbord-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col ">

                    <Outlet></Outlet>

                </div>
                {/* className='hover:bg-Blue-700' */}
                <div className="drawer-side ">
                    <label htmlFor="Dashbord-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 lg:w-70 w-60  h-full bg-base-200 text-base-content lg:mt-0 md:mt-0 mt-24 ">
                        <li className="text-2xl font-bold mb-4 text-fuchsia-700  mt-4 ">Select Your Query</li>
                        <li className=" mt-4 font-serif  text-xl"><Link to='/dashboard'>All User</Link></li>
                        <li className="  font-serif text-xl"><Link to='/dashboard/allReview'>All Review</Link></li>
                        <li className="  font-serif text-xl"><Link to='/dashboard/allOrders'>All Orders</Link></li>


                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;