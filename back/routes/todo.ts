import express, { Request, Response } from "express";
import { randomUUID } from "crypto";
import uuid from "uuid";
//Importing Todo Model
import Todo from "../models/todo";
import User from "../models/user";
import { json } from "sequelize";

const router = express.Router();

const testId = '26539b42-125a-4d8e-8f3c-cb274a6314c5';

router.get('/', async (_req: Request, res: Response) => {
    return res.status(200).send({
        message: "This is Todo API",
    })
});

//Todo 提供
router.post('/json', (req: Request, res: Response) => {
    User.findByPk(req.body.userId)
        .then(user => {
            console.log('user:', user);

            const json_data: JSON|null= user?.dataValues.todo as JSON|null;
            console.log('json_data', json_data);

            return res.json({ json_data: json_data })
        }).catch(err => {
            console.error('err:', err);
            return res.status(500).end();
        })
})

//Todoの更新
router.post('/update', (req: Request, res: Response) => {
    const filter = {
        where: {
            userId: testId
        }
    };

    console.log('req.body:', req.body);

    const param = {
        todo: req.body
    };

    User.update(param, filter)
        .then(() => {
            console.log('todo updated uuid:', testId);
            return res.status(200).end();
        }).catch((err) => {
            console.error('err:', err);
            return res.status(500).end();
        })
})

//Reading All Todo
router.get('/table', (req: Request, res: Response) => {
    Todo.findAll({
        where: {
            userId: req.body.userId
        },
        order: [['createdAt', 'DESC']]
    }).then(todos => {
        return res.json(todos);
    });
});

//Deleting Todo
router.get('/delete', (req: Request, res: Response) => {
    return res.status(200).send({
        message: "Deleting Todo"
    })
});

//New Todo
router.post('/new', (req: Request, res: Response) => {
    Todo.create({
        todoId: uuid.v4(),
        userId: testId,
        text: req.body.text,
        checked: req.body.checked,
    }).then(() => {
        res.status(200).send({
            message: "Success"
        })
    })
});


export default router;