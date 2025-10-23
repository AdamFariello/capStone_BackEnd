import express from "express"
import error from "../middleware/errors.mjs"
import db from "../db/conn.mjs";

const router = express.Router();
let userColl = db.collection("user");

router.route("/")
      .get(async(req, res, next) => {
          try {
            const {username, password} = req.body;
            console.log(username, password);
            //let getUsers = userColl.findOne({"username": username})
          } catch (e) {
            console.log(e);
            next(error(400, `[ERROR] -- ${e.message}`));
          }
      })

export default router;