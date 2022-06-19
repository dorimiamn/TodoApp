import express ,{Request,Response} from "express";
import uuid from "uuid";
//Importing Todo Model
import Todo from "../models/todo";

const router=express.Router();

const testId="aaaa000";

//Showing All Todo
router.get('/table',(req:Request,res:Response)=>{
    Todo.findAll({
        where:{
            userId:req.body.userId
        },
        order:[['createdAt','DESC']]
    }).then(todos=>{
        res.json(todos);
    });
})

//Deleting Todo
router.get('/delete',(req:Request,res:Response)=>{
    return res.status(200).send({
        message:"Deleting Todo"
    })
})

//New Todo
router.post('/new',(req:Request,res:Response)=>{
    Todo.create({
        todoId:uuid.v4(),
        userId:testId,
        text:req.body.text,
        checked:req.body.checked,
    }).then(()=>{
        res.status(200).send({
            message:"Success"
        })
    })
});

//Updating Todo
router.post('/update',(req:Request,res:Response)=>{
    return res.status(200).send({
        message:"Updating Todo"
    })
})

export default router;