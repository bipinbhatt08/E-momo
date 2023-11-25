const Product = require("../../model/productModel")
const Review = require("../../model/reviewModel")

// get product api
exports.getProducts = async(req,res)=>{
    // Join ko second way ko lagi gareko thim 
    // const products = await Product.find().populate({
    //     path : "reviews",
    //     populate : {
    //         path: "userId",
    //         select : "username userEmail"
    //     }


    // })
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


exports.getProductReview = async(req,res)=>{
    const productId = req.params.id
    if(!productId){
        return res.status(400).json({
            message: "Please provide productId"
        })
    }
    const product= await Product.findById(productId)
    if(!product){
        return res.status(404).json({
            message: "No product of this  productId",
            productReviews : [],
            product : []
        })
    }
    const productReviews = await Review.find({productId}).populate("userId")//join garna ko lagi ho...
    if(productReviews.length==0){
        return res.status(404).json({
            message: "No review for this product",
            productReviews : [],
            product
        })
    }
    res.status(200).json({
        message: " Review fetched successfully",
        productReviews 
    })
}
