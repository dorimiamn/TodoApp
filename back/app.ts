import express ,{Application,Request,Response} from 'express';
import sequelize from './models/db_config';

//Importing Router
import todoRouter from './routes/todo';
import userRouter from './routes/user';
//Importing Models

import User from './models/user';
import Todo from './models/user';
import { Error } from 'sequelize';

//Setting Relation 

const app:Application=express();
const PORT=3001;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/todo',todoRouter);
app.use('/user',userRouter);

app.get('/',async(_req:Request,res:Response)=>{
    return res.status(200).send({
        message:"Hello World",
    })
})

sequelize.authenticate()
    .then(async ()=>{
        console.log('Connection has been established successfully.');
        await sequelize.sync({force:true});
    })
    .catch((error)=>{
        console.error('Unable to connect to the database',error);
    })

try{
    app.listen(PORT,()=>{
        console.log(`dev server running at:http://localhost:${PORT}`);
    })
}catch(e){
    if(e instanceof Error)console.error(e.message )
}