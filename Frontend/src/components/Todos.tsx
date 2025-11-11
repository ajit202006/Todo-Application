import { useEffect, useState } from 'react'
import Add from './Add.tsx';
import TodoList from './TodoList.tsx';
import { BiNotepad } from "react-icons/bi";

const URL = process.env.SERVER_URL || "http://localhost:3000";

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showComplete, setShowComplete] = useState(false);
    const [flag, setFlag] = useState(false);
    const userId = localStorage.getItem("userId");
    const [editValue, setEditValue] = useState("");
    const [index, setIndex] = useState(-1);

    useEffect(() => {
        setIsFetching(true);
        fetch(URL + "/todos/fetch", {
            method: "POST",
            body: JSON.stringify({ id: userId }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                setTodos(data.data);
                setIsFetching(false);
            })
            .catch(err => console.log(err));
    }, [flag]);

    // Get todo
    function getTodo(todo_ref: React.RefObject<HTMLInputElement | null>) {
        if (todo_ref.current) {
            addTodo(todo_ref.current.value);
            todo_ref.current.value = "";
        }
    }

    // Adding a task
    function addTodo(value: string) {
        if (value.length <= 3) {
            alert("Task should contain more than 3 characters.")
        } else {
            fetch(URL + "/todos", {
                method: "POST",
                body: JSON.stringify({ id: userId, task: value, isDone: false }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => response.json())
                .then(result => {
                    if (result.status === "success") {
                        setFlag(!flag);
                    } else {
                        alert(result.errors.msg)
                    }
                })
        }
    }

    //Edit a task
    function editTodo(index: number, task: string) {
        setEditValue(task);
        setIsEditing(true);
        setIndex(index);
    }

    // Deleting a task
    function deleteTodo(index: number) {
        fetch(URL + "/todos", {
            method: "DELETE",
            body: JSON.stringify({ id: userId, index }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
            .then(() => {
                setFlag(!flag);
            })
            .catch(() => {
                alert("Task does not exist.");
            })
    }

    // Mark task done
    function setDone(index: number) {
        fetch(URL + "/todos", {
            method: "PUT",
            body: JSON.stringify({ id: userId, index }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(() => {
                setFlag(!flag);
            })
            .catch(err => console.log(err));
    };

    //function to save edit
    function saveEdit(index: number, task: string) {
        console.log("Saving edit");
        fetch(URL + "/todos/edit", {
            method: "PUT",
            body: JSON.stringify({ id: userId, index, task }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(() => {
                setIsEditing(false);
                setIndex(-1);
                setFlag(!flag);
                console.log("Edit saved");
            })
            .catch(err => console.log(err));
    }

    //input change handler
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEditValue(e.target.value);
    }

    return (
        <>
            <Add getTodo={getTodo} setIsEditing={setIsEditing} isEditing={isEditing} />
            <div className='flex flex-col h-4/5 items-center'>
                <h1 className='flex justify-center items-center gap-1 text-[16px] bg-green-700 h-auto p-1 w-full text-white'>
                    <BiNotepad />
                    Your Todo List
                </h1>
                <button className={`absolute p-2 rounded-full bottom-3 transition-colors duration-600 ${showComplete ? "bg-white text-green-900" : "bg-green-900 text-white"}`}
                    onClick={() => isEditing || setShowComplete(!showComplete)}>
                    {showComplete ? "All Tasks" : "Incomplete"}
                </button>
                {
                    !isEditing ?
                        <ol className='*:flex *:justify-between *:my-4 w-4/5 md:h-3/4 h-6/7 mt-2 text=[24px] overflow-y-auto 
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:bg-green-500 
                [&::-webkit-scrollbar-track]:rounded-full  
                [&::-webkit-scrollbar-thumb]:bg-green-800 
                [&::-webkit-scrollbar-thumb]:rounded-full '>
                            <TodoList
                                todos={todos}
                                isFetching={isFetching}
                                setDone={setDone}
                                deleteTodo={deleteTodo}
                                editTodo={editTodo}
                                showComplete={showComplete} />
                        </ol> :
                        <div>
                            <input onChange={handleChange} value={editValue} onKeyDown={(e) => { e.key === 'Enter' && saveEdit(index, editValue) }} />
                            <button className='hover:bg-green-800 active:bg-green-950' onClick={() => saveEdit(index, editValue)}>Save</button>
                            <button className='hover:bg-green-800 active:bg-green-950' onClick={() => { setIndex(-1); setIsEditing(false) }} >Cancel</button>
                        </div>
                }
            </div>
        </>
    );
}

export default Todos
