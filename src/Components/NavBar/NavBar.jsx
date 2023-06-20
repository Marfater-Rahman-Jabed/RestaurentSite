import { HiUserCircle } from "react-icons/hi";
import Logos from "../../assets/Logo/Logo.jpg"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContexts } from "../../Contexts/Contexts";
import { useQuery } from "react-query";


const NavBar = () => {
  const { user, LogOut } = useContext(AuthContexts)

  const { data: cartData = [], refetch } = useQuery({
    queryKey: ['cartData'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/myCart?email=${user?.email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = res.json();
      return data;
    },
    // refetch()
  })

  refetch(`http://localhost:5000/myCart?email=${user?.email}`)

  const handleLogOut = () => {
    LogOut()
      .then(() => {
        console.log('logged out')
      })
      .catch(error => console.log(error))
  }

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 100 }}>
      <div className="navbar  bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 " >
        <div className="flex-1">
          <img src={Logos} alt="" className="rounded-full h-16 invisible lg:visible md:visible w-0 lg:w-16 md:w-16 " />
          <Link className="font-serif lg:text-4xl text-3xl font-bold text-fuchsia-700 lg:ms-4 md:ms-4  " to="/"><i>Hungry  <span className="text-pink-700">Cafe</span></i></Link>



        </div>
        <Link to="/" className="me-6 text-xl font-serif font-bold invisible lg:visible md:visible text-fuchsia-700 "><i>Home</i></Link>
        <div className="flex-none">

          <div className="dropdown dropdown-end print:hidden">

            <label tabIndex={0} className="btn btn-ghost btn-circle mr-6">
              <div className="indicator ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 " fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span className="badge badge-md indicator-item text-white   bg-red-500 ">{cartData.length}</span>
              </div>
            </label>
            <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow z-10">
              <div className="card-body">
                <span className="font-bold text-lg">{cartData.length} Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">View cart</button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className=" rounded-full">
                <HiUserCircle className="text-5xl"></HiUserCircle>
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li><a className="justify-between">
                Profile
                <span className="badge" title={user?.displayName}>{user?.displayName ? user?.displayName.split(' ')[0] : user?.email.split("@")[0]}</span>
              </a></li>
              <li><a>Settings</a></li>
              {user ?
                <li><button onClick={handleLogOut}>Logout</button></li> :
                <>
                  <li><Link to='/register'>Register</Link></li>
                  <li><Link to='/login'>Login</Link></li>
                </>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

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