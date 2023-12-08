import mongoose from "mongoose";
const InvoiceSchema = new mongoose.Schema({
    clientName: { type: String, required: false },
    clientAddress: { type: String, required: false },
    clientEmail: { type: String, required: false },
    clientMobileNo: { type: String, required: false },
    invoiceNo: { type: String, required: false },
    poNumber:{ type: String, required: false },
    createdDate: { type: String, required: false },
    dueDate: { type: String, required: false },
    products: [],
    id: { type: String, required: false },
    subTotal: { type: String, required: false },
    billAddress: { type: String, required: false },
    companyemail: { type: String, required: false },
    companymobile: { type: String, required: false },
    companyname: { type: String, required: false },
    Image: { type: String, required: false },
    taxes: [],
    totalAmount:{ type: Number, required: false },
    user_id: { type: String, required: false },
});
const Invoice = mongoose.model("invoice", InvoiceSchema);
export default Invoice;