import { Button, Modal, Space, Spin, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProduct } from "../service/productService";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UpdateProductModal from "../components/UpdateProductModal/UpdateProductModal";

function Dashboard() {
    const columns = [
        {
            title: "Tên sản phẩm",
            key: "product_name",
            dataIndex: "product_name",
        },
        {
            title: "Danh mục",
            key: "category",
            dataIndex: "category",
        },
        {
            title: "Ảnh",
            key: "product_img",
            dataIndex: "product_img",
            render: (_, record) => (
                <img width={32} height={48} src={record.product_img} />
            ),
        },
        {
            title: "Số lượng",
            key: "in_stock",
            dataIndex: "in_stock",
            render: (_, record) => (
                <span style={{ color: "green", fontWeight: 500 }}>
                    {record.in_stock}
                </span>
            ),
        },
        {
            title: "Giá",
            key: "price",
            dataIndex: "price",
            render: (_, record) => (
                <span style={{ color: "green", fontWeight: 500 }}>
                    <span>$</span>
                    {record.price}
                </span>
            ),
        },
        {
            title: "Giảm giá",
            key: "discount",
            dataIndex: "discount",
            render: (_, record) => (
                <span style={{ color: "green", fontWeight: 500 }}>
                    {record.discount}
                    <span>%</span>
                </span>
            ),
        },
        {
            title: "Đã bán",
            dataIndex: "selled",
            key: "selled",
            render: (_, record) => (
                <span style={{ color: "crimson", fontWeight: 500 }}>
                    {record.selled}
                </span>
            ),
        },
        {
            title: "Tuỳ chọn",
            key: "option",
            render: () => (
                <Space size="middle">
                    <a
                        onClick={showModalUpdate}
                        className="update-book-btn text-blue-600">
                        <EditOutlined />
                    </a>
                    <a
                        onClick={showModalDelete}
                        className="delete-book-btn text-rose-500">
                        <DeleteOutlined />
                    </a>
                </Space>
            ),
        },
    ];

    const dispatch = useDispatch();

    const data = useSelector((state) => state.product.allProduct);
    const isLoading = useSelector((state) => state.product.isLoading);
    const accessToken = useSelector((state) => state.auth.auth.accessToken);

    const [rowSelected, setRowSelected] = useState("");
    const [openDelete, setOpenDelete] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);

    const updateFormRef = useRef();

    useEffect(() => {
        dispatch(getAllProduct());
    }, []);

    // Delete section start
    const showModalDelete = () => {
        setOpenDelete(true);
    };

    const hideModalDelete = () => {
        setOpenDelete(false);
    };

    const handleDeleteBook = () => {
        dispatch(deleteProduct({ product_id: rowSelected._id, accessToken }));
        hideModalDelete();
    };
    // Delete section end

    // Update section start
    const showModalUpdate = () => {
        setOpenUpdate(true);
    };

    const hideModalUpdate = () => {
        setOpenUpdate(false);
    };

    const handleUpdateBook = () => {
        updateFormRef.current.submit();
        if (!isLoading) {
            hideModalUpdate();
        }
    };

    // Update section end

    return (
        <Spin size="large" style={{ width: "100%" }} spinning={isLoading}>
            <Table
                title={() => (
                    <h3 className="text-lg font-semibold">
                        Danh sách sản phẩm
                    </h3>
                )}
                dataSource={data}
                columns={columns}
                style={{ width: "100%" }}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            setRowSelected(record);
                        },
                    };
                }}
            />
            <Modal
                okText="Xoá"
                cancelText="Huỷ"
                open={openDelete}
                onOk={handleDeleteBook}
                onCancel={hideModalDelete}
                okType="default">
                <h3>Bạn có chắc muốn xoá sản phẩm này?</h3>
            </Modal>

            <Modal
                width={800}
                title="Chỉnh sửa sản phẩm"
                open={openUpdate}
                onCancel={hideModalUpdate}
                footer={[
                    <Button key={"cancel"} onClick={hideModalUpdate}>
                        Huỷ
                    </Button>,
                    <Button
                        className="bg-sky-500 text-gray-100 "
                        key={"update"}
                        type="default"
                        onClick={handleUpdateBook}>
                        Cập nhật
                    </Button>,
                ]}>
                <UpdateProductModal
                    formRef={updateFormRef}
                    currentData={rowSelected}
                />
            </Modal>
        </Spin>
    );
}

export default Dashboard;
