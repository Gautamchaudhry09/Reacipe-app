import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/users_routes.js";
// import { recipesRouter } from "./routes/recipes_routes.js";



const app = express();

app.use(express.json());
app.use(cors());

// app.use("/recipes", recipesRouter);
app.use("/auth", userRouter);
mongoose.connect("mongodb+srv://gautam:junnu958i@cluster0.2tw5hy6.mongodb.net/Cluster0?retryWrites=true&w=majority");

// app.get("/",(req,res)=>{
//     res.send("<h1> Hello World</h1>");
//     console.log(db.recipes.find({}));
// });





app.listen(3001, () => console.log("SERVER STARTED!"));

