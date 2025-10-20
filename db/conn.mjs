import { MongoClient, MongoParseError } from "mongodb";
import dotenv from 'dotenv';
import mongoose from "mongoose"; //TODO: Remove this

dotenv.config();

// Load connectionString
const connectionString = process.env.mongoURI || "";

// TODO: MAKE THIS ONE TRY CATCH 
// Create a new MongoClient
let client;
try {
    client = new MongoClient(connectionString);
} catch (err) {
    console.error(`[ERROR] -- ${err.message}`);
    console.log("[SOLVE?] -- CHECK IF .env EXISTS");
    console.log("[SOLVE?] -- IF EXISTS, MAKE SURE THE VARIABLE IS, 'mongoURI'");
    process.exit(1);  
}


// Establist DB connection
let conn;
try {
    conn = await client.connect();
    await mongoose.connect(connectionString);
} catch (err) {
    console.error(`[ERROR] -- ${err.message}`);
    process.exit(1);
}

// choose database & export
let db = conn.db('pizza');

export default db;