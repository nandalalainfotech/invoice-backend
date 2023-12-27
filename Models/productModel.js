import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productID: { type: String, required: false },
  name: { type: String, required: false },
  amount: { type: String, required: false },
  user_id: { type: String, required: false },
  quantity: { type: String, required: false },
  Image: { type: String, required: false },
});

const Product = mongoose.model("product", ProductSchema);

export default Product;
