import db from "./db/conn.mjs";

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
}