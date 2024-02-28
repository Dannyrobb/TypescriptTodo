import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { v4 as uuidv4 } from "uuid";
import { pool } from "../config/db";

import { Todo } from "../types/todo";

const getAllTodos = async (request: FastifyRequest, reply: FastifyReply, fastify: FastifyInstance) => {
  try {
    const { rows } = await pool.query<Todo>("SELECT * FROM todos");
    reply.send(rows);
  } catch (error) {
    console.error("Error fetching todos:", error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
};

const createTodo = async (request: FastifyRequest, reply: FastifyReply, fastify: FastifyInstance) => {
  const { name } = request.body as Todo;

  try {
    const id: string = uuidv4();
    await pool.query("INSERT INTO todos (id, name) VALUES ($1, $2)", [id, name]);
    reply.code(201).send({ id, name });
  } catch (error) {
    console.error("Error creating todo:", error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
};

const deleteTodo = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply, fastify: FastifyInstance) => {
  const { id } = request.params;

  try {
    await pool.query("DELETE FROM todos WHERE id = $1", [id]);
    reply.send({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
};

const updateTodo = async (
  request: FastifyRequest<{ Params: { id: string }; Body: Todo }>,
  reply: FastifyReply,
  fastify: FastifyInstance
) => {
  const { id } = request.params;
  const { name } = request.body;

  try {
    await pool.query("UPDATE todos SET name = $1 WHERE id = $2", [name, id]);
    reply.send({ id, name });
  } catch (error) {
    console.error("Error updating todo:", error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
};

export { getAllTodos, createTodo, deleteTodo, updateTodo };
