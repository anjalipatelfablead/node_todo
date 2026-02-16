const express = require("express");
const { addtask, getalltask, gettaskbyid, updatetask, deletetask, gettaskbyuser } = require("../controllers/task");
const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware(["admin", "user"]), addtask);
router.get("/", authMiddleware, roleMiddleware(["admin"]), getalltask);
// router.post("/", addtask);
// router.get("/", getalltask);
router.get("/user/:id", authMiddleware, roleMiddleware(["admin", "user"]), gettaskbyuser);
router.get("/:id", authMiddleware, roleMiddleware(["admin", "user"]), gettaskbyid);
router.put("/:id", authMiddleware, roleMiddleware(["user"]), updatetask);
router.delete("/:id", authMiddleware, roleMiddleware(["admin", "user"]), deletetask);

module.exports = router;