import Server from "./src/config/server";
import { environment } from "./src/config/environment";

const { server_port } = environment;

const server = new Server({ server_port });

server.start(() => {
  console.log(`[🕯]: Server running on port ${server_port}`);
});
