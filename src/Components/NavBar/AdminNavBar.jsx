import { HiUserCircle } from "react-icons/hi";
import Logos from "../../assets/Logo/Logo.jpg"
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContexts } from "../../Contexts/Contexts";
import { useQuery } from "react-query";
import useAdmin from "../../Hooks/useAdmin";
import { FiLogOut } from 'react-icons/fi';
import { CgProfile } from "react-icons/cg";
import { AiOutlineHome } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { SiReacthookform } from "react-icons/si";
import { RxDashboard } from "react-icons/rx";
import { BsBell } from "react-icons/bs";
import { toast } from "react-hot-toast";
// import { useEffect } from "react";



const AdminNavBar = () => {
    const { user, LogOut } = useContext(AuthContexts)
    const [close, setClose] = useState(false);

    const [Admin] = useAdmin(user?.email)

    // function refetchTwoUrls(url1, url2) {
    //   refetch(url1);
    //   refetch(url2);
    // }
    const { data: OrderViewData = [], refetch } = useQuery({
        queryKey: ['OrderViewData'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/allOrder/unprocess`, {
                headers: {
                    'content-type': 'application/json'
                }
            });
            const data = res.json();
            return data;
        },

    })

    refetch(`http://localhost:5000/allOrder/unprocess`)

    // const { data: cartData = [], } = useQuery({
    //     queryKey: ['cartData'],
    //     queryFn: async () => {
    //         const res = await fetch(`http://localhost:5000/myCart?email=${user?.email}`, {
    //             headers: {
    //                 'content-type': 'application/json'
    //             }
    //         });
    //         const data = res.json();
    //         return data;
    //     },

    // })

    //   const [OrderViewData, setOrderViewData] = useState([])
    //   useEffect(() => {
    //     fetch(`http://localhost:5000/allOrder/unprocess`)
    //       .then(res => res.json())
    //       .then(data => {
    //         setOrderViewData(data)

    //       })
    //   }, [])
    //   refetch()




    // refetchTwoUrls(`http://localhost:5000/allOrder/unprocess`, `http://localhost:5000/myCart?email=${user?.email}`)



    const handleLogOut = () => {
        LogOut()
            .then(() => {
                toast.success('LogOut SuccessFull !!!')
                console.log('logged out')
            })
            .catch(error => console.log(error))
    }


    // fetch(`http://localhost:5000/cartCalculation?email=${user?.email}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data)
    //     setTotal(data.sum)

    //   })


    return (
        <div style={{ position: "sticky", top: 0, zIndex: 100 }}>
            <div className="navbar  bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 " >
                <div className="flex-1">
                    <img src={Logos} alt="" className="rounded-full h-16 invisible lg:visible md:visible w-0 lg:w-16 md:w-16 " />
                    <Link className="font-serif lg:text-4xl text-3xl font-bold text-fuchsia-700 lg:ms-4 md:ms-4  " to="/"><i>Hungry  <span className="text-pink-700">Cafe</span></i></Link>



                </div>
                <Link to="/" className="me-6 text-xl font-serif font-bold invisible lg:visible md:visible text-fuchsia-700 "><i>Home</i></Link>
                <div className="flex-none">
                    {
                        Admin &&
                        <div className="dropdown dropdown-end print:hidden">

                            <label tabIndex={0} className="btn btn-ghost btn-circle mr-4">
                                <div className="indicator ">
                                    <BsBell className="text-4xl" onClick={() => setClose(true)}></BsBell>
                                    {
                                        OrderViewData.length ? <span className="badge badge-lg indicator-item text-white   bg-red-500 ">{OrderViewData.length}</span> : ''
                                    }

                                </div>
                            </label>

                            <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow z-10">
                                <div className="card-body">
                                    {
                                        close && <>
                                            <span className="font-bold text-3xl text-center">{OrderViewData.length} orders</span>
                                            {/* <span className="text-info">Subtotal: ${total.toFixed(2)}</span> */}
                                            <div className="card-actions">
                                                <Link to='/dashboard/allOrders' className="btn btn-primary btn-block" onClick={() => setClose(false)}>View order</Link>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    }

                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className=" rounded-full">
                                <HiUserCircle className="text-5xl"></HiUserCircle>
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10">
                            <li>
                                <Link to="/"><AiOutlineHome></AiOutlineHome>Home</Link>
                            </li>
                            {user?.emailVerified && <li><Link to='/profile'>
                                <CgProfile></CgProfile> Profile
                                <span className="badge" title={user?.displayName}>{user?.displayName ? user?.displayName.split(' ')[0] : user?.email.split("@")[0]}</span>
                            </Link></li>}
                            {
                                Admin && <li><Link to='/dashboard'><RxDashboard></RxDashboard>Dashboard</Link></li>
                            }
                            {user?.emailVerified ?
                                <li ><button onClick={handleLogOut}> <FiLogOut></FiLogOut>Logout</button></li> :
                                <>
                                    <li><Link to='/register'><SiReacthookform></SiReacthookform>Registration</Link></li>
                                    <li><Link to='/login'><BiLogIn></BiLogIn>Login</Link></li>
                                </>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminNavBar;

/*
<div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        //here
      </ul>
    </div>
    <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a>Item 1</a></li>
      <li tabIndex={0}>
        <details>
          <summary>Parent</summary>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li>
      <li><a>Item 3</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>

*/