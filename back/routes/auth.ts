// About Authentication

import express, {Request,Response} from "express";
import passport from "passport";

import User from "../models/user";

const router=express.Router();

router.post('/github',passport.authenticate('github',{scope:['user:email']}));

router.post('/github/callback',
    passport.authenticate('github'),
    (req,res,next)=>{
        res.json({user:req.user});
    }
);

export default router;