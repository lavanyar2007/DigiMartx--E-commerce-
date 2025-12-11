const express = require("express");
const fs=require("fs");
const router = express.Router();



//to get all products
router.get("/",(req,res)=>{
    const products = JSON.parse(fs.readFileSync("data/products.json", "utf-8"));
    res.json(products);
})

//to get a single product
router.get("/:id",(req,res)=>{
    const products = JSON.parse(fs.readFileSync("data/products.json", "utf-8"));
    const product=products.find((p)=>{
         return p.id===parseInt(req.params.id);     
    });
    if(product){
      res.json(product);
    }
    else{
        res.status(404).json({message:"product not found"});
    }
})

//to delete a product
router.delete("/:id",(req,res)=>{
    const products = JSON.parse(fs.readFileSync("data/products.json", "utf-8"));
    const updatedProducts=products.filter((p)=>{
        return p.id!==parseInt(req.params.id);
    })
    fs.writeFileSync("./data/products.json",JSON.stringify(updatedProducts,null,2));
    if(updatedProducts.length === products.length){
    return res.status(404).json({message:"Product not found"});
    }
    else{
         res.status(200).json({message:"Product deleted"});
    }

   
    
})

//to add or update a product

router.post(('/'),(req,res)=>{

    const products = JSON.parse(fs.readFileSync("data/products.json", "utf-8"));
    const maxId = Math.max(...products.map(p => p.id), 0);
    const newProduct = {
        id: + maxId + 1,
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description
    };
    // Update list
    const updatedProducts = [...products, newProduct];
    // Save file
    fs.writeFileSync("data/products.json", JSON.stringify(updatedProducts, null, 2));
    res.status(201).json({ message: "Product created successfully", newProduct });
    
});


module.exports=router;
