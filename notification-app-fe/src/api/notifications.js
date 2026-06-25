const BASE_URL = "http://4.224.186.213/evaluation-service";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbXJ1dGhhLjI5LjIwMjBAZ21haWwuY29tIiwiZXhwIjoxNzgyMzgzMjQwLCJpYXQiOjE3ODIzODIzNDAsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJkOGQ2MDc0MS00Y2FhLTRiNjUtYTQwYi1hZTQ1ODBkM2YzZTUiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJheWluYXZpbGxpIGFtcnV0aGEgc2FpIiwic3ViIjoiZmUwMWE0YjgtN2U1Yy00ZTU1LWFmNTQtYzY2ODVjNzQyODE5In0sImVtYWlsIjoiYW1ydXRoYS4yOS4yMDIwQGdtYWlsLmNvbSIsIm5hbWUiOiJheWluYXZpbGxpIGFtcnV0aGEgc2FpIiwicm9sbE5vIjoiMjNiMDFhNDUwNyIsImFjY2Vzc0NvZGUiOiJhaFhqdnAiLCJjbGllbnRJRCI6ImZlMDFhNGI4LTdlNWMtNGU1NS1hZjU0LWM2Njg1Yzc0MjgxOSIsImNsaWVudFNlY3JldCI6IlZTRkZQUkZhUERXQmVYbnEifQ.DP3BRI6WOohROEQEAj1WFopNkYpqII3UEe8y4W40Gtk";

export async function fetchNotifications(page = 1, filter = "All") {
  try {
    const response = await fetch(
      `${BASE_URL}/notifications`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    let notifications = data.notifications || [];

    if (filter !== "All") {
      notifications = notifications.filter(
        (item) => item.Type === filter
      );
    }

    const pageSize = 5;
    const start = (page - 1) * pageSize;

    return {
      notifications: notifications.slice(start, start + pageSize),
      total: notifications.length,
      totalPages: Math.ceil(notifications.length / pageSize),
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}