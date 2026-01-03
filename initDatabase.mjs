import db from "./db/conn.mjs";
import { userValidator } from "./db/userValidator.mjs";
import { userData } from "./db/data.mjs";

export default async function initDatabase() {
    //testInsert();
    
    console.log("[DEBUG] -- initalizing database with initDatabase");
    try {
        //Wipe user collection for new collection
        await db.collection("user").drop();
        await db.createCollection("user", userValidator);
        
        let userColl = await db.collection("user", userValidator);
        userColl.insertMany(userData);
        //userColl.deleteMany({});
    } catch (e) {
        console.error(e);
    }
    console.log("[DEBUG] -- Database has been initialized!");
}