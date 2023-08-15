
import mongoose from "mongoose";


const addressSchema = new mongoose.Schema({
    _id: String,
    city: String, //şehir
    towns: String,
    district: String, //ilçe
    neighbourhood: String, //mahalle
    description: String,//acıklama apartman bilgisi
    street: String, //sokak
    userId: String,

});





export default mongoose.models.Address || mongoose.model("Address", addressSchema);
