import dbConnect from "@/database/mongodb";
import Product from "@/models/Product";
import request from "@/services/request";

// export default function handle(req, res) {
//     request(res, async () => {
//         dbConnect();
//         const { categoryId, filter } = req.body;




//         if (categoryId === "0") {
//             if (filter === "") {
//                 const products = await Product.aggregate([
//                     {
//                         $lookup: {
//                             from: "sellers",
//                             localField: "sellerId",
//                             foreignField: "_id",
//                             as: "sellers"
//                         }
//                     },
//                     {
//                         $match: { isActive: true }
//                     }
//                 ]).sort({ name: 1 });
//                 res.json(products);
//             } else {
//                 if (filter === "0") {
//                     const products = await Product.aggregate([
//                         {
//                             $lookup: {
//                                 from: "sellers",
//                                 localField: "sellerId",
//                                 foreignField: "_id",
//                                 as: "sellers"
//                             }
//                         },
//                         {
//                             $match: { isActive: true }
//                         }
//                     ]).sort({ price: 1 });
//                     res.json(products);
//                 } else if (filter === "1") {
//                     const products = await Product.aggregate([
//                         {
//                             $lookup: {
//                                 from: "sellers",
//                                 localField: "sellerId",
//                                 foreignField: "_id",
//                                 as: "sellers"
//                             }
//                         },
//                         {
//                             $match: { isActive: true }
//                         }
//                     ]).sort({ price: -1 });
//                     res.json(products);
//                 }
//             }
//         }
//         else {
//             if (filter === "") {
//                 const products = await Product.aggregate([
//                     {
//                         $lookup: {
//                             from: "sellers",
//                             localField: "sellerId",
//                             foreignField: "_id",
//                             as: "sellers"
//                         }
//                     },
//                     {
//                         $match: { isActive: true, categoryId: categoryId }
//                     }
//                 ]).sort({ name: 1 });
//                 res.json(products);
//             } else {
//                 if (filter === "0") {
//                     const products = await Product.aggregate([
//                         {
//                             $lookup: {
//                                 from: "sellers",
//                                 localField: "sellerId",
//                                 foreignField: "_id",
//                                 as: "sellers"
//                             }
//                         },
//                         {
//                             $match: { isActive: true, categoryId: categoryId }
//                         }
//                     ]).sort({ price: 1 });
//                     res.json(products);
//                 } else if (filter === "1") {
//                     const products = await Product.aggregate([
//                         {
//                             $lookup: {
//                                 from: "sellers",
//                                 localField: "sellerId",
//                                 foreignField: "_id",
//                                 as: "sellers"
//                             }
//                         },
//                         {
//                             $match: { isActive: true, categoryId: categoryId }
//                         }
//                     ]).sort({ price: -1 });
//                     res.json(products);
//                 }
//             }

//         }
//     })
// }
export default function handle(req, res) {
    request(res, async () => {
        dbConnect();
        const { categoryId, filter } = req.body;

        const baseQuery = [
            {
                $lookup: {
                    from: "sellers",
                    localField: "sellerId",
                    foreignField: "_id",
                    as: "seller"
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $match: { isActive: true }
            }
        ];

        if (categoryId !== "0") {
            baseQuery[2].$match.categoryId = categoryId;
        }

        let sortField = {};
        if (filter === "0") {
            sortField = { price: 1 };
        } else if (filter === "1") {
            sortField = { price: -1 };
        } else {
            sortField = { name: 1 };
        }

        const products = await Product.aggregate(baseQuery).sort(sortField);
        res.json(products);
    });
}
