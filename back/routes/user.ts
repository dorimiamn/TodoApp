//About Processing User Model

import express ,{Request,Response} from "express";
import router from "./todo";
import User from "../models/user";
import { randomUUID } from "crypto";

const testId='26539b42-125a-4d8e-8f3c-cb274a6314c5';

router.get('/',async(_req:Request,res:Response)=>{
    return res.status(200).send({
        message:'This is User API',
    })
});

//Creating User

router.get('/registration',async(_req:Request,res:Response)=>{
    await User.create({
        userId:testId,//randomUUID(),
        name:"TestUser",
    }).then(()=>{
        console.log('Created User.');
        return res.status(200).end();
    })
})

//Reading  User

//Deleting User

//Update Todo

export default router;