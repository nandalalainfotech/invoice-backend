import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    name: { type: String, required: false },
    mobileno: { type: String, required: false },
    companyaddress: { type: String, required: false },
    companymail: { type: String, required: false },
    panNo: { type: String, required: false },
    state: { type: String, required: false },
    postalCode: { type: String, required: false },
    panNumber: { type: String, required: false },
    gst: { type: String, required: false },
    city: { type: String, required: false },
    user_id: { type: String, required: false },
    Image: { type: String, required: false },
});

const Company = mongoose.model("company", CompanySchema);

export default Company;