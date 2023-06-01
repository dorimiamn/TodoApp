// About Authentication

//OAuthとRouterも分けたほうがいいよね？

import express, {Application,Request,Response} from "express";
import passport from "passport";
import {Strategy as GitHubStrategy} from 'passport-github2';


import User from "../models/user";
import { randomUUID } from "crypto";

const router=express.Router();

const GITHUB_CLIENT_ID:string=process.env.MY_TODO_GITHUB_ID as string;
const GITHUB_CLIENT_SECRET:string=process.env.MY_TODO_GITHUB_SECRET as string;

function GitHubAuth(app: Application) {

    passport.serializeUser((user, done) => {
        console.log('Serialize');
        done(null, user);
    });

    passport.deserializeUser(async function (id: string, done) {
        console.log('Deserialize',id);
        await User.findOne({where:{githubId:id}}).then(user => {
            done(user);
        }).catch(err => {
            done(err);
        })
    });

    //GitHub OAuth
    passport.use(new GitHubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3001/auth/github/callback",
    }, function (accessToken: string, refreshToken: string, profile: any, done: any) {
        //todo
        console.log('OAuth 処理実行', profile);
        User.findOrCreate({
            where: { githubId: profile.id },
            defaults: {
                userId: randomUUID(),
                name: 'test',
            }
        }).then(()=>{
            return done(null,profile.id);
        })
        console.log('処理終了')
    }))

    app.use(passport.session());
} 

router.get('/',(req,res,next)=>{
    res.send({message:'This is Auth API'})
})

router.get('/github',
    passport.authenticate('github',{scope:['user:email']}),
    (req,res,next)=>{
        console.log('Test')
    }
    
);

//callback後の処理が抜けている
router.get('/github/callback',
    passport.authenticate('github',{
        failureRedirect:'/login',
        successRedirect:'/'
    }),
    (req,res,next)=>{
        console.log('GitHub Authorized');
    }
);

export {router as authRouter , GitHubAuth}