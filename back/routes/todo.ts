import express ,{Request,Response} from "express";
import { UUID } from "sequelize";

//Importing Todo Model
import Todo from "../models/todo";

const router=express.Router();

//Showing All Todo
router.get('/table',(req:Request,res:Response)=>{
    return res.status(200).send({
        message:"Showing Todo Table"
    })
})

//Deleting Todo
router.get('/delete',(req:Request,res:Response)=>{
    return res.status(200).send({
        message:"Deleting Todo"
    })
})

//New Todo
router.post('/new',(req:Request,res:Response)=>{
    return res.status(200).send({
        message:"New Todo Created"
    })
});

//Updating Todo
router.post('/update',(req:Request,res:Response)=>{
    return res.status(200).send({
        message:"Updating Todo"
    })
})

export default router;