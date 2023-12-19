import mongoose from "mongoose";

const ExternalUserInvoiceSchema = new mongoose.Schema({
    billAddress: { type: String, required: false },
    companyemail: { type: String, required: false },
    companymobile: { type: String, required: false },
    companyname: { type: String, required: false },
    clientName: { type: String, required: false },
    clientAddress: { type: String, required: false },
    clientEmail: { type: String, required: false },
    clientMobileNo: { type: String, required: false },
    invoiceNo: { type: String, required: false },
    createdDate: { type: String, required: false },
    dueDate: { type: String, required: false },
    products:[],
    subTotal: { type: String, required: false },
    taxes: [],
    Image: { type: String, required: false },
    totalAmount:{ type: Number, required: false },
    formName:{ type: String, required: false },
});

const ExternalUserInvoiceModel = mongoose.model("ExternalUserInvoice", ExternalUserInvoiceSchema);

export default ExternalUserInvoiceModel;