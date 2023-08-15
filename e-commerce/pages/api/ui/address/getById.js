import dbConnect from "@/database/mongodb";
import Address from "@/models/Address";
import request from "@/services/request";

export default function handle(req, res) {
    request(res, async () => {
        dbConnect();
        const { id } = req.body;

        const addressData = await Address.findById(id); // Tek bir adresi ID ile çekmek için findById kullanılır
        if (!addressData) {
            return res.status(404).json({ error: "Address not found" });
        }
        res.json(addressData);
    });
}