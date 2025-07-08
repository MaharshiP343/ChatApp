const router = require("express").Router();

router.post("/signup", (req, res) => {
  res.send("User creted Successfully!");
})

module.exports = router;
