import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import logo from './logo.svg'
import './../App.css'

axios.defaults.withCredentials=true;

const endPoint: string = 'http://localhost:3001/'
const callBackURI:string='http://localhost:3000/auth/github'
const GITHUB_CLIENT_ID:string=import.meta.env.VITE_TODO_GITHUB_ID;

export default function auth(){    
    const handleOnClick=()=>{
        console.log('処理実行');
        axios.get('https://github.com/login/oauth/authorize',
            {
                params:{
                    client_id:GITHUB_CLIENT_ID,
                    redirect_uri:'http://localhost:3000/auth/github'
                }
            })
            .then((res)=>{
                console.log(res);
            })
    }

    console.log('GITHUB_CLIENT_ID',GITHUB_CLIENT_ID)

    return(
        <div className='Auth'>
            <h1>ログイン</h1>
            <button onClick={handleOnClick}>ログイン</button>
            <Link to={'https://github.com/login/oauth/authorize?client_id='+GITHUB_CLIENT_ID+'&redirect_uri='+callBackURI}>Link</Link>
        </div>
    )
}