const router = require("express").Router();
const controller = require("../controllers/PaymentController");

router.post("/charge", controller.charge);

module.exports = router;
