import dotenv from "dotenv";

dotenv.config();

export const environment = {
  server_port: process.env.SERVER_PORT || 3000,
};
