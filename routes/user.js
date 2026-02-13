const express = require("express");
const {createuser,getalluser,getuserbyid, deleteuser, updateuser, loginuser} = require("../controllers/user");
const router= express.Router();

router.post("/",createuser);
router.get("/",getalluser);
router.get("/:id",getuserbyid);
router.delete("/:id",deleteuser);
router.put("/:id",updateuser);
router.post("/login",loginuser);

module.exports = router;