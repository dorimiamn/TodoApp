import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Routes , Route, BrowserRouter} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

const endPoint: string = 'http://localhost:3001/'


type Todo = {
    readonly id: number;
    text: string;
    checked: boolean;
}

type Filter = "all" | "checked" | "unchecked";


function TodoApp() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');
    const [user,setUser]=useState();
    const [jwt,setJwt]=useState<String | null>();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<Filter>("all");

    const filteredTodos = todos.filter((todo) => {
        switch (filter) {
            case 'all':
                return todo;
            case 'checked':
                return todo.checked;
            case 'unchecked':
                return !todo.checked;
            default:
                return todo;
        }
    });

    //レンダリング初回に実行される処理
    useEffect(() => {
        // バックエンドから保存した Todo を取得する
        const getEndPoint: string = endPoint + 'todo/table';
        axios.get(getEndPoint).then((res) => {
            console.log('res.data.todo', res.data.todo);
            setTodos(res.data.todo);
        }).catch((e) => {
            console.error('err:', e);
        })
    }, []);

    //Todoタイトル更新
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    //Todo新規作成
    const handleOnSubmit = () => {
        if (!text) return;

        const newTodo: Todo = {
            id: new Date().getTime(),
            text: text,
            checked: false
        };

        setTodos([newTodo, ...todos]);
        setText('');

        const deepCopy = [newTodo, ...todos];

        console.log('json_todo', deepCopy);

        const updateEndPoint: string = endPoint + 'todo/update';

        //json_todoのAPI Call
        axios.post(
            updateEndPoint, deepCopy
        ).then((res) => {
            console.log('OK');
        }).catch((e) => {
            console.error('err:', e);
        })

        console.log('handleOnSubmit Done');
    }

    //Todo更新
    const handleOnUpdate = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const deepCopy = todos.map((todo) => ({ ...todo }));

        const newTodos = deepCopy.map((todo) => {
            if (todo.id === id) {
                todo.text = e.target.value;
            }
            return todo;
        })

        setTodos(newTodos);

        const updateEndPoint: string = endPoint + 'todo/update';

        //json_todoのAPI Call
        axios.post(
            updateEndPoint, newTodos
        ).then((res) => {
            console.log('OK');
        }).catch((e) => {
            console.error('err:', e);
        })

        console.log('handleOnUpdate Done');
    }

    //TodoのChecked更新
    const handleOnCheck = (id: number, checked: boolean) => {
        const deepCopy = todos.map((todo) => ({ ...todo }));

        const newTodos = deepCopy.map((todo) => {
            if (todo.id === id) {
                todo.checked = !checked;
            }
            return todo;
        });

        setTodos(newTodos);

        const updateEndPoint: string = endPoint + 'todo/update';
        //json_todoのAPI Call
        axios.post(
            updateEndPoint, newTodos
        ).then((res) => {
            console.log('OK');
        }).catch((e) => {
            console.error('err:', e);
        })

        console.log('handleOnCheckUpdate Done');
    }

    //Todo削除
    const handleOnDelete = (id: number) => {
        const deepCopy = todos.map((todo) => ({ ...todo }));

        const newTodos: Todo[] = [];
        deepCopy.forEach((todo) => {
            if (todo.id !== id) newTodos.push(todo);
        })
        setTodos(newTodos);

        const updateEndPoint: string = endPoint + 'todo/update';
        //json_todoのAPI Call
        axios.post(
            updateEndPoint, newTodos
        ).then((res) => {
            console.log('OK');
        }).catch((e) => {
            console.error('err:', e);
        })

        console.log('handleOnDelete Done');
    }

    return (
        <div className="Todo">
            <h1>Todo App</h1>
            <Form onSubmit={(e) => {
                e.preventDefault();
                handleOnSubmit();
            }}>
                <Form.Group className="mb-3" controlId="todoName">
                    <Form.Control type="text" placeholder='Todo を入力しよう' value={text} onChange={(e) => handleOnChange(e as React.ChangeEvent<HTMLInputElement>)} ></Form.Control>
                </Form.Group>
            </Form>
            <Form.Select aria-label='Task List' defaultValue="all" onChange={(e) => setFilter(e.target.value as Filter)}>
                <option value="all">全てのタスク</option>
                <option value="checked">完了したタスク</option>
                <option value="unchecked">未完了のタスク</option>
            </Form.Select>
            <ul>
                {filteredTodos.map((todo) => {
                    return <li key={todo.id}>
                        <Form.Check type="checkbox" checked={todo.checked} onChange={() => handleOnCheck(todo.id, todo.checked)} />
                        <Form.Control type="text" value={todo.text} onChange={(e) => handleOnUpdate(todo.id, e as React.ChangeEvent<HTMLInputElement>)} />
                        <Button type="button" value="削除" disabled={todo.checked} onClick={() => handleOnDelete(todo.id)}>削除</Button>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default TodoApp