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

const librarianLogin = async (req, res) => {
    try{
        const {email,password} = req.body;
        const librarian = await librarainModel.findOne({email});
        if(!librarian){
            return res.status(400).json({"message":"User Not Found"});
        }
        if(librarian.password === password){
            return res.send({"message":"Login successful",user:librarian});
        }else{
            return res.status(400).json({"message":"Invalid credentials"});
        }
    }catch(error){
        res.status(400).json({"message":"Internal server error"});
    }
}

module.exports = {
    createLibrarianAccount,
    librarianLogin
}