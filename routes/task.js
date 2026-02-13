const express= require("express");
const {addtask, getalltask, gettaskbyid ,updatetask,deletetask,gettaskbyuser} = require("../controllers/task");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", roleMiddleware(["admin", "user"]),addtask);
router.get("/",roleMiddleware(["admin"]),getalltask);
router.get("/user/:id",gettaskbyuser);
router.get("/:id",gettaskbyid);
router.put("/:id",updatetask);
router.delete("/:id",deletetask);

module.exports= router;