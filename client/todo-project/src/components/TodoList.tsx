import React, { useState, useEffect } from "react";
import { fetchTodos, updateTodo, deleteTodo, createTodo } from "../helpers/api";

interface TodoListProps {}

const TodoList: React.FC<TodoListProps> = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editableTodo, setEditableTodo] = useState<{ id: number; name: string } | null>(null);
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todosData = await fetchTodos();
        setTodos(todosData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateTodo = (id: number, name: string): void => {
    setEditableTodo({ id, name });
  };

  const handleSaveTodo = async (): Promise<void> => {
    if (editableTodo) {
      try {
        await updateTodo(editableTodo.id, editableTodo.name);
        const updatedTodos = await fetchTodos();
        setTodos(updatedTodos);
        setEditableTodo(null);
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    }
  };

  const handleDeleteTodo = async (id: number): Promise<void> => {
    try {
      await deleteTodo(id);
      const updatedTodos = await fetchTodos(); // Re-fetch todos after deletion
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleAddTodo = async (): Promise<void> => {
    if (newTodo.trim() !== "") {
      try {
        // Make API call to add the new todo
        await createTodo({ name: newTodo });
        const updatedTodos = await fetchTodos();
        setTodos(updatedTodos);
        setNewTodo("");
      } catch (error) {
        console.error("Error adding new todo:", error);
      }
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Todo List</h1>
      <div style={{ marginBottom: "10px" }}>
        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Add a new todo" />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      {loading ? (
        <div style={{ textAlign: "center" }}>Loading...</div>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {todos.map((todo) => (
            <li key={todo.id}>
              {editableTodo?.id === todo.id ? (
                <input
                  type="text"
                  value={editableTodo.name}
                  onChange={(e) => {
                    if (editableTodo) {
                      setEditableTodo({ ...editableTodo, name: e.target.value });
                    }
                  }}
                />
              ) : (
                <div>{todo.name}</div>
              )}
              <div>
                {editableTodo?.id === todo.id ? (
                  <button onClick={handleSaveTodo}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleUpdateTodo(todo.id, todo.name)}>Edit</button>
                    <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
