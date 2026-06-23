interface NotificationProps {
  notification: string | null;
}

const notificationStyle = {
  color: "red",
};

const Notification = ({ notification }: NotificationProps) => {
  if (!notification) return null;
  return <p style={notificationStyle}>{notification}</p>;
};

export default Notification;
