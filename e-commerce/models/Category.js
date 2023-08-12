
import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({
    _id: String,
    name: String,
    isActive: Boolean,
    className: String,


});





export default mongoose.models.Category || mongoose.model("Category", categorySchema);
