import dbConnect from "@/database/mongodb";
import Todo from "@/models/Todo";
import request from "@/services/request";
import { v4 as uuidv4 } from 'uuid';

export default function handle(req, res) {
    request(res, async () => {
        dbConnect();

        const { work } = req.body;

        let date = new Date();
        date.setHours(new Date().getHours() + 3);

        const todo = new Todo({
            _id: uuidv4(),
            work: work,
            isCompleted: false,
            date: date
        });

        await todo.save();
        //işlemler
        res.json({ message: "Kayıt işlemleri başarıyla tamamlandı ! " });
    })



}