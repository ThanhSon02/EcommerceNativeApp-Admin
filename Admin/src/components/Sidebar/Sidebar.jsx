/*eslint-disable*/
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../service/authService";

export default function Sidebar() {
    const href = useLocation();
    const path = href.pathname;
    const accessToken = useSelector((state) => state.auth.auth.accessToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <>
            <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
                <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
                    {/* Brand */}
                    <Link
                        className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                        to="/dashboard">
                        Admin Page
                    </Link>

                    <div
                        className={
                            "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded "
                        }>
                        {/* Divider */}
                        <hr className="my-4 md:min-w-full" />
                        {/* Navigation */}

                        <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                            <li className="items-center">
                                <Link
                                    className={
                                        "text-xs uppercase py-3 font-bold block " +
                                        (path == "/dashboard"
                                            ? "text-teal-300 hover:text-teal-500"
                                            : "text-stone-700 hover:text-stone-500")
                                    }
                                    to="/dashboard">
                                    Dashboard
                                </Link>
                            </li>

                            <li className="items-center">
                                <Link
                                    className={
                                        "text-xs uppercase py-3 font-bold block " +
                                        (path == "/product"
                                            ? "text-teal-300 hover:text-teal-500"
                                            : "text-stone-700 hover:text-stone-500")
                                    }
                                    to="/product">
                                    Thêm sản phẩm
                                </Link>
                            </li>

                            <li className="items-center">
                                <Link
                                    className={
                                        "text-xs uppercase py-3 font-bold block " +
                                        (path == "/users"
                                            ? "text-teal-300 hover:text-teal-500"
                                            : "text-stone-700 hover:text-stone-500")
                                    }
                                    to="/users">
                                    Danh sách tài khoản
                                </Link>
                            </li>

                            {/* <li className="items-center">
                                <Link
                                    className={
                                        "text-xs uppercase py-3 font-bold block " +
                                        (path == "/orders"
                                            ? "text-teal-300 hover:text-teal-500"
                                            : "text-stone-700 hover:text-stone-500")
                                    }
                                    to="/orders">
                                    Đơn hàng
                                </Link>
                            </li> */}
                            <li className="items-center">
                                <button
                                    onClick={() => {
                                        dispatch(
                                            logout({ accessToken, navigate })
                                        );
                                        navigate("/");
                                    }}
                                    className="text-xs uppercase py-3 font-bold block text-stone-700 hover:text-stone-500">
                                    Đăng xuất
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
