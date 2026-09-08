import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addtodo, deletetodo } from "../redux/todoSlice";

function Todo() {
  const [text, setText] = useState("");

  const todos = useSelector((state) => state.todo.todos);

  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim() === "") return;

    dispatch(addtodo(text));
    setText("");
  };

  return (
    <div>
      <h1>Todo List</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo"
      />

      <button onClick={handleAdd}>Add</button>

      {todos.map((todo) => (
        <div key={todo.id}>
          <span>{todo.text}</span>

          <button onClick={() => dispatch(deletetodo(todo.id))}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Todo