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
async function getCartItemsByUserId(req, res) {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId }).populate('items.bookId');
        if (!cart) {
            return res.status(404).json({ message: "Cart not found for the user" });
        }
        res.status(200).json({ userId: cart.userId, items: cart.items });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}
async function removeFromCart(req, res) {
    try {
        const { userId, bookId } = req.body;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found for the user" });
        }
        cart.items = cart.items.filter(item => item.bookId.toString() !== bookId);
        await cart.save();
        res.status(200).json({ message: "Item removed from cart successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

