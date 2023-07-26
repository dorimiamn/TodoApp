import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import logo from './logo.svg'
import './../App.css'

axios.defaults.withCredentials=true;

const endPoint: string = 'http://localhost:3001/'

export default function github_callback(){
    const [jwt,setJwt]=useState<String | null>();
    const location=useLocation()
    console.log(location.search)
    
    useEffect(() => {
        //ユーザー認証
        axios.get('http://localhost:3001/auth/github'+location.search)
            .then((res)=>{
                // setJwt(res.data.token);
                console.log(res);
            })
    }, []);

    return(
        <div>
            <h1>コールバック</h1>
        </div>
    )
}