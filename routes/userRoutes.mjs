import express from "express";
import db from "../db/conn.mjs";

const router = express.Router();
let userColl = db.collection("user");

router.route("/")
      .get(async(req, res) => {
        let getUsers = await userColl.find({}).toArray();
        res.json(getUsers);
      })


export default router;