import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
   
    email:  {type:String, required: true },
    password: {type:String, required: true },
    userRole: {type:String, required: true,default:"user" },
    // confirmPassword: {type:String, required: true },
},{
    timestamps: true
});

const UserLists = mongoose.model('User', userSchema);
export default UserLists;