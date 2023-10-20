import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Routes , Route, BrowserRouter} from "react-router-dom";

import Header from './ts/header';
import TodoApp from './ts/todo';
import Auth from './ts/auth';
import GitHub_CallBack from './ts/github'
import Not_Found from './ts/not_found'
import logo from './logo.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.withCredentials=true;

const endPoint: string = 'http://localhost:3001/'

// const testId = '26539b42-125a-4d8e-8f3c-cb274a6314c5';

function App() {

    return (
        <div className="App">
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<TodoApp/>}></Route>
                    <Route path='/auth/*' element={<GitHub_CallBack/>}></Route>
                    <Route path='*' element={<Not_Found/>}></Route>

                    {/* <Route path='/' element={<Auth/>}></Route> */}
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App