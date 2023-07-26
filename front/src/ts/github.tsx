import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import logo from './logo.svg'
import './../App.css'

axios.defaults.withCredentials=true;

const endPoint: string = 'http://localhost:3001/'

type User_Info={
    username:string;
}

export default function github_callback(){
    const [username,setUsername]=useState<String | null>();
    const location=useLocation()
    console.log(location.search)
    
    useEffect(() => {
        //ユーザー認証
        axios.get('http://localhost:3001/auth/github'+location.search)
            .then((res:AxiosResponse<User_Info>)=>{
                // setJwt(res.data.token);
                console.log(res.data.username);
                setUsername(res.data.username);
            })
    }, []);

    return(
        <div>
            <h1>コールバック</h1>
            <p>あなたのユーザ名は{username}</p>
        </div>
    )
}