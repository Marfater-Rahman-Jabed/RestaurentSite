import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// import { AuthContexts } from '../../Contexts/AuthContext';
// import useAdmin from '../../Hooks/useAdmin';
// import Loading from '../../Components/Loading/BigLoading';
import useAdmin from '../../Hooks/useAdmin';
import BigLoading from '../../Components/Loading/BigLoading';
import { AuthContexts } from '../../Contexts/Contexts';

const AdminRoutes = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useContext(AuthContexts);
    const [Admin, adminLoading] = useAdmin(user?.email);
    // console.log(admin)
    if (loading || adminLoading) {
        return <BigLoading></BigLoading>
    }
    if (user && Admin) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;

};

export default AdminRoutes;