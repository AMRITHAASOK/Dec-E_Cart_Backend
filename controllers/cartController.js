//import cart collection
const carts = require('../models/cartSchema')

//add to cart
 exports.addtocart = async(req,res)=>{
    //get products details from request
    const{ id,title,price,image,quantity} =req.body

    //logic
    try{
        //check if product is already in cart
        const product=await carts.findOne({id})
        if(product){
           //product is in cart,Increment product quantity
            product.quantity+=1
            //update grand total in mongodb
            product.grandTotal=product.price*product.quantity
            //to save changes in mongodb
            product.save()
            //send response to the client
            res.status(200).json("Product added to the cart")
        }
        else{
            //product is not available in the cart
            //add product to the cart
            const newProduct = new carts({id,title,price,image,quantity,grandTotal:price})
            //save new product
            await newProduct.save()
            //send response to the client
            res.status(200).json("Product added to the cart")
        }
    }
    catch(error){
    res.status(401).json(error)
    }
 }

 //get cart product
 exports.getcart=async (req,res)=>{
    //get all products from carts collection
    try{
        const allitems=await carts.find()
        res.status(200).json(allitems)
    }
    catch(error){
        res.status(401).json(error)
    }
 }

 //remove a product from cart
 exports.removecartitems=async(req,res)=>{
    //get product id from request params
    const{id}=req.params
    try{
        //remove an item from cart
        const removeProduct=await carts.deleteOne({id})
        if(removeProduct.deletedCount!=0){
            //get remaining products
            const remainingproducts=await carts.find()
            res.status(200).json(remainingproducts)
        }
        else{
            res.status(404).json("Item not found")
        }
    }
    catch(error){
        res.status(404).json(error)
    }
 }

 //increment cart item count
 exports.incrementcount=async(req,res)=>{
    //get product id from request params
    const{id}=req.params
    try{
        //check if product in the cart
        const product=await carts.findOne({id})
        if(product){
            //increment product count and grand total
            product.quantity+=1
            product.grandTotal=product.price*product.quantity
            //save changes in mongodb
            await product.save()
        //increment,get all the products from the cart after updating in 
        //particular cart items
        const allitems=await carts.find()
        res.status(200).json(allitems)
        }
        else{
            res.status(404).json("Item not found")
        }
    }
    catch(error){
        res.status(404).json(error)
    }
 }

 //decrement cart item count
 exports.decrementcount=async(req,res)=>{
    //get product id from request params
    const{id}=req.params
    try{
        //check if product in the cart
        const product=await carts.findOne({id})
        if(product){
            //increment product count and grand total
            product.quantity-=1
            if(product.quantity==0){
                //remove product from cart
                await carts.deleteOne({id})
                const allitems=await carts.find()
                res.status(200).json(allitems)
            }
            else{
                product.grandTotal=product.price*product.quantity
                //save changes in mongodb
                await product.save()
            //increment,get all the products from the cart after updating in 
            //particular cart items
            const allitems=await carts.find()
            res.status(200).json(allitems)
            }
       
        }
        else{
            res.status(404).json("Item not found")
        }
    }
    catch(error){
        res.status(404).json(error)
    }
 }