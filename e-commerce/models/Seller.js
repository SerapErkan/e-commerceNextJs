
import mongoose from "mongoose";


const sellerSchema = new mongoose.Schema({

    _id: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    identityNumber:
    {
        type: Number,
        require: true
    },
    email: String,

    phoneNumber: Number,
    password: String,

    address: String,
    city: String,

    phoneNumber: Number,

    repassword: String,
    imageUrl: String

})

export default mongoose.models.Seller || mongoose.model("Seller", sellerSchema);