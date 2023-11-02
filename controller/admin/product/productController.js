const Product = require("../../../model/productModel")

exports.createProduct = async(req,res)=>{
    const {productName, productPrice,productDescription, productStatus,productStockQty} = req.body
    if(!productName||!productPrice ||!productDescription || !productStatus || !productStockQty ){
        return res.status(404).json({
            message: "Provide productName, productPrice,productDescription, productStatus and productStockQty."
        })
    }
    // insert data into product
    await Product.create({
        productName,
        productDescription,
        productPrice, 
        productStatus,
        productStockQty
    })
    res.status(200).json({
        message: "Product created succesfully."
    })

}