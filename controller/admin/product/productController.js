const Product = require("../../../model/productModel")

exports.createProduct = async(req,res)=>{
    const file = req.file
    let filePath
    if(!file){
        filePath = "https://th.bing.com/th/id/OIP.PbvnSZi33pv6KoKOZz-E_wHaHa?rs=1&pid=ImgDetMain"
    }
    else filePath = `http://localhost:${process.env.PORT}/${file.filename}`
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
        productStockQty,
        productImage :filePath
    })
    res.status(200).json({
        message: "Product created succesfully."
    })

}