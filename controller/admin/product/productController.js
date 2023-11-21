const Product = require("../../../model/productModel")
const fs = require('fs');

// product create api
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
// get product api
exports.getProducts = async(req,res)=>{
    const products = await Product.find()
    if(products.length == 0){
        res.status(400).json({
            message : "No product found",
            products : []
        })
    }else{
        res.status(200).json({
            message: "Products fetched succesfully",
            products
        })
    }
}

exports.getProduct = async(req,res)=>{
    const id = req.params.id
    if(!id){
        return res.status(400).json({
            message : "Please provide is of the product."
        })
    }
    const product = await Product.find({_id:id})
    if(product.length==0){
        res.status(400).json({
            message : "No product found",
            products : []
        })
    }else{
        res.status(200).json({
            message: "Product fetched succesfully",
            product
        })
    }
}

// delete api
exports.deleteProduct = async(req,res)=>{
    const id = req.params.id
    if(!id){
        return res.status(400).json({
            message: "Provide id of product"
        })
    }
    const productExists = await Product.find({_id:id})
    if(productExists.length==0){
        return res.status(400).json({
            message: "Invalid id"
        }) 
    }
    const oldProductImage = productExists[0].productImage
    const oldProductImageFileName = oldProductImage.slice(22)
    await Product.findByIdAndDelete(id)
    fs.unlink(`uploads/${oldProductImageFileName}`,(err)=>{
        if(err){
            console.log("Error deleting file",err)
        }else{
            console.log("File deleted succesfully")
        }
    })
    res.status(200).json({
        message: "Product deleted successfully"
    })
}


// update api
exports.editProduct = async(req,res)=>{
    const id = req.params.id
    const {productName, productDescription, productPrice, productStatus, productStockQty } = req.body
    if(!productName||!productPrice ||!productDescription || !productStatus || !productStockQty ){
         return res.status(404).json({
            message: "Provide productName, productPrice,productDescription, productStatus and productStockQty."
        })
    }
    const oldData = await Product.findById(id)
    if(!oldData){
        return res.status(400).json({
            message: "No data found with that id"
        })
    }
    const oldProductImage= oldData.productImage
    const oldProductImageFileName = oldProductImage.slice(22)
    console.log(oldProductImageFileName)
    if(req.file && req.file.filename){
        fs.unlink(`uploads/${oldProductImageFileName}`,(err)=>{
            if(err){
                console.log("Error deleting file",err)
            }else{
                console.log("File deleted succesfully")
            }
        })
    }
    await Product.findByIdAndUpdate(id,{
        productName,
        productDescription,
        productPrice, 
        productStatus,
        productStockQty,
        productImage :req.file && req.file.filename? `http://localhost:${process.env.PORT}/${req.file.filename}` :oldProductImage
    })
    res.status(200).json({
        message: " Product updated successfully"
    })
}

