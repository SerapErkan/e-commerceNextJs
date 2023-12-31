
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    _id: String,
    name: { type: String, required: true },
    phoneNumber: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: String,
    money: Number,
    favorites: Array,
    addressId: Array
});


export default mongoose.models.User || mongoose.model("User", userSchema);

