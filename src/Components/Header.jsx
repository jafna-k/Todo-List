import React, { useState, useEffect } from "react";

function Header() {
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Save tasks to LocalStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add task
  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task.trim(),
        completed: false,
      },
    ]);

    setTask("");
  };

  // Complete task
  const completeTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  // Edit task
  const editTask = (id) => {
    const currentTask = tasks.find((item) => item.id === id);

    const newTask = prompt("Edit task", currentTask.text);

    if (newTask && newTask.trim() !== "") {
      setTasks(
        tasks.map((item) =>
          item.id === id
            ? { ...item, text: newTask.trim() }
            : item
        )
      );
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (item) => item.completed
  ).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
         

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            To-Do List
          </h1>

          <p className="text-slate-500 mt-2">
            Organize your tasks and stay productive.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-3 md:gap-5 mb-6">

          {/* Total */}
          <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500">
              Total
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">
              {totalTasks}
            </h2>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500">
              Pending
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-amber-500 mt-1">
              {pendingTasks}
            </h2>
          </div>

          {/* Completed */}
          <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500">
              Completed
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-green-500 mt-1">
              {completedTasks}
            </h2>
          </div>

        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 md:p-7">

          {/* Add Task */}
          <div className="flex flex-col sm:flex-row gap-3 mb-7">

            <input
              type="text"
              placeholder="What needs to be done?"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTask();
                }
              }}
              className="
                flex-1
                px-5
                py-4
                rounded-xl
                bg-slate-50
                border
                border-slate-200
                text-base
                outline-none
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-100
              "
            />

            <button
              onClick={addTask}
              className="
                px-7
                py-4
                rounded-xl
                bg-indigo-600
                text-white
                font-semibold
                hover:bg-indigo-700
                transition
              "
            >
              + Add Task
            </button>

          </div>

          {/* Task Header */}
          <div className="flex items-center justify-between mb-4">

            <h2 className="text-lg font-semibold text-slate-900">
              My Tasks
            </h2>

            <span className="text-sm text-slate-400">
              {pendingTasks} pending
            </span>

          </div>

          {/* Tasks */}
          <div className="space-y-3">

            {tasks.length === 0 ? (

              <div className="py-14 text-center">

                <div className="text-5xl mb-4">
                  ✓
                </div>

                <h3 className="text-lg font-semibold text-slate-700">
                  No tasks yet
                </h3>

                <p className="text-sm text-slate-400 mt-1">
                  Add your first task above.
                </p>

              </div>

            ) : (

              tasks.map((item) => (

                <div
                  key={item.id}
                  className="
                    group
                    flex
                    items-center
                    gap-4
                    p-4
                    rounded-2xl
                    border
                    border-slate-200
                    hover:border-slate-300
                    hover:shadow-sm
                    transition
                  "
                >

                  {/* Checkbox */}
                  <button
                    onClick={() => completeTask(item.id)}
                    className={`
                      w-6
                      h-6
                      flex
                      items-center
                      justify-center
                      rounded-full
                      border-2
                      flex-shrink-0
                      transition
                      ${
                        item.completed
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-slate-300 hover:border-indigo-500"
                      }
                    `}
                  >
                    {item.completed && (
                      <span className="text-sm">
                        ✓
                      </span>
                    )}
                  </button>

                  {/* Task Text */}
                  <p
                    className={`
                      flex-1
                      text-base
                      font-medium
                      break-words
                      ${
                        item.completed
                          ? "line-through text-slate-400"
                          : "text-slate-700"
                      }
                    `}
                  >
                    {item.text}
                  </p>

                  {/* Edit */}
                  <button
                    onClick={() => editTask(item.id)}
                    className="
                      w-9
                      h-9
                      rounded-lg
                      text-slate-400
                      hover:text-indigo-600
                      hover:bg-indigo-50
                      transition
                    "
                    title="Edit"
                  >
                    ✎
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => deleteTask(item.id)}
                    className="
                      w-9
                      h-9
                      rounded-lg
                      text-slate-400
                      hover:text-red-500
                      hover:bg-red-50
                      transition
                    "
                    title="Delete"
                  >
                    🗑
                  </button>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Header;