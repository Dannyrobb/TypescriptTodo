import fastify from "fastify";
import todosRoutes from "./routes/todosRoutes";
import cors from "@fastify/cors";
import dotenv from "dotenv";

const app = fastify({ logger: true });
dotenv.config();
app.register(todosRoutes);
app.register(cors);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;

const start = async () => {
  try {
    await app.listen({ port: PORT });
  } catch (e) {
    app.log.error(e);
  }
};

start();
