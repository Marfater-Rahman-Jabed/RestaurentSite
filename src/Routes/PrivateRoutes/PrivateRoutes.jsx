import { useContext } from "react";
import { AuthContexts } from "../../Contexts/Contexts";
import { Navigate, useLocation, } from "react-router-dom";
import BigLoading from "../../Components/Loading/BigLoading";

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContexts)
    const location = useLocation()
    // const navigate = useNavigate()
    if (loading) {
        return <BigLoading></BigLoading>
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;


};

export default PrivateRoutes;