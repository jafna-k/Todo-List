import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",

  initialState,

  reducers: {
    addtodo: (state, action) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload,
      });
    },

    deletetodo: (state, action) => {
      state.todos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
    },
  },
});

export const { addtodo, deletetodo } = todoSlice.actions

export default todoSlice.reducer