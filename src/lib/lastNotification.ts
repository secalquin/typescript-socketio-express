import { Notification } from "../types";

export const getLastNotification = (listNotification: Notification[]) => {
  return listNotification[listNotification.length - 1];
};
