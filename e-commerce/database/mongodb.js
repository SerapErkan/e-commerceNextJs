import mongoose from "mongoose";
const connection = {};

const uri = "mongodb+srv://srp:123@e-commerce.2ikwwub.mongodb.net/";

export default async function dbConnect() {
    if (connection.isConnected) return;

    const db = await mongoose.connect(uri);

    connection.isConnected = db.connections[0].readyState;
    console.log("MongoDb Bağlantısı Başarılı!");
}