import React, { useEffect, useState } from 'react'
import axios from 'axios'
import logo from './logo.svg'
import './../App.css'

axios.defaults.withCredentials=true;

const endPoint: string = 'http://localhost:3001/'

export default function auth(){
    const [jwt,setJwt]=useState<String | null>();
    
    const handleOnClick=()=>{
        console.log('処理実行');
        axios.get('http://localhost:3001/auth')
            .then((res)=>{
                // setJwt(res.data.token);
                console.log(res.data.token);
            })
    }

    return(
        <div className='Auth'>
            <h1>ログイン</h1>
            <button onClick={handleOnClick}>ログイン</button>
            <a href="http://localhost:3001/auth/github">ログイン</a>
        </div>
    )
}