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
          await userColl.insertOne(req.body);
          res.json(req.body);
        } catch (e) {
          console.error(e);
          next(error(400, `[ERROR] -- ${e.message}`))
        }
      })
      .delete(async(req, res, next) => {
        try {
          let result = await userColl.deleteMany(req.body);
          if (result["deletedCount"]) {
            res.json(result);
          } else {
            next(error(400, "Error occured, user wasn't deleted or doesn't exist"));
          }
        } catch (e) {
          console.error(e);
          next(error(400, `[ERROR] -- ${e.message}`));
        }
      })
      .patch(async(req, res, next) => {
        /*
          if (req.body.username && req.body.email && req.body.password) {
          } else { 
            //res.json("ERROR: missing username, old password, and/or new password");
            next(error(400, "ERROR: missing username, old password, and/or new password")); 
          }
        */

        try {
          console.log(req.body);
          
          //Update Password
          if (req.body.newPassword) {
            let updateObject = req.body.updateObject // { $set: { password: req.body.newPassword } };
            let {"updateObject":_,  query} = req.body; 

            console.log(query);

            let result = await userColl.updateOne(query, updateObject)  
            res.json(result);
          } else {
            next(error(403, "ERROR: YOUR NEW PASSWORD CAN'T BE THE SAME AS THE OLD ONE"));  
          }  
        } catch (err) {
          console.log(err);
          next(error(400, `[ERROR] -- ${e.message}`));
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