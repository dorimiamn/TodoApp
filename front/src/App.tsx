import React, { useState } from 'react'
import axios from 'axios'
import logo from './logo.svg'
import './App.css'

const endPoint:string='http://localhost:3001/'

type Todo={
    readonly id:number;
    text:string;
    checked:boolean;
}

type Filter ="all"|"checked"|"unchecked";

function App() {
  const [count, setCount] = useState(0)
  const [text,setText]=useState('');
  const [todos,setTodos]=useState<Todo[]>([]);
  const [filter,setFilter]=useState<Filter>("all");

  const filteredTodos=todos.filter((todo)=>{
      switch(filter){
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

  //Todoタイトル更新
  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setText(e.target.value);
  }

  //Todo新規作成
  const handleOnSubmit=()=>{
      if (!text)return ;

      const newTodo:Todo={
        id:new Date().getTime(),
        text:text,
        checked:false
      };

      setTodos([newTodo,...todos]);
      setText('');

      const json_todo=JSON.stringify([newTodo, ...todos]);

      const updateEndPoint:string=endPoint+'todo/update';

      axios.post(
        updateEndPoint,json_todo
      ).then((res)=>{
        console.log('ok');
      }).catch((e)=>{
        console.error('err:',e);
      })

      console.log(json_todo);
      //json_todoのAPI Call
  }

  //TodoのChecked更新
  const handleOnCheck=(id:number,checked:boolean)=>{
    const deepCopy=todos.map((todo)=>({...todo}));

    const newTodos=deepCopy.map((todo)=>{
        if(todo.id==id){
            todo.checked=!checked;
        }
        return todo;
    });

    setTodos(newTodos);

    //JSON変換&post
  }

  //Todo削除
  const handleOnDelete=(id:number)=>{
    const deepCopy=todos.map((todo)=>({...todo}));

    const newTodos:Todo[]=[];
    deepCopy.forEach((todo)=>{
        if(todo.id!==id)newTodos.push(todo);
    })
    setTodos(newTodos);

    //JSON化してpost
  }

  const postTest=()=>{
    axios.get(
        endPoint
    ).then((res)=>{
        console.log(res);
        console.log(res.data.message)
    }).catch(err=>{
        console.log("err:",err);
    })
  }

  return (
    <div className="App">
        <h1>Todo App</h1>
        <input type="button" value="Test" onClick={()=>postTest()}/>
        <form onSubmit={(e)=>{
            e.preventDefault();
            handleOnSubmit();
        }}>
            <input type="text" value={text} onChange={(e)=>handleOnChange(e)}/>
        </form>
        <select defaultValue="all" onChange={(e)=>setFilter(e.target.value as Filter)}>
            <option value="all">全てのタスク</option>
            <option value="checked">完了したタスク</option>
            <option value="unchecked">未完了のタスク</option>
        </select>
        <ul>
            {filteredTodos.map((todo)=>{
                return <li key={todo.id}>
                    <input type="checkbox" checked={todo.checked} onChange={()=>handleOnCheck(todo.id,todo.checked)}/>
                    <input type="text" value={todo.text} onChange={(e)=>handleOnChange(e)}/>
                    <input type="button" value="削除" disabled={todo.checked} onClick={()=>handleOnDelete(todo.id)} />
                </li>
            })}
        </ul>
    </div>
  )
}

export default App
