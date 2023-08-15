const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema({
    _id: String,
    userId: String,
    productId: String,
    addressId: String,
    quantity: Number,        //ürün adedi
    price: Number,          //alınma ücreti
    date: Date,             //sipariş ve ödeme tarihi
    status: String,         //ödeme bekleniyor onaylandı mı?
    isCompleted: Boolean,   //ödeme tamamlandı mı?
    isReject: Boolean,      //
    isPaymentCompleted: Boolean, //
    rate: Number, // yıldızlar
    comment: String, //yorumlar
    trackingNumber: String //kargo numarası 
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);

//card bilgileri tutulması 