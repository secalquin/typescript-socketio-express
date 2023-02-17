import { v4 } from "uuid";
import { notifications } from "../data";
import { Notification } from "../types";

export const newNotification = (
  newNotification: Notification
): Notification[] => {
  const noti: Notification = { ...newNotification, id: v4() };
  notifications.push(noti);

  return notifications;
};
