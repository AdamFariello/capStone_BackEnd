import db from "./db/conn.mjs";



export default async function initDatabase() {
    let testCol = await db.collection("test2");
    try {
        await db.createCollection("test2");
    } catch (e) {
        console.error(e.message);
    }
    
    testCol.deleteMany({}); // Empties table
    await testCol.insertOne({example: "entry", alternative: "entry2"});
}