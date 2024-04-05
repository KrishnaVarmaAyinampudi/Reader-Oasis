const Cart = require("../models/CartModel");

async function addToCart(req, res) {
    try {
        const { userId, bookId } = req.body;
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [{ bookId }] });
        } else {
            const existingItemIndex = cart.items.findIndex(item => item.bookId.toString() === bookId);
            if (existingItemIndex !== -1) {
                return res.status(200).json({ alreadyAdded: "Book already added to cart" });
            }
            cart.items.push({ bookId });
        }
        await cart.save();
        res.status(200).json({ message: "Item added to cart successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}