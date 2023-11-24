const Review = require("../../model/reviewModel")
const Product = require("../../model/productModel")
exports.createReview = async (req,res)=>{
    const userId = req.user.id
    const {rating, message} = req.body
    const productId = req.params.id
    if(!rating||!message||!productId){
        return res.status(404).json({
            message: "Provide rating, message and product id"
        })
    }

    // checking if product exist or not
    const productExist = await Product.findById(productId)
    if(!productExist){
        return res.status(404).json({
            message: "No product of that id"
        })
    }
    const reviewExists = await Review.find({userId,productId})
    if(reviewExists.length>0){
        return res.status(400).json({
            message:" Review already exists"
        })
    }
    await Review.create({
        userId,
        rating,
        message, 
        productId,

    })
    res.status(200).json({
        message: "Review created successfully", 

    })

}

exports.getProductReview = async(req,res)=>{
    const productId = req.params.id
    if(!productId){
        return res.status(400).json({
            message: "Please provide productId"
        })
    }
    const productExist = await Product.findById(productId)
    if(!productExist){
        return res.status(404).json({
            message: "No product of this  productId"
        })
    }
    const reviews = await Review.find({productId}).populate("userId")//join garna ko lagi ho...
    if(reviews.length==0){
        return res.status(404).json({
            message: "No review for this product"
        })
    }
    res.status(200).json({
        message: " Review fetched successfully",
        data : reviews
    })
}

exports.deleteReview = async(req,res)=>{
    const reviewId = req.params.id
    if(!reveiwId){
        return res.status(400).json({
            message: "Please provide reviewId"
        })
    }
    const review = await Review.findById(reviewId)
    if (!review) {
        return res.status(404).json({
            message: "No review with this ID found"
        })
    }
    await Review.findByIdAndDelete(reviewId)
    res.status(200).json({
        message: "Review delete succesfully",
    })
}

exports.addProductReview  = async(req,res)=>{
    const productId = req.params.id
    const {rating,message} = req.body
    const userId = req.user.id
    
    const product = await Product.findById(productId)
    product.reviews.push({
        message,
        rating,
        userId
    })
    await product.save()
    res.json({
        message: "Review Done"
    })
}