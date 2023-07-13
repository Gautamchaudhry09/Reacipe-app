import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/recipes_models.js";
import { UserModel } from "../models/users_models.js";
import { VerifyToken } from "./users_routes.js";
const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const response = await RecipeModel.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

router.post("/", async (req, res) => {
    const recipe = new RecipeModel(req.body);
    try{
        const response = await recipe.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

router.put("/",VerifyToken,async (req, res) => {
    try{

        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({savedRecipes: user.savedRecipes});
    } catch(err){
    res.json(err);
    }
});

router.post("/savedRecipes/ids",async (req,res)=>{
    try{
        const user = await UserModel.findById(req.body.userID);
        res.json({ savedRecipes: user.savedRecipes});
    } catch(err){
        res.json(err);
    }
});

router.post("/savedRecipes", async (req,res)=>{
    try{
        const user = await UserModel.findById(req.body.userID);
        const savedRecipes = await RecipeModel.find({
            _id: {$in: user.savedRecipes},
        });
        res.json({ savedRecipes});
        // console.log({savedRecipes});
    } catch(err){
        res.json(err);
    }
});


export { router as recipeRouter};