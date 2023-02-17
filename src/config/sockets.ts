import { Server } from "socket.io";
import { Notification } from "../types";
import { notifications } from "../data";
import { newNotification } from "../lib/newNotification";
import { getLastNotification } from "../lib/lastNotification";

export default (io: Server) => {
  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    // Send all messages to the client
    socket.emit("server:loadnotes", notifications);
    socket.emit("server:lastnote", getLastNotification(notifications));

    // Methods
    socket.on("client:newnote", (newNotif: Notification) => {
      const newList = newNotification(newNotif);

      io.emit("server:loadnotes", newList);
      io.emit("server:lastnote", getLastNotification(newList));
    });

    socket.on("disconnect", () => {
      console.log(socket.id, "disconnected");
    });
  });
};
