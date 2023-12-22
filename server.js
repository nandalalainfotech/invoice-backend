import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
// const invoiceRouter = require("./Routers/invoiceRouter")
import invoiceRouter from "./Routers/invoiceRouter.js"
import userRouter from "./Routers/userRouter.js";
import dotenv from "dotenv";
import clientRouter from "./Routers/clientRouter.js";
import companyRouter from "./Routers/companyRouter.js";
import productRouter from "./Routers/productRouter.js";
import config from "./config.js"

console.log(`NODE_ENV=${config.NODE_ENV}`);

dotenv.config();
const app = express();

app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: "10mb", extended: true }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);

app.use("/api/invoices", invoiceRouter);
app.use("/api/users", userRouter);
app.use("/api/clients", clientRouter);
app.use("/api/company", companyRouter);
app.use("/api/products", productRouter);

mongoose.connect('mongodb+srv://nandalala:Spartans!23@cluster0.ujwabrm.mongodb.net/tail_invoice_dev?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});





app.listen(8005, () => {
  console.log(`Server is running on port 8005.`);
});