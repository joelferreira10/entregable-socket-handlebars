import { Router } from "express";
import { __dirname } from "../utils.js";
import ManagerProducts from "../manager/managerProducts.js";
import { socketServer } from "../app.js";
const router=Router();

const manager=new ManagerProducts(__dirname+"/data/products.json")
router.get('/',async(req,res)=>{
    
    res.render('index')
})
router.get('/realtimeproducts',async(req,res)=>{
    try{
        console.log("entro en el realtime")
        const products=await manager.getProducts()
        console.log(products)
        res.render('realTimeProducts',{products})
    }
    catch(err){console.log(err)}
})
router.post('/',async(req,res)=>{
    try{
        console.log("entre en el post")
        const product=req.body
        await manager.addProducts(product)
        console.log(product)
    }catch(err){
        console.log("Error adding product", err);
    }
    
})
router.delete('/:pid', async(req,res)=>{
    try {
        
        const {pid}=req.params
        const prod=await manager.getProductsById(Number(pid))
        if(prod){
            await manager.deleteProduct(Number(pid))
            socketServer.emit('products',await manager.getProducts())
        }else{
            console.log("product no existe")
        }
        
    } catch (error) {
        res.status(500).send({state:"error",message:error.message})
    }
})



export default router