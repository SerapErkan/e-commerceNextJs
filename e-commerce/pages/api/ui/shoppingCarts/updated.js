import dbConnect from "@/database/mongodb";
import ShoppingCart from "@/models/ShoppingCart";
import request from "@/services/request";




export default function handle(req, res) {
    request(res, async () => {
        dbConnect();

        const { id, quantity } = req.body;
        console.log("geldim", id, quantity)

        await ShoppingCart.findOneAndUpdate(
            { _id: id },
            { quantity: quantity }
        );
        res.json({ message: "Sepete ürün eklendi!" });


    })

}

