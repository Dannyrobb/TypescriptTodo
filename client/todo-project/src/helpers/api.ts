const BASE_URL = "http://127.0.0.1:5000";

// Function to fetch all todos
export const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const response = await fetch(`${BASE_URL}/todos`);
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error; // Re-throw the error to handle it elsewhere
  }
};

// Function to create a new todo
export const createTodo = async (newTodo: NewTodo): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    if (!response.ok) {
      throw new Error("Failed to create todo");
    }
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

// Function to delete a todo by id
export const deleteTodo = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};

// Function to update a todo by id
export const updateTodo = async (id: number, updatedName: string): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: updatedName }), // Send only the updated name
    });
    if (!response.ok) {
      throw new Error("Failed to update todo");
    }
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};
