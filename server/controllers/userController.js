const User = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports.register = async (req,res,next)=>{
    try {
        const {username, email, password} = req.body;
        const usernameCheck = await User.findOne({username});
        if (usernameCheck)
            return res.json({msg: "Username already exists", status: false});
        
        const emailCheck = await User.findOne({email});
        if(emailCheck)
            return res.json({msg: "Email already Exists, please login", status: false});
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword
        });
        delete user.password
        return res.json({status: true, user});

        } catch (error) {
        next(error)
    }
};