import mongoose from "mongoose";

const userRoleSchema = new mongoose.Schema(
  {
    roleName: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const UserRoles = mongoose.model("Role", userRoleSchema);
export default UserRoles;
