import dbConnect from "@/database/mongodb";
import Product from "@/models/Product";
import ShoppingCart from "@/models/ShoppingCart";

import request from "@/services/request";
import { v4 as uuidv4 } from "uuid"


export default function handle(req, res) {
    request(res, async () => {
        dbConnect();

        const shoppingCart = new ShoppingCart(req.body);
        const product = await Product.findOne({ _id: shoppingCart.productId });
        //aynı üründen iki ayrı kayıt oluşturmaması için ürün id kontrolu yapsın 

        const checkProductIsAdded = await ShoppingCart.findOne({ productId: shoppingCart.productId, userId: shoppingCart.userId });
        if (checkProductIsAdded) {
            checkProductIsAdded.quantity += shoppingCart.quantity;
            await ShoppingCart.findByIdAndUpdate(checkProductIsAdded._id, checkProductIsAdded);
            res.json({ message: "Sepetki ürün adedi güncellendi!" });
        } else {
            shoppingCart._id = uuidv4();
            await shoppingCart.save();
            res.json({ message: "Sepete yeni bir ürün eklendi!" });
        }



    })
}