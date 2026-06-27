import { Alert } from "@mui/material";

interface NotificationProps {
  notification: string | undefined;
}

const Notification = ({ notification }: NotificationProps) => {
  if (!notification) return <></>;
  return (
    <Alert variant="outlined" severity="error" sx={{ mb: "14px" }}>
      {notification}
    </Alert>
  );
};

export default Notification;
