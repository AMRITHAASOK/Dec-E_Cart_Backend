//import wishlist collection
const wishlists=require('../models/wishlistSchema')

//add to wishlist logic

exports.addtowishlist =async (req,res)=>{
    //get product details from request

   //using destructuring

   const {id,title,price,image}=req.body

    //logic
    try{
        //check if the product in the mongodb
        const item=await wishlists.findOne({id})
        if(item){
            res.status(403).json("Item already exists in Wishlist")
        }
        else{
            //add the item to the wishlist
            const newProduct=new wishlists({id,title,price,image})
            //to store in the mongodb 
            await newProduct.save()
            res.status(200).json("Product added to the wishlist")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}

//get  wishlist data - logic
exports.getWishlistitems=async(req,res)=>{
    //logic
    try{
        //get all wishlist items from the mongo db
        const allWishlistItems = await wishlists.find()
        res.status(200).json(allWishlistItems)

    }
    catch(error){
        res.status(401).json(error)
    }
}

//remove wishlist items - logic
exports.removeWishlistitems=async(req,res)=>{
    //get id from the request
    const {id}=req.params
    try{
        const removewishlistitem = await wishlists.deleteOne({id})
        if(removewishlistitem){
            //get all wishlists items after removing particular wishlist item
            const allWishlists = await wishlists.find()//remaining wishlist items
            res.status(200).json(allWishlists)
        }
        else{
            res.status(404).json("Item not found")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}