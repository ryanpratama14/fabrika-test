"use client";
import { Fragment, useState } from "react";
import TodoItem from "@/components/TodoItem";
import { Toaster, toast } from "react-hot-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { generateRandomNumber } from "@/utils/utils";

const initialValue = {
  title: "",
  date: "",
  id: generateRandomNumber(),
};

export default function Home(): React.JSX.Element {
  const [addTodo, setAddTodo] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState(initialValue);
  const [selectedTodo, setSelectedTodo] = useState<number[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [todos, setTodos] = useLocalStorage<TodosItems[]>("todos", [
    {
      id: generateRandomNumber(),
      title: "Mastering Next.js",
      date: "2023/07/14",
      completed: false,
    },
    {
      id: generateRandomNumber(),
      title: "SSR Course",
      date: "2023/08/14",
      completed: false,
    },
    {
      id: generateRandomNumber(),
      title: "React Native Lesson 22",
      date: "2023/09/14",
      completed: false,
    },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTodo({ ...newTodo, [name]: value });
  };

  const handleToggle = () => {
    setAddTodo(!addTodo);
    setNewTodo(initialValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos([...todos, { ...newTodo, completed: false }]);
    toast.success("Added");
    setAddTodo(false);
  };

  const handleSelect = (index: number) => {
    if (selectedTodo.includes(index)) {
      setSelectedTodo(selectedTodo.filter((i) => i !== index));
    } else {
      setSelectedTodo([...selectedTodo, index]);
    }
  };

  const handleDeleteTodos = () => {
    const newTodos = todos.filter((_, index) => !selectedTodo.includes(index));
    setTodos(newTodos);
    setSelectedTodo([]);
    toast.success("Selected todos deleted");
  };

  const markTodo = (index: number) => {
    const newData = [...todos];
    newData[index].completed = true;
    setTodos(newData);
    toast.success("Marked as done");
  };

  const deleteTodo = (index: number) => {
    const newData = [...todos];
    newData.splice(index, 1);
    setTodos(newData);
    toast.success("Todo deleted");
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "ongoing":
        return !todo.completed;
      case "completed":
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <Fragment>
      <Toaster />
      <main className="px-normal flex flex-col gap-6 justify-center items-center min-h-screen themed-bg-darker">
        <h1>Todos App</h1>
        <section className="border-2 themed-border rounded p-4 flex flex-col gap-4 w-full md:w-[80%] xl:w-[50%]">
          <div className="flex justify-between">
            {selectedTodo.length ? (
              <button
                type="button"
                onClick={handleDeleteTodos}
                className="text-white bg-red-500"
              >
                Delete selected
              </button>
            ) : (
              <button
                type="button"
                onClick={handleToggle}
                className={`text-white ${
                  addTodo ? "bg-red-500" : "bg-blue-500"
                }`}
              >
                {addTodo ? "Cancel" : "Add Task"}
              </button>
            )}
            <select
              value={filter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFilter(e.target.value)
              }
              className=" bg-white"
            >
              <option value="all">All</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          {addTodo ? (
            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
              <input
                placeholder="Enter task..."
                value={newTodo.title}
                onChange={handleChange}
                name="title"
                type="text"
                className="col-span-2"
                required
              />
              <input
                value={newTodo.date}
                onChange={handleChange}
                name="date"
                type="date"
                className="col-span-1 iOS"
                required
              />
              <button
                type="submit"
                className="col-span-3 bg-blue-500 text-white"
              >
                Add to Todo List
              </button>
            </form>
          ) : null}
          {filteredTodos.map((todo, index) => {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                index={index}
                addTodo={addTodo}
                selectedTodo={selectedTodo}
                handleSelect={handleSelect}
                markTodo={markTodo}
                deleteTodo={deleteTodo}
                closeAddTodo={() => setAddTodo(false)}
              />
            );
          })}
        </section>
      </main>
    </Fragment>
  );
}
