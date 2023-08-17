import dbConnect from "@/database/mongodb";
import Product from "@/models/Product";
import User from "@/models/User";
import request from "@/services/request";

export default function handle(req, res) {
    request(res, async () => {
        dbConnect();
        const { userId } = req.query;
        const user = await User.findById(userId);
        const favoriteProductIds = user.favoriteProducts;
        const favoriteProducts = await Product.find({ _id: { $in: favoriteProductIds } });
        res.json({ favoriteProducts });
    }
    )
}


