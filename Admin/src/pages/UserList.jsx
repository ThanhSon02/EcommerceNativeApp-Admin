import { Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteUser, getAllUser } from "../service/userService";

function UserList() {
    const renderAction = () => (
        <Space size="middle">
            <a style={{ color: "red" }} onClick={showModalDelete}>
                <DeleteOutlined />
            </a>
        </Space>
    );
    const columns = [
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            render: (text) => <span>{text}</span>,
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Địa chỉ",
            key: "address",
            dataIndex: "address",
        },
        {
            title: "Loại tài khoản",
            dataIndex: "isAdmin",
            render: (_, { isAdmin }) => {
                if (isAdmin) {
                    return (
                        <span style={{ color: "green", fontWeight: 500 }}>
                            True
                        </span>
                    );
                } else {
                    return (
                        <span style={{ color: "red", fontWeight: 500 }}>
                            False
                        </span>
                    );
                }
            },
        },
        {
            title: "Tuỳ chọn",
            key: "option",
            render: renderAction,
        },
    ];

    const dispatch = useDispatch();
    const userList = useSelector((state) => state.users.userList);
    const accessToken = useSelector((state) => state.auth.auth.accessToken);
    const [rowSelected, setRowSelected] = useState("");
    const [openDelete, setOpenDelete] = useState(false);

    const showModalDelete = () => {
        setOpenDelete(true);
    };

    const hideModalDelete = () => {
        setOpenDelete(false);
    };

    useEffect(() => {
        dispatch(getAllUser({ accessToken }));
    }, []);

    const handleDeleteUser = () => {
        dispatch(deleteUser({ userID: rowSelected, accessToken }));
        hideModalDelete();
    };

    return (
        <>
            <Table
                style={{ width: "100%" }}
                columns={columns}
                dataSource={userList}
                title={() => (
                    <h3 className="text-lg font-semibold">Tất cả người dùng</h3>
                )}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            setRowSelected(record._id);
                        },
                    };
                }}
            />
            <Modal
                okText="Xoá"
                cancelText="Huỷ"
                open={openDelete}
                // onOk={handleDeleteUser}
                onCancel={hideModalDelete}>
                <h3>Bạn có chắc muốn xoá tài khoản này?</h3>
            </Modal>
        </>
    );
}

export default UserList;
