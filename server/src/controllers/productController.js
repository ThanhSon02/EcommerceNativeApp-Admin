const cloudinary = require("cloudinary").v2;
const Product = require("../models/productModal");

class productController {
    createProduct = async (req, res) => {
        try {
            const {
                product_name,
                price,
                in_stock,
                category,
                discount,
                description,
                product_img,
            } = req.body;
            const imgUrl = await cloudinary.uploader.upload(product_img, {
                folder: "product_image",
                resource_type: "image",
            });
            const productCreated = await Product.create({
                product_name,
                price,
                product_img: imgUrl.url,
                in_stock,
                discount,
                category,
                description,
            });
            if (productCreated) {
                return res.status(200).json({
                    message: "Adding successfull!",
                    productCreated,
                });
            } else {
                return res.status(401).json({
                    message: "Adding failure!",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // get all book
    getAllProduct = async (req, res) => {
        try {
            const productList = await Product.find({});
            res.status(200).json({ allProduct: productList });
        } catch (error) {
            res.status(401).json({
                message: "Get all product failure",
            });
        }
    };

    // delete book
    deleteProduct = async (req, res) => {
        console.log(req.body);
        try {
            const product_id = req.body.product_id;
            const productDeleted = await Product.findByIdAndDelete(product_id);
            res.status(200).json({
                message: "Delete successfull",
                productDeleted: productDeleted._id,
            });
        } catch (error) {
            res.status(403).json({
                message: "Delete failure",
            });
        }
    };

    // update book
    updateProduct = async (req, res) => {
        try {
            const {
                _id,
                product_name,
                price,
                in_stock,
                category,
                discount,
                description,
                imgUpdate,
                product_img,
            } = req.body;
            let imgUrl;
            if (imgUpdate !== "") {
                imgUrl = await cloudinary.uploader.upload(imgUpdate, {
                    folder: "product_image",
                    resource_type: "image",
                });
            }
            const productUpdated = await Product.findByIdAndUpdate(
                _id,
                {
                    product_name,
                    price,
                    in_stock,
                    category,
                    discount,
                    description,
                    product_img: imgUrl ? imgUrl.url : product_img,
                },
                {
                    returnDocument: "after",
                }
            );
            res.status(200).json({
                message: "Update product successfully",
                productUpdated,
            });
        } catch (error) {
            res.status(401).json({
                message: "Update failure",
            });
        }
    };

    getProductByCategory = async (req, res) => {
        try {
            const category = req.params.type;
            const result = await Product.find({ category: category });
            res.status(200).json({
                productList: result,
            });
        } catch (error) {
            res.status(401).json({
                message: "Can't get this category",
            });
        }
    };

    getProductDeal = async (req, res) => {
        try {
            const result = await Product.find({ discount: { $gt: 0 } });
            res.status(200).json({
                dealList: result,
            });
        } catch (error) {
            res.status(401).json({
                message: "Has no deal today!",
            });
        }
    };

    getProductByKeyword = async (req, res) => {
        try {
            const keyword = req.params.keyword;
            const result = await Product.find({
                product_name: new RegExp(keyword),
            });
            res.status(200).json({
                result,
            });
        } catch (error) {
            res.status(401).json({
                message: `Has no produect contain ! ${keyword}`,
            });
        }
    };
}

module.exports = new productController();
