const express = require("express");
const ProductsServices = require("../services/products")

const router = express.Router();
const service = new ProductsServices();
router.get("/", async (req,res)=>{

  const products = await service.find()
  res.json(products)
})



// static
// router.get("/filter", (req,res) => {
//   res.send("Yo soy un filter")
// })
// dynamic
router.get("/:id", async (req,res,next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id)
    res.json(product)
  } catch (error) {
    next(error);
  }
  // if(id==="999"){
  //   res.status(404).json({
  //     message:"not found"
  //   })
  // } else {
  //   res.status(200).json({
  //     id,
  //     name:"product",
  //     price:2000

  //   })
  // }

})

router.post("/", async (req,res)=>{
  const body = req.body;
  // console.log(body)
  const newProduct = await service.create(body)
  res.status(201).json(
    {
      newProduct
    }
  )
})


router.patch("/:id", async (req,res)=>{
  try {
    const {id } = req.params;
    const body = req.body;
    const product = await service.update(id,body);
    res.json(
      {
        product
      }
    )

  } catch (error) {
    console.log(error.message)
    res.status(404).json({
      message: error.message
    })
  }

})

router.delete("/:id", async (req,res)=>{
  const {id } = req.params;
  const rta = await service.delete(id);
  res.json(
    rta
  )
})

module.exports = router;
