import express from "express"
import error from "../middleware/errors.mjs"
import db from "../db/conn.mjs";

const router = express.Router();
let userColl = db.collection("user");

router.route("/")
      .post(async(req, res, next) => {
          try {
            const {username, password} = req.body;
            const getUsers = await userColl.findOne({"username": username})
            if (password == getUsers.password) {
                res.json({"200": "valid"});
            } else {
                next(error(403, `[ERROR] -- Passwords don't match!`));
            }
          } catch (e) {
            console.log(e);
            next(error(400, `[ERROR] -- ${e.message}`));
          }
      })

export default router;