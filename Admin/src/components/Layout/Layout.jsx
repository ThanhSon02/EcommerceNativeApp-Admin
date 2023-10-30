import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";

function Layout() {
    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-gray-100 h-screen">
                <Outlet />
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={1000}
                hideProgressBar={true}
                newestOnTop={false}
                rtl={false}
                pauseOnHover={false}
                draggable
                theme="colored"
            />
        </>
    );
}

export default Layout;
