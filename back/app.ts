//Importing Module
import express, { Application, Request, Response } from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import {Strategy as GitHubStrategy} from 'passport-github2';
import session from 'express-session';

import sequelize from './models/db_config';
import cors from 'cors';

//Importing Router
import todoRouter from './routes/todo';
import userRouter from './routes/user';
//Importing Models

import User from './models/user';
import Todo from './models/user';
import { Error } from 'sequelize';
import { strict } from 'assert';

//Setting Relation 

const app: Application = express();
const PORT = 3001;

const GITHUB_CLIENT_ID="";
const GITHUB_CLIENT_SECRET="";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({secret:"Develop"}));
app.use(passport.initialize());
app.use(passport.session());

//GitHub OAuth
passport.use(new GitHubStrategy({
    clientID:GITHUB_CLIENT_ID,
    clientSecret:GITHUB_CLIENT_SECRET,
    callbackURL:"localhost:3000/auth/github/callback"
},function(accessToken:string,refreshToken:string,profile:any,done:any){
    //todo
    User.findOrCreate({where:{githubId:profile.id}}).then((user)=>{
        return done(user);
    }).catch(err=>{
        console.error(err);
        return done(err);
    })
}))

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

app.use('/todo', todoRouter);
app.use('/user', userRouter);

app.get('/', async (_req: Request, res: Response) => {
    return res.status(200).send({
        message: "Hello World",
    })
})

sequelize.authenticate()
    .then(async () => {
        console.log('Connection has been established successfully.');
        await sequelize.sync({ force: true });
    })
    .catch((error) => {
        console.error('Unable to connect to the database', error);
    })

try {
    app.listen(PORT, () => {
        console.log(`dev server running at:http://localhost:${PORT}`);
    })
} catch (e) {
    if (e instanceof Error) console.error(e.message)
}