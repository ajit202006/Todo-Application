import { MdDelete, MdEdit } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';

const TodoList = (
    {
        todos = [{ task: '', isDone: false }],
        isFetching = false,
        setDone = (index: number) => { },
        deleteTodo = (index: number) => { },
        editTodo = (index: number, task: string) => { },
        showComplete = false
    }) => {

    if (isFetching) {
        return <li>Fetching data...</li>
    }
    if (todos && !todos.length) {
        return 'Nothing to show....'
    }
    const todoList = todos.map((todo, index) => {
        if (!showComplete && todo.isDone) {
            return null;
        }
        return ( 
            <li key={index} className='text-[18px]'>
                <div className={`flex gap-2 w-5/6 h-auto items-center ${todo.isDone ? 'line-through' : ''}`}>
                    <label htmlFor={index + ''} title={todo.isDone ? 'Mark Undone' : 'Mark Done'} className='text-[16px] bg-green-700 p-1 rounded-full text-white min-w-6 h-6'>
                        {todo.isDone && <FaCheck />}
                    </label>
                    <input className='hidden' id={index + ''} type='checkbox' onChange={() => setDone(index)} checked={todo.isDone} />
                    <p className='w-7/8 h-auto text-balance wrap-break-word'>{todo.task}</p>
                </div>
                <div className='*:bg-green-700 *:p-1 *:rounded-sm [&_label]:rounded-full *:mx-1.5 *:text-white flex items-center'>
                    {todo.isDone || <button className='hover:bg-green-800 active:bg-green-950' title='Save'
                        onClick={() => {editTodo(index, todo.task)}}><MdEdit /></button>}
                    <button className='hover:bg-green-800 active:bg-green-950' title='Delete' onClick={() => deleteTodo(index)}><MdDelete /></button>
                </div>
            </li>
        )
    });
    if (!showComplete && todoList.every(todo => todo === null)) {
        return 'All tasks are done...';
    }
    return (
        <>
            {todoList}
        </>
    )
}

export default TodoList
