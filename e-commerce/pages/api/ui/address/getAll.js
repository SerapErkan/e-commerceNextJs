import dbConnect from "@/database/mongodb";
import Address from "@/models/Address";
import request from "@/services/request";

export default function handle(req, res) {
    request(res, async () => {
        dbConnect();
        const { id } = req.body;
        const addressData = await Address.find({ id });
        res.json(addressData);
    });
}