import mongoose from "mongoose";
const InvoiceSchema = new mongoose.Schema({
    billAddress: { type: String, required: false },
    companyemail: { type: String, required: false },
    companymobile: { type: String, required: false },
    companyname: { type: String, required: false },
    clientName: { type: String, required: false },
    clientAddress: { type: String, required: false },
    clientEmail: { type: String, required: false },
    clientMobileNo: { type: String, required: false },
    invoiceNo: { type: String, required: false },
    TodayDate: { type: String, required: false },
    dueDate: { type: String, required: false },
    products:[],
    subTotal: { type: String, required: false },
    taxes: [],
    Image: { type: String, required: false },
    terms: { type: String, required: false },
    totalAmount:{ type: Number, required: false },
    formName:{ type: String, required: false },
    user_id:{ type: String, required: false },
});
const Invoice = mongoose.model("invoice", InvoiceSchema);
export default Invoice;