import dbConnect from "@/database/mongodb";
import Product from "@/models/Product";
import request from "@/services/request";


export default function handle(req, res) {

    request(res, async () => {

        dbConnect();

        const { _id } = req.body;

        //not: eger ürün şipariş varsa ürün silinmisein !

        await Product.findByIdAndRemove({ _id: _id });
        res.json({ message: "Ürün Silme İşlemi Başarılı " });



    })
}