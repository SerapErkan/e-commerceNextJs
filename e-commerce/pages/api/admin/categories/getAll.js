
import dbConnect from "@/database/mongodb";
import Category from "@/models/Category";
import request from "@/services/request";
import { v4 as uuidv4 } from 'uuid';

export default function handle(req, res) {

    request(res, async () => {

        dbConnect();

        // const data = [

        //     new Category({

        //         _id: uuidv4(),
        //         name: "Elektronik",
        //         isActive: true


        //     }),
        //     new Category({

        //         _id: uuidv4(),
        //         name: "Moda",
        //         isActive: true


        //     }),


        //     new Category({

        //         _id: uuidv4(),
        //         name: "Ev, Yaşam, Kırtasiye, Ofis",
        //         isActive: true


        //     }),
        //     new Category({

        //         _id: uuidv4(),
        //         name: " Oto, Bahçe, Market",
        //         isActive: true


        //     }),
        //     new Category({

        //         _id: uuidv4(),
        //         name: "Anne, Bebek, Oyuncak",
        //         isActive: true


        //     }),
        //     new Category({

        //         _id: uuidv4(),
        //         name: " Spor, Outdoor",
        //         isActive: true


        //     }),
        //     new Category({

        //         _id: uuidv4(),
        //         name: "Kozmetik, Bakım",
        //         isActive: true


        //     }),
        //     new Category({

        //         _id: uuidv4(),
        //         name: "Süpermarket, PetShop",
        //         isActive: true


        //     }),
        //     new Category({

        //         _id: uuidv4(),
        //         name: "Kitap, Müzik, Film, Hobi",
        //         isActive: true


        //     }),



        // ]


        // for (let x of data) {
        //     await x.save();
        // }






        const categories = await Category.find().sort({ name: 1 });
        res.json(categories);


    })


}