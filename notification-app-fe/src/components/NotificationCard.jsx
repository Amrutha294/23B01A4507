import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
} from "@mui/material";

export function NotificationCard({ notification }) {
  return (
    <Card elevation={2}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="h6">
            {notification.Type}
          </Typography>

          <Chip
            label={notification.Type}
            color="primary"
            size="small"
          />
        </Stack>

        <Typography variant="body1">
          {notification.Message}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
        >
          {notification.Timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
}