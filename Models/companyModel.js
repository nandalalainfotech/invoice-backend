import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    image: { type: String, required: false },
    companyName: { type: String, required: false },
    companyEmail: { type: String, required: false },
    companyMobile: { type: String, required: false },
    billingAddress: { type: String, required: false },
    user_id: { type: String, required: false },
    
});

const Company = mongoose.model("company", CompanySchema);

export default Company;