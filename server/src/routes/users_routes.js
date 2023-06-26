import express  from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/users_models.js";

const router = express.Router();
// const app = express();
router.post("/register", async (req,res)=>{
    if(req.body.username==""){
        return res.json({message: "Please enter a valid name"})
    }
    const { username,password,savedRecipes } = req.body;
    const user = await UserModel.findOne({ username });

    if(user){
        return res.json({message: "User already exists!"})
    }
    else{
        const hashedpassword = await bcrypt.hash(password,10);
        
        const newuser = new UserModel({username, password: hashedpassword}, savedRecipes);
        await newuser.save();
        
        
        res.json({message: "User Registered Successfully!"});
    }
});

router.post("/login", async (req,res)=>{
    const { username,password } = req.body;
    const user = await UserModel.findOne({ username });

    if(!user){
        return res.json({message:"Username Or Password Is Incorrect!"});
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.json({message:"Username Or Password Is Incorrect!"})
    }

    const token = jwt.sign({id: user._id }, "secret");
    res.json({token,userID: user._id});
});


export { router as userRouter };


export const VerifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token,"secret",(err) =>{
            if(err) return res.sendStatus(403);
            next();
        });
    }
    else {
        return res.sendStatus(401);
    }
}