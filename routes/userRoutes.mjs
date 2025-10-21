import express from "express";
import db from "../db/conn.mjs";

const router = express.Router();
let userColl = db.collection("user");

router.route("/")
      .get(async(req, res) => {
        let getUsers;
        if (req.query.user) {
          getUsers = await userColl.find({"username": req.query.user}).toArray();
        } else {
          getUsers = await userColl.find({}).toArray();
        }
        res.json(getUsers);
      })
      .post(async(req, res, next) => {
        try {
          await userColl.insertOne(req.body);
          res.json(req.body);
        } catch (e) {
          console.error(e.message);
          next(error(400, e))
        }
      })
;

router.route("/:user")
      .get(async(req, res) => {
        let getUsers = await userColl.find({"username": req.params.user}).toArray();
        res.json(getUsers);
      })
;



export default router;