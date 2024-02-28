import { FastifyInstance } from "fastify";
import { Todo } from "../types/todo";
import { getAllTodos, createTodo, deleteTodo, updateTodo } from "../controllers/todosController";
async function todosRoutes(fastify: FastifyInstance, options: any) {
  try {
    await fastify.register(require("@fastify/postgres"), {
      connectionString: "postgres://ayvejrll:Vx2KVUvJj4ZZEcnME2qfWcPQsnORtVs9@surus.db.elephantsql.com/ayvejrll",
    });
    console.log("PostgreSQL plugin registered successfully");
  } catch (error) {
    console.error("Error registering PostgreSQL plugin:", error);
    process.exit(1);
  }

  fastify.get<{ Reply: Todo[] }>("/todos", async (request, reply) => {
    await getAllTodos(request, reply, fastify);
  });

  fastify.post<{ Body: Todo }>("/todos", async (request, reply) => {
    await createTodo(request, reply, fastify);
  });

  fastify.delete<{ Params: { id: string } }>("/todos/:id", async (request, reply) => {
    await deleteTodo(request, reply, fastify);
  });

  fastify.put<{ Params: { id: string }; Body: Todo }>("/todos/:id", async (request, reply) => {
    await updateTodo(request, reply, fastify);
  });
}

export default todosRoutes;
