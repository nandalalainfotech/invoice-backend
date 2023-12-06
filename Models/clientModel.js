import mongoose from "mongoose";

const ClinetSchema = new mongoose.Schema({
    image: { type: String, required: false },
    clientName: { type: String, required: false },
    clientAddress: { type: String, required: false },
    clientEmail: { type: String, required: false },
    clientMobileNo: { type: String, required: false },
    user_id: { type: String, required: false },
});

const Clients = mongoose.model("clients", ClinetSchema);

export default Clients;