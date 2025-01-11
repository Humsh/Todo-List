import { useEffect, useLayoutEffect, useState } from 'react'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';
import { format } from "date-fns";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'


function App() {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "MMMM d, yyyy"); // e.g., January 8, 2025
  const formattedDay = format(currentDate, "EEEE");
  //an array inside which we will have all the todos
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const togglefinished = (e) => {
    setshowfinished(!showfinished)

  }

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos)

    }

  }, [])

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo);
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS();



  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();

  }
  const handleDelete = (e, id) => {
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos);
    saveToLS();


  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS();

  }
  const handleChange = (e) => {
    setTodo(e.target.value)

  }

  return (
    <>
      <Navbar />
      <div className="mx-10 md:container rounded-xl md:mx-auto my-5  p-5 bg-slate-700 text-white min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-3xl' >DoTask - Manage your task at one place</h1>
        <div><h1 className='text-center hidden md:block text-pink-400 font-bold text-5xl m-5'>{formattedDay}</h1>
          <h1 className='text-center m-5' >{formattedDate}</h1>
        </div>
        <div className="addtodo my-5 flex flex-col gap-4  ">
          <h2 className='text-lg font-bold' >Add a Todo</h2>
          <input onChange={handleChange} value={todo} className='border-color:black text-black w-full ' type="text" />
          <button onClick={handleAdd} disabled={todo.length < 2} className='bg-pink-500 p-0.5 m-2 px-2 font-bold  rounded-md hover:bg-pink-300'>Add</button>
        </div>
        <input onChange={togglefinished} type="checkbox" checked={showfinished} /> Show Finished
        <h2 className='text-lg font-bold' >Your Todo's</h2>
        <div className="container todos  ">
          {todos.length === 0 && <div className='m-5' >Enter to Add a Todo</div>}
          {todos.map(item => {
            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo w-full  flex my-3  justify-between">
              <div className='flex  gap-5  my-2'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                <div className= {`${item.isCompleted ? "line-through" : ""} break-all w-1/2 `} >{item.todo} </div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-pink-500 p-0.5 m-2 px-2 font-bold  rounded-md hover:bg-pink-300'><AiFillEdit /></button>
                <button onClick={(e) => handleDelete(e, item.id)} className='bg-pink-500 p-0.5 m-2 px-2 font-bold  rounded-md hover:bg-pink-300'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>


      </div>
    </>
  )
}

export default App
