import { useState } from "react";

import {
  Alert,
  Badge,
  Box,
  CircularProgress,
  Divider,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";

import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilter } from "../components/NotificationFilter";
import { useNotifications } from "../hooks/useNotifications";

export function NotificationsPage() {
  const [filter, setFilter] = useState("All");

  const [page, setPage] = useState(1);

  const {
    notifications,
    totalPages,
    loading,
    error,
  } = useNotifications(page, filter);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(1);
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", p: 3 }}>
      <Stack direction="row" spacing={2} alignItems="center" mb={3}>
        <Badge badgeContent={unreadCount} color="primary">
          <NotificationsIcon />
        </Badge>

        <Typography variant="h5" fontWeight={700}>
          Notifications
        </Typography>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <NotificationFilter
        value={filter}
        onChange={handleFilterChange}
      />

      <Box mt={3}>
        {loading && (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}

        {!loading && error && (
          <Alert severity="error">
            Failed to load notifications: {error}
          </Alert>
        )}

        {!loading && !error && notifications.length === 0 && (
          <Alert severity="info">
            No notifications available.
          </Alert>
        )}

        {!loading && !error && notifications.length > 0 && (
          <Stack spacing={2}>
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
              />
            ))}
          </Stack>
        )}
      </Box>

      {!loading && totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            page={page}
            count={totalPages}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}