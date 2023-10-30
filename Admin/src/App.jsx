import { Route, Routes } from "react-router";
import Layout from "./components/Layout/Layout";
import ProtectedAdminLayout from "./components/ProtectedAdminLayout/ProtectedAdminLayout";
import Dashboard from "./pages/Dashboard";
import CreateProduct from "./pages/CreateProduct";
import OrderPage from "./pages/OrderPage";
import Login from "./pages/Login";
import NotAdminPage from "./pages/NotAdminPage";
import UserList from "./pages/UserList";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/not_admin" element={<NotAdminPage />} />
            <Route element={<ProtectedAdminLayout />}>
                <Route element={<Layout />}>
                    <Route index path="/dashboard" element={<Dashboard />} />
                    <Route path="/product" element={<CreateProduct />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/orders" element={<OrderPage />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
