import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, required: true },
    // userRole: { type: String, required: true, default: "user" },
    userRoleId: { type: mongoose.Schema.Types.ObjectID, ref: "Role" },
    userRoleName: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const UserLists = mongoose.model("User", userSchema);
export default UserLists;
