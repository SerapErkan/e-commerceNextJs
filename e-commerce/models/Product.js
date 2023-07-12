
const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    _id: String,
    name: String,
    price: Number,
    stock: Number,
    sellerId: String,
    imageUrls: Array,
    mainImageUrl: String,
    categoryId: String,
    isActiveRol: Boolean,
});

export default mongoose.models.Product || mongoose.model("Product", productSchema);