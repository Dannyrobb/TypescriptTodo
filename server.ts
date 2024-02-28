import fastify from "fastify";
import todosRoutes from "./routes/todosRoutes";
import cors from "@fastify/cors";
const app = fastify({ logger: true });

app.register(todosRoutes);
app.register(cors);
const PORT = 5000;
const start = async () => {
  try {
    await app.listen({ port: PORT });
  } catch (e) {
    app.log.error(e);
  }
};

start();
