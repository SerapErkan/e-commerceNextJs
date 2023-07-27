import dbConnect from "@/database/mongodb";
import User from "@/models/User";
import request from "@/services/request";
import jwt from 'jsonwebtoken';

export default function handle(req, res) {
    request(res, async () => {

        dbConnect();
        const { emailOrPhoneNumber, password } = req.body;
        let user = await User.findOne({
            $or: [{ email: emailOrPhoneNumber }, { phoneNumber: emailOrPhoneNumber }],
            password: password,




        });


        if (user !== null) {

            const payload = {};
            if (user.email == emailOrPhoneNumber) {
                payload.email = emailOrPhoneNumber;
            } else {
                payload.phoneNumber = emailOrPhoneNumber;
            }

            const token = jwt.sign({ payload }, "key asdasdaasdafgfgoıpıpoıjdlkgjdys6yt7wteafytsedaeqgfehgagujksuoıau90owpqorkfşlaskıpofıptfew", { expiresIn: "1h" });
            res.json({ accessToken: token, user });

        } else {
            res.status(500).json({ message: "Kullanıcı bulunamadı!" });
        }


    })
}
