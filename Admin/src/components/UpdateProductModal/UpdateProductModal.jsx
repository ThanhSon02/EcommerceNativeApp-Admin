/* eslint-disable react/prop-types */
import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import { useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import { updateProduct } from "../../service/productService";

const category = [
    {
        value: "Audio",
        label: "Audio",
    },
    {
        value: "Drones + Electronics",
        label: "Drones + Electronics",
    },
    {
        value: "Photo + Video",
        label: "Photo + Video",
    },
    {
        value: "Gaming + VR",
        label: "Gaming + VR",
    },
    {
        value: "Networking",
        label: "Networking",
    },
    {
        value: "Notebooks + PCs",
        label: "Notebooks + PCs",
    },
    {
        value: "Smartphones + Tablets",
        label: "Smartphones + Tablets",
    },
    {
        value: "TV + Home cinema",
        label: "TV + Home cinema",
    },
];

function UpdateProductModal({ formRef, currentData }) {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.auth.auth.accessToken);
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
        console.log(formInfo);
        const productUpdate = {
            ...formInfo,
            imgUpdate: imgBase64,
            book_img: currentData.product_img,
            _id: currentData._id,
        };

        dispatch(updateProduct({ productUpdate, accessToken }));
    };

    const field = [
        {
            name: ["product_name"],
            value: currentData.product_name,
        },
        {
            name: ["category"],
            value: currentData.category,
        },
        {
            name: ["in_stock"],
            value: currentData.in_stock,
        },
        {
            name: ["selled"],
            value: currentData.selled,
        },
        {
            name: ["discount"],
            value: currentData.discount,
        },
        {
            name: ["price"],
            value: currentData.price,
        },
        {
            name: ["description"],
            value: currentData.description,
        },
        {
            name: ["imgUpdate"],
            value: currentData.producr_img,
        },
    ];

    return (
        <Form
            fields={field}
            ref={formRef}
            className="mt-8"
            labelCol={{ span: 3 }}
            onFinish={onSubmitForm}>
            <Form.Item
                labelAlign="left"
                name={"product_name"}
                label="Tên sản phẩm">
                <Input required />
            </Form.Item>

            <Form.Item labelAlign="left" name={"category"} label="Danh mục">
                <Select
                    placeholder="Chọn danh mục"
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

            <Form.Item labelAlign="left" name={"discount"} label="Khuyến mại">
                <InputNumber
                    required
                    min={0}
                    max={100}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace("%", "")}
                />
            </Form.Item>

            <Form.Item labelAlign="left" name={"description"} label="Mô tả">
                <ReactQuill></ReactQuill>
            </Form.Item>
            <Form.Item labelAlign="left" name={"imgUpdate"} label="Ảnh">
                <Upload
                    maxCount={1}
                    beforeUpload={() => false}
                    onChange={(e) => handleUploadFile(e.file)}>
                    {currentData.product_img ? (
                        <img
                            src={imgBase64 || currentData.product_img}
                            alt="avatar"
                            style={{
                                aspectRatio: "180/180",
                                height: 180,
                            }}
                        />
                    ) : (
                        <Button icon={<UploadOutlined />}>
                            Click to Upload
                        </Button>
                    )}
                </Upload>
            </Form.Item>
        </Form>
    );
}

export default UpdateProductModal;
