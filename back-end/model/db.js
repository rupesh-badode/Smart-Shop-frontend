const { MongoClient } = require('mongodb');

const mongoURL = "mongodb://localhost:27017";
const dbName = "smartshop";

let db = null;

async function connectDB() {
    if (db) return db; // reuse if already connected
    const client = await MongoClient.connect(mongoURL);

    db = client.db(dbName);
    console.log("✅ Connected to MongoDB");
    return db;
}

function closeDB() {
    if (client) {
        client.close();
        console.log("❎ MongoDB connection closed");
    }
}

module.exports = connectDB;

