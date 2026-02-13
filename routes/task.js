const express= require("express");
const {addtask, getalltask, gettaskbyid ,updatetask,deletetask,gettaskbyuser} = require("../controllers/task");

const router = express.Router();

router.post("/",addtask);
router.get("/",getalltask);
router.get("/user/:id",gettaskbyuser);
router.get("/:id",gettaskbyid);
router.put("/:id",updatetask);
router.delete("/:id",deletetask);

module.exports= router;