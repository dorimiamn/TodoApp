//About Processing User Model

import express ,{Request,Response} from "express";
import router from "./todo";
import User from "../models/user";
import { randomUUID } from "crypto";

router.get('/',async(_req:Request,res:Response)=>{
    return res.status(200).send({
        message:'This is User API',
    })
});

//Creating User

router.get('/registration',async(_req:Request,res:Response)=>{
    await User.create({
        userId:randomUUID(),
        name:"TestUser",
    }).then(()=>{
        console.log('Created User.');
    })
})

//Reading  User

//Deleting User

//Update Todo

export default router;