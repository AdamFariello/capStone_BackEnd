import db from "./db/conn.mjs";
import { userValidator } from "./db/userValidator.mjs";
import { userData } from "./db/data.mjs";

async function testInsert() {
    let testCol = await db.collection("test2");
    try {
        await db.createCollection("test2");
    } catch (e) {
        console.error(e.message);
    }
    
    await testCol.deleteMany({}); // Empties table
    await testCol.insertOne({bogo: "printed", uhWhat: "👽"}); 
    
    console.log("Successful run");
} 

export default async function initDatabase() {
    //testInsert();
    try {
        let userColl = await db.collection("user");
        await db.createCollection("user", userValidator);
        userColl.deleteMany({});
        await db.collection("user").insertMany(userData);
    } catch (e) {
        console.error(e.message);
    }
}