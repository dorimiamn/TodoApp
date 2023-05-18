import React, { useEffect, useState } from 'react'
import axios from 'axios'
import logo from './logo.svg'
import './../App.css'

axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

const endPoint: string = 'http://localhost:3001/'

export default function auth(){

    const handleOnLogin=()=>{
        console.log('Login Process Start');

        const LoginEndPoint:string=endPoint+'auth/github';

        axios.get(
            LoginEndPoint
        ).then(res=>{
            console.log(res);
        }).catch(e=>{
            console.warn('Failed');
            console.error(e);
        })
    }

    return(
        <div className='Auth'>
            <h1>ログイン</h1>
            <input type="button" value="GitHubログイン"  onClick={()=>handleOnLogin()}/>
            <a href="http://localhost:3001/auth/github">ログイン</a>
        </div>
    )
}