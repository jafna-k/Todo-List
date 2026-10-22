// import Header from "./Components/Header";
// import Todo from "./Components/Todo";
// import { useDispatch, useSelector } from "react-redux";
// import { addtodo, deletetodo } from "./redux/todoSlice";

// function App() {
//   const todos = useSelector((state) => state.todo.todos);

//   const dispatch = useDispatch();

//   return (
//     <>
//       <Header />

//       <div className="p-5">
//         <h1 className="text-2xl font-bold mb-5">
//           Todo List
//         </h1>

//         <button
//           className="bg-green-600 text-white px-5 py-2 rounded-md"
//           onClick={() => dispatch(addtodo("New Todo"))}
//         >
//           Add Todo
//         </button>

//         {todos.map((todo) => (
//           <div
//             key={todo.id}
//             className="flex gap-5 items-center mt-5"
//           >
//             <span>{todo.text}</span>

//             <button
//               className="bg-red-600 text-white px-4 py-1 rounded-md"
//               onClick={() => dispatch(deletetodo(todo.id))}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default App



import Header from "./Components/Header";
import Todo from "./Components/Todo";
import { useDispatch, useSelector } from "react-redux";
import { addtodo, deletetodo } from "./redux/todoSlice";

function App() {
  const todos = useSelector((state) => state.todo.todos);

  const dispatch = useDispatch();

  return (
    <>
      <Header />

      <div className="p-5">
      

        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex gap-5 items-center mt-5"
          >
            <span>{todo.text}</span>

            <button
              className="bg-red-600 text-white px-4 py-1 rounded-md"
              onClick={() => dispatch(deletetodo(todo.id))}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;