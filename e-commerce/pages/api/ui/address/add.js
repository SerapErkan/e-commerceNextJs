import dbConnect from "@/database/mongodb";
import Address from "@/models/Address";
import request from "@/services/request"
import { v4 as uuidv4 } from 'uuid';


export default function handle(req, res) {

    request(res, async () => {

        dbConnect();
        const newAddress = new Address(req.body);
        newAddress._id = uuidv4();
        await newAddress.save();
        res.json({ message: "Adresiniz başarıyla kayıt edilmiştir!" });

    })
}