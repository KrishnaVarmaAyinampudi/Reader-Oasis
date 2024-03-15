const librarainModel = require("../models/librarian");
const createLibrarianAccount = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const librarian = new librarainModel({
            email,
            name,
            password
        });
        await librarian.save();
        return res.send({ "message": "Account created successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ "message": "Internal server error" });
    }
}


module.exports = {
    createLibrarianAccount
}