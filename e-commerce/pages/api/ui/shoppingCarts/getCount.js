import request from "@/services/request";
import dbConnect from "@/database/mongodb";
import ShoppingCart from "@/models/ShoppingCart";


export default function handle(req, res) {

    request(res, async () => {

        dbConnect();
        const { userId } = req.body;
        const count = await ShoppingCart.find({ userId: userId });
        res.json({ count });

    })
}