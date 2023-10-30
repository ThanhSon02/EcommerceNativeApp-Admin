import { Spin, Table, Tag } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../service/orderService";

const columns = [
    {
        title: "Mã đơn hàng",
        dataIndex: "_id",
        key: "_id",
        render: (text) => <div style={{ color: "blue" }}>{text}</div>,
    },
    {
        title: "Người mua",
        dataIndex: "user",
        key: "user",
        render: (user) => <span>{user.name}</span>,
    },
    Table.EXPAND_COLUMN,
    {
        title: "Đơn mua",
        dataIndex: "orderItems",
        key: "orderItems",
        render: (record) => {
            return <span>{record.length} sản phẩm</span>;
        },
    },
    {
        title: "Tổng đơn hàng",
        dataIndex: "totalOrder",
        key: "totalOrder",
        render: (price) => (
            <span style={{ color: "red", fontWeight: "bold" }}>{price}</span>
        ),
    },
    {
        title: "Trạng thái thanh toán",
        key: "isPaid",
        dataIndex: "isPaid",
        render: (isPaid) => (
            <Tag>{isPaid ? "Đã thanh toán" : "Chưa thanh toán"}</Tag>
        ),
    },
    {
        title: "Trạng thái",
        key: "isDelivered",
        dataIndex: "isDelivered",
        render: (isDelivered) => {
            if (isDelivered) {
                return (
                    <Tag style={{ cursor: "default" }} color="green">
                        Hoàn thành
                    </Tag>
                );
            } else {
                return (
                    <Tag style={{ cursor: "default" }} color="blue">
                        Vận chuyển
                    </Tag>
                );
            }
        },
    },
];

function OrderPage() {
    const dispatch = useDispatch();
    // const orderList = useSelector((state) => state.orders.orderList);
    const accessToken = useSelector((state) => state.auth.auth.accessToken);

    useEffect(() => {
        dispatch(getAllOrder({ accessToken }));
    }, []);
    return (
        <Spin size="large" style={{ width: "100%" }}>
            <Table
                title={() => (
                    <h3 className="text-lg font-semibold">
                        Danh sách đơn hàng
                    </h3>
                )}
                columns={columns}
                style={{ width: "100%" }}
                // onRow={(record) => {
                //     return {
                //         onClick: () => {},
                //     };
                // }}
            />
        </Spin>
    );
}

export default OrderPage;
