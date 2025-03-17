import User from "../../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const  userSignup = async (req, res) =>  {
    try {
        const {email, password, username, role} = req.body;    
        // checking valid data
        if (!email || !password || !username || !role) {
            return res.status(400).json({message: "Please provide all the fields"});
        }
        // if user already exists
        console.log('user is trying to signup');
        const isUserExists = await User.findOne({email});
        if (isUserExists) {
            console.log(isUserExists);
            return res.status(400).json({message: "User already exists"});
        }
        const user = new User({email, password, username, role});
        user.save();
        return res.status(201).json({message: "User created successfully"});    
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }

}

const userLogin = (req, res) => {
    try {
        console.log("user is trying to login.");
        const {email, password} = req.body;
        User.findOne({email}).then(user => {
            if (!user) {
                console.log("user not found");
                return res.status(404).json({message: "User not found"});
            }
            if (!user.password) {
                return res.status(404).json({message: "User not found"});
            }
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    const token = jwt.sign({_id: user._id, role: user.role, userId: user._id, username: user.username, email: user.email}, process.env.JWT_SECRET);
                    res.status(200).json({token});
                } else {
                    return res.status(401).json({message: "Invalid Credentials"});
                }
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}



export {userSignup, userLogin};