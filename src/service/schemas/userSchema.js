import mongoose from "mongoose";

const {Schema, model} = mongoose

const UserModel = new Schema (
    {
        name:{ type: String, required: [true, "Please enter insert your name"],},
        email:{ type: String, required: [true, "Please enter insert your email"]},
        password:{ type: String,required: [true, "Please enter insert your password"]},
        role:{ type: String, enum: ["user", "admin"], default: "user"}

    },
    {
        timestamps: true
    }
)
export default model("User", UserModel)