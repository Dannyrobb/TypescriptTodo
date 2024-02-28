import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "../types/todo";
import prisma from "../utils/prisma";

const getAllTodos = async (request: FastifyRequest, reply: FastifyReply, fastify: FastifyInstance) => {
  try {
    const todos = await prisma.todos.findMany();
    reply.send(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
};

const createTodo = async (request: FastifyRequest, reply: FastifyReply, fastify: FastifyInstance) => {
  const { name } = request.body as Todo;

  try {
    const id: string = uuidv4();
    const todo = await prisma.todos.create({
      data: {
        id,
        name,
      },
    });
    reply.code(201).send({ id: todo.id, name: todo.name });
  } catch (error) {
    console.error("Error creating todo:", error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
};

const deleteTodo = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply, fastify: FastifyInstance) => {
  const { id } = request.params;

  try {
    await prisma.todos.delete({
      where: {
        id,
      },
    });
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
    await prisma.todos.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    reply.send({ id, name });
  } catch (error) {
    console.error("Error updating todo:", error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
};
export { getAllTodos, createTodo, deleteTodo, updateTodo };
