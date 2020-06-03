const express = require("express");
const router = express.Router();

router.post("/");
router.delete("/:id");
router.get("/:id");
router.get("");

module.exports = router;
