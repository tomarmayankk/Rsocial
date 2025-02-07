import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

//signup controller function 
export const signup = async(req, res) => {
    const {fullName, email, password} = req.body;
    try {
        if(password.length < 6) {
           return  res.status(400).json({message: "password must be at least 6 characters"})
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "user already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email, 
            password: hashpassword
        })

        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                password: newUser.password
            })
        } else {
            res.status(400).json({message: "invalid user data"})
        }
    } catch (error) {
        console.log("error in signup controller", error.message);
        res.status(500).json({message: "internal server error"})
    }
}

//login controller function
export const signin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email}) 
        if(!user){
           return res.status(400).json({message: "invalid credentials"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) {
            return res.status(400).json({message: "Invalid credentials"})
        }
        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("error in signin controller", error.message);
        res.status(500).json({message: "internal server error"})
    }
}

export const signout =  (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({message: "logged out successfully"})
    } catch (error) {
        console.log("error in signout controller", error.message);
        res.status(500).json({message: "internal server error"})
    }
}

//check for authentication
export const checkAuth =  (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("error in checkAuth controller: ", error.message)
        res.status(500).json({message: "internal server error"})
    }
}