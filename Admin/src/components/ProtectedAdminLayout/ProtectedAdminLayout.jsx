import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedAdminLayout() {
    const auth = useSelector((state) => state.auth.auth);

    if (auth?.userInfo?.isAdmin) {
        return (
            <>
                <Outlet />
            </>
        );
    } else {
        return <Navigate to={"/not_admin"} />;
    }
}

export default ProtectedAdminLayout;
