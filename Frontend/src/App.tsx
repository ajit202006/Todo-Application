import { Routes, Route } from "react-router-dom";
import Home from './pages/Home.tsx';
import Register from './pages/Register.tsx';
import Login from './pages/Login.tsx';
import Todo from './pages/Todo.tsx';

// import ContextTodos from './components/Todos';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/todos" element={<Todo />} />
    </Routes>

  )
}

export default App
