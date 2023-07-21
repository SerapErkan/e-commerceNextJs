import dbConnect from "@/database/mongodb";
import Product from "@/models/Product";
import request from "@/services/request";

export default function handle(req, res) {
    request(res, async () => {

        dbConnect();
        const { id } = req.body;
        const product = await Product.findOne({ _id: id });
        res.json(product);

    })
}