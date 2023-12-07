import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../Models/productModel.js";

const productRouter = express.Router();


productRouter.post('/productSave', expressAsyncHandler(async (req, res) => {
    const clients = new Product(req.body);
    try {
        await clients.save();
        res.send(clients);
    } catch (error) {
        res.status(500).send(error);
    }
}));

productRouter.get('/getProduct', expressAsyncHandler(async (req, res) => {
    const product = await Product.find();
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'User Not Found' });
    }

}));


productRouter.delete('/deleteProducts/:id', expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      const deleteProduct = await product.deleteOne();
      res.send(deleteProduct);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  }));

export default productRouter;