import express from "express";
import error from "../middleware/errors.mjs"
import db from "../db/conn.mjs";

import usersSchema from "../db/models/usersSchema.mjs";

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
      .delete(async(req, res, next) => {
        if (req.body.username && req.body.email && req.body.password) {
          let query = {
            username: String(req.body.username),
            email: String(req.body.email),
            password: String(req.body.password)
          }
                    
          let result = await userColl.deleteOne(query);

          if (result["deletedCount"]) {
            res.json(result);
          } else {
            next(error(400, "Error occured, user wasn't deleted or doesn't exist"));
          }
        } else {
          next(next(400, "ERROR: missing username, password, and/or email"));
        }
      })
      .patch(async(req, res, next) => {

      })
;

router.route("/:user")
      .get(async(req, res) => {
        let getUsers = await userColl.find({"username": req.params.user}).toArray();
        res.json(getUsers);
      })
;



export default router;