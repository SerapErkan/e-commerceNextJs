import mongoose from "mongoose";
const connection = {};

const uri = "mongodb+srv://e-commerce:1@e-commerce.kemrqvl.mongodb.net/";

export default async function dbConnect() {
    if (connection.isConnected) return;

    const db = await mongoose.connect(uri);

    connection.isConnected = db.connections[0].readyState;
    console.log("MongoDb Bağlantısı Başarılı!");
}