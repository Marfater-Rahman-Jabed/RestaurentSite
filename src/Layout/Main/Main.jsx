import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import useAdmin from "../../Hooks/useAdmin";
import { useContext } from "react";
import { AuthContexts } from "../../Contexts/Contexts";
import AdminNavBar from "../../Components/NavBar/AdminNavBar";
import '../../../src/Pages/Home/Home.css'

const Main = () => {
    const { user } = useContext(AuthContexts)
    const [Admin] = useAdmin(user?.email)
    return (
        <div className="">
            {Admin ? <AdminNavBar></AdminNavBar> : <NavBar></NavBar>}
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;