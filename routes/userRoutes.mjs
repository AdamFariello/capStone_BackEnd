import express from "express";
import error from "../middleware/errors.mjs"
import db from "../db/conn.mjs";

const router = express.Router();
let userColl = db.collection("user");

router.route("/")
      .get(async(req, res) => {
        let getUsers;
        if (req.query.user) {
          getUsers = await userColl.find({"username": req.queryjser}).toArray();
        } else {
          getUsers = await userColl.find({}).toArray();
        }
        res.json(getUsers);
      })
      .post(async(req, res, next) => {
        try {
          console.log(typeof req.body);
          console.log(req.body);
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
        if (req.body.username && req.body.email && req.body.password) {
          //Update Password
          if (req.body.newPassword) {
            let query = {
              username: String(req.body.username),
              password: String(req.body.password)
            }

            let updateObject = { $set: { password: req.body.newPassword } };
            let result = await userColl.updateOne(query, updateObject)  
            res.json(result);
          } else {
            next(error(403, "ERROR: YOUR NEW PASSWORD CAN'T BE THE SAME AS THE OLD ONE"));  
          }  
        } else { 
          //res.json("ERROR: missing username, old password, and/or new password");
          next(error(400, "ERROR: missing username, old password, and/or new password")); 
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