import { MongoClient, MongoParseError } from "mongodb";
import dotenv from 'dotenv';
import mongoose from "mongoose"; //TODO: Remove this
dotenv.config();

// Load connectionString
const databaseName = process.env.databaseName || "telemaco";
const connectionString = process.env.mongoURI || "{NO STRING IN .env}";

// Create a new MongoClient
let client;
try {
    client = new MongoClient(connectionString);
} catch (err) {
    console.error(`[ERROR] -- ${err.message}`);
    console.log("[SOLVE?] -- CHECK IF .env EXISTS and variable uses 'mongoURI'");
    console.log("[SOLVE?] -- IF 'querySrv ENOTFOUND' error, login into site and check if cluster is online");
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
let db = conn.db(databaseName);

export default db;