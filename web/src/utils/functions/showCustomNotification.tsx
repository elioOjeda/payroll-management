import { notifications } from "@mantine/notifications";
import {
  FaCheck,
  FaExclamation,
  FaTriangleExclamation,
  FaXmark,
} from "react-icons/fa6";

type NotificationType = "success" | "error" | "warning" | "info";

type Params = {
  title: string;
  message?: string;
};

export const showCustomNotification = (
  type: NotificationType,
  { title, message }: Params
) => {
  const colorMap: Record<NotificationType, string> = {
    success: "green",
    error: "red",
    warning: "yellow",
    info: "blue",
  };

  const iconMap: Record<NotificationType, React.ReactNode> = {
    success: <FaCheck />,
    error: <FaXmark />,
    warning: <FaTriangleExclamation />,
    info: <FaExclamation />,
  };

  notifications.show({
    title,
    message,
    color: colorMap[type],
    icon: iconMap[type],
  });
};
