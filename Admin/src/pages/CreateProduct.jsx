import { Button, Card, Form, Input, InputNumber, Select, Upload } from "antd";
import "react-quill/dist/quill.snow.css";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../service/productService";

const category = [
    {
        value: "Audio",
        label: "Audio",
    },
    {
        value: "Drones+Electronics",
        label: "Drones + Electronics",
    },
    {
        value: "Photo+Video",
        label: "Photo + Video",
    },
    {
        value: "Gaming+VR",
        label: "Gaming + VR",
    },
    {
        value: "Networking",
        label: "Networking",
    },
    {
        value: "Notebooks+PCs",
        label: "Notebooks + PCs",
    },
    {
        value: "Smartphones+Tablets",
        label: "Smartphones + Tablets",
    },
    {
        value: "TV+Homecinema",
        label: "TV+Homecinema",
    },
];

function CreateProduct() {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.auth.auth.accessToken);
    const [form] = Form.useForm();
    const [imgBase64, setImgBase64] = useState("");
    const getBase64 = (img) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setImgBase64(reader.result);
        });
        if (img) {
            reader.readAsDataURL(img);
        }
    };

    const handleUploadFile = (file) => {
        if (file.status !== "removed") {
            getBase64(file);
        }
    };

    const onSubmitForm = (formInfo) => {
        const productInfo = {
            ...formInfo,
            product_img: imgBase64,
        };
        dispatch(createProduct({ productInfo, accessToken }));
        form.resetFields();
    };

    return (
        <Card title={<h4>Thêm sản phẩm</h4>}>
            <Form labelCol={{ span: 3 }} form={form} onFinish={onSubmitForm}>
                <Form.Item
                    labelAlign="left"
                    name={"product_name"}
                    label="Tên sản phẩm">
                    <Input required />
                </Form.Item>

                <Form.Item labelAlign="left" name={"category"} label="Danh mục">
                    <Select
                        placeholder="Chọn danh mục"
                        defaultValue={"Audio"}
                        allowClear
                        options={category}
                    />
                </Form.Item>

                <Form.Item labelAlign="left" name={"price"} label="Giá">
                    <InputNumber
                        min={0}
                        max={100000000}
                        formatter={(value) => `${value}$`}
                        parser={(value) => value.replace("$", "")}
                        required
                    />
                </Form.Item>

                <Form.Item labelAlign="left" name={"in_stock"} label="Số lượng">
                    <InputNumber required min={0} max={1000} />
                </Form.Item>

                <Form.Item
                    labelAlign="left"
                    name={"discount"}
                    label="Khuyến mại">
                    <InputNumber
                        required
                        min={0}
                        max={100}
                        formatter={(value) => `${value}%`}
                        parser={(value) => value.replace("%", "")}
                    />
                </Form.Item>

                <Form.Item labelAlign="left" name={"description"} label="Mô tả">
                    <textarea
                        placeholder="Mô tả"
                        className="p-3 border rounded w-full resize-none outline-[1px] hover:border-cyan-600 focus-visible:outline-cyan-600 focus-visible:border-0"
                        rows={10}></textarea>
                </Form.Item>
                <Form.Item labelAlign="left" name={"product_img"} label="Ảnh">
                    <Upload
                        maxCount={1}
                        beforeUpload={() => false}
                        onChange={(e) => handleUploadFile(e.file)}>
                        <Button icon={<UploadOutlined />}>
                            Click to Upload
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="default">
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default CreateProduct;
