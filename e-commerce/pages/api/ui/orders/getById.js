import dbConnect from "@/database/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import Seller from "@/models/Seller";
import User from "@/models/User";
import request from "@/services/request";

export default function handle(req, res) {
    request(res, async () => {
        dbConnect();
        const { orderId } = req.body;

        // Siparişin detaylarını alıyoruz
        const orderDetails = await Order.aggregate([
            {
                $match: { _id: orderId }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "product"
                }
            },
            {
                $unwind: "$product"
            },
            {
                $lookup: {
                    from: "sellers",
                    localField: "product.sellerId",
                    foreignField: "_id",
                    as: "seller"
                }
            },
            {
                $unwind: "$seller"
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            }
        ]);

        // Sonuçları JSON olarak döndürüyoruz
        res.json(orderDetails);
    });
}
