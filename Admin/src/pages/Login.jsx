import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { login } from "../service/authService";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function Login() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const handleSubmitForm = (loginInfo) => {
        dispatch(login({ loginInfo, navigate }));
        form.resetFields();
    };
    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-slate-100">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700">
                    Sign in
                </h1>
                <Form
                    form={form}
                    onFinish={handleSubmitForm}
                    className="mt-6"
                    layout="vertical">
                    <Form.Item
                        name={"email"}
                        label={
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-800">
                                Email
                            </label>
                        }>
                        <Input
                            type="email"
                            required
                            className="w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </Form.Item>
                    <Form.Item
                        name={"password"}
                        label={
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-800">
                                Password
                            </label>
                        }>
                        <Input.Password
                            required
                            className="w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            size="large"
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
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
        </div>
    );
}

export default Login;
