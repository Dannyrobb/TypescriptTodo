const BASE_URL = "http://127.0.0.1:5000";

export const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const response = await fetch(`${BASE_URL}/todos`);
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

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

export const updateTodo = async (id: number, updatedName: string): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: updatedName }),
    });
    if (!response.ok) {
      throw new Error("Failed to update todo");
    }
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};
