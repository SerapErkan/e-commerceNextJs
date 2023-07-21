import Product from "@/models/Product";
import request from "@/services/request";


export default function handle(req, res) {

    request(res, async () => {

        const data = new Product(req.body);

        await Product.findOneAndUpdate({ _id: data._id }, data);
        res.json({ message: "Ürün güncelleme işlemi başarılı" });




    })
}