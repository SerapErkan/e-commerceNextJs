import dbConnect from "@/database/mongodb";
import Product from "@/models/Product";
import request from "@/services/request";
import { v4 as uuidv4 } from 'uuid';

export default function handle(req, res) {
    request(res, async () => {
        dbConnect();

        const { sellerId } = req.body;
        const products = await Product.find({ sellerId: sellerId }).sort({ name: 1 });
        res.json(products);
    });
}