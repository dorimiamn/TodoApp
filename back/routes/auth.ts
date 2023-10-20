// About Authentication

//OAuthとRouterも分けたほうがいいよね？

import express, {Application,Request,Response} from "express";
// import session from "express-session";
import passport from "passport";
import {Strategy as GitHubStrategy} from 'passport-github2';
import cors from "cors";
import {expressjwt} from "express-jwt";
import jsonWebToken from "jsonwebtoken";
import cookieParser from "cookie-parser";
import axios ,{AxiosResponse} from "axios";


import User from "../models/user";
import { randomUUID } from "crypto";

type Token_Res={
    access_token:string;
    scope:string;
    token_type:string;
}

type User_Info={
    login:string;
    id:string;
}

const router=express.Router();

const GITHUB_CLIENT_ID:string=process.env.MY_TODO_GITHUB_ID as string;
const GITHUB_CLIENT_SECRET:string=process.env.MY_TODO_GITHUB_SECRET as string;

const jwtSecret="develop";

const corsOption={
    origin:'http://localhost:3000',
    credentials: true,
    optionSuccessStatus:200,
}

// declare module 'express-session'{
    // interface SessionData{
        // authenticated:Boolean;
        // FirstAccessTime:String;
        // counter:number;
    // }
// }

function GitHubAuth(app: Application) {

    console.log('exec GitHubAuth');

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
            return done(null,profile);
        })
        console.log('処理終了')
    }))

    // app.use(
        // session({
            // secret:"Develop",
            // resave:false,
            // saveUninitialized:true,
            // cookie:{
                // secure:'auto',
                // sameSite:'none',
                // httpOnly:true,
                // maxAge:60*60*1000,
            // }
        // })
    // )

    app.use(cors(corsOption));
    app.use(cookieParser());
    //怪しい
    /*
    app.use(expressjwt({
        secret:jwtSecret,
        algorithms:['HS256'],
        getToken: (req:Request) => req.cookies.token,
    }).unless({path:["/github"]}));
    */
} 

router.get('/',(req,res,next)=>{
    // if(req.session.authenticated)console.log('Authenticated');
    // else console.log('Not Authenticated');
    if(!req.cookies.FirstAccessTime){
        const now=new Date();
        res.cookie('FirstAccessTime',now.toISOString);
    }
    const counter=req.cookies.counter ? req.cookies.counter + 1: 1;
    res.cookie('counter',counter);
    console.log('counter:',counter);
    // console.log(req.rawHeaders);
    // res.cookie('name2', 'value2', {
    //     httpOnly: true
    // })
    const token=jsonWebToken.sign({user:'test'},jwtSecret);
    res.cookie('token',token,{httpOnly:true});
    res.json({token});
    // res.send({message:'This is Auth API'})
})

router.get('/session',passport.authenticate('github',{
    failureRedirect:'http://localhost:3000/error',
    }),
    (req,res,next)=>{
        //console.log(req.user);
        console.log('this is session','req.session',req.session);
        //ここをfetchで叩かせることでreq.user を渡せそう。
        //
        res.json(req.user);
        res.send({message:"this is session"});
    }
);

router.get('/github',(req,res,next)=>{
    console.log('code:',req.query['code']);
    axios.post('https://github.com/login/oauth/access_token',{
        client_id:GITHUB_CLIENT_ID,
        client_secret:GITHUB_CLIENT_SECRET,
        code:req.query['code'],
    },{
        headers:{
            'Accept':'application/json'
        },
    }).then(async(token_res:AxiosResponse<Token_Res>)=>{
        const {data,status}=token_res;
        console.log('data:',data);
        console.log('access_token:',data['access_token']);
        await axios.get('https://api.github.com/user',{
            headers:{
                Authorization: `Bearer ${data['access_token']}`,
            }
        }).then((user:AxiosResponse<User_Info>)=>{
            console.log('GitHub access Succeeded!')
            console.log(user.data);
            const token="dummy";//jsonWebToken.sign({user:user.data.login},jwtSecret);
            res.cookie('token',token,{httpOnly:true});
            res.json({
                username:user.data.login,
            });
        }).catch(err=>{
            console.log(err);
        })
    }).catch(err=>{
        console.log(err);
    })
});

//callback後の処理が抜けている
router.get('/github/callback',
    passport.authenticate('github',{
        session:false,
        failureRedirect:'/login',
    }),
    (req,res,next)=>{
        console.log('GitHub Authorized');
        console.log(req.user);
        // const userId:number=req.user&&req.user.id;
        const token="dummy";//jsonWebToken.sign({user:'next'},jwtSecret);
        console.log('token:',token);
        res.cookie('token',token,{httpOnly:true});
        res.redirect('http://localhost:3000');
    }
);

router.get('/logout',(req:Request,res:Response,next)=>{
    req.logout((err)=>{
        if(err)return next(err);
        console.log('logout');
        res.redirect('/');
    })
})

//ログアウト処理を実装しないとダメそう

export {router as authRouter , GitHubAuth}