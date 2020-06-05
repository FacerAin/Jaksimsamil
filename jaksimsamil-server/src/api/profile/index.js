const express = require("express");
const router = express.Router();

router.post("/solved:id");
router.get("/solvednum:id");
router.get("recommendps:id");

module.exports = router;
