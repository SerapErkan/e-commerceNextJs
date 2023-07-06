import mongoose from "mongoose";
const connection = {};

const uri = "mongodb+srv://serapperkan:123@tododb.j4h8uxi.mongodb.net/";

export default async function dbConnect() {
    if (connection.isConnected) return;

    const db = await mongoose.connect(uri);

    connection.isConnected = db.connections[0].readyState;
    console.log("MongoDb Bağlantısı Başarılı!");
}