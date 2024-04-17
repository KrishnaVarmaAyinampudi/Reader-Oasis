const express = require("express");
const { addToCart, getCartItemsByUserId, removeFromCart } = require("../controllers/CartController");
const router = express.Router();



router.post("/add-to-cart", addToCart )


router.get("/get-cart/:userId", getCartItemsByUserId)

router.post("/remove-from-cart", removeFromCart)



module.exports = router