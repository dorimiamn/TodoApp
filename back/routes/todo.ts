import express ,{Request,Response} from "express";
import { randomUUID } from "crypto";
import uuid from "uuid";
//Importing Todo Model
import Todo from "../models/todo";
import User from "../models/user";

const router=express.Router();

const testId='26539b42-125a-4d8e-8f3c-cb274a6314c5';

router.get('/',async(_req:Request,res:Response)=>{
    return res.status(200).send({
        message:"This is Todo API",
    })
});

//Todoの更新

router.post('/update',(req:Request,res,Response)=>{
    const filter={
        where:{
            userId:testId
        }
    };

    const param={
        todo:req.body
    };

    console.log(req.body);

    User.update(param,filter)
    .then(()=>{
        console.log('todo updated uuid:',testId);
        res.status(200);
    }).catch((err)=>{
        console.error('err:',err);
        res.status(500);
    })
})

//Reading All Todo
router.get('/table',(req:Request,res:Response)=>{
    Todo.findAll({
        where:{
            userId:req.body.userId
        },
        order:[['createdAt','DESC']]
    }).then(todos=>{
        res.json(todos);
    });
});

//Deleting Todo
router.get('/delete',(req:Request,res:Response)=>{
    return res.status(200).send({
        message:"Deleting Todo"
    })
});

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
});

export default router;