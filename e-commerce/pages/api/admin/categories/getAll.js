
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
        //         isActive: true,
        //         className: "fa-solid fa-plug-circle-check"


        //     }),
        //     new Category({

        //         _id: uuidv4(),
        //         name: "Moda",
        //         isActive: true,
        //         className: "fa-solid fa-shirt"


        //     }),


        //     new Category({

        //         _id: uuidv4(),
        //         name: "Ev, Yaşam, Kırtasiye, Ofis",
        //         isActive: true,
        //         className: "fa-solid fa-leaf"


        //     }),
        //     new Category({

        //         _id: uuidv4(),
        //         name: " Oto, Bahçe, Market",
        //         isActive: true,
        //         className: "fa-solid fa-tractor "


        //     }),
        //     new Category({

        //         _id: uuidv4(),
        //         name: "Anne, Bebek, Oyuncak",
        //         isActive: true,
        //         className: "fa-solid fa-baby-carriage"

        //     }),
        //     new Category({

        //         _id: uuidv4(),
        //         name: " Spor, Outdoor",
        //         isActive: true,
        //         className: "fa-solid fa-volleyball"

        //     }),
        //     new Category({

        //         _id: uuidv4(),
        //         name: "Kozmetik, Bakım",
        //         isActive: true,
        //         className: "fa-solid fa-wand-magic-sparkles"

        //     }),
        //     new Category({

        //         _id: uuidv4(),
        //         name: "PetShop",
        //         isActive: true,
        //         className: "fa-solid fa-paw"

        //     }),
        //     new Category({

        //         _id: uuidv4(),
        //         name: "Süpermarket",
        //         isActive: true,
        //         className: "fa-solid fa-basket-shopping"

        //     }),



        //     new Category({

        //         _id: uuidv4(),
        //         name: "Kitap, Müzik, Film, Hobi",
        //         isActive: true,
        //         className: "fa-solid fa-icons"

        //     }),



        // ]


        // for (let x of data) {
        //     await x.save();
        // }






        const categories = await Category.find().sort({ name: 1 });
        res.json(categories);


    })


}