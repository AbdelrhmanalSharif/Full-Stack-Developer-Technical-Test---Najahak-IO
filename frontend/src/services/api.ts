const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

export async function getRequests() {
  const response = await fetch(`${API_URL}/requests`);

  if (!response.ok) {
    throw new Error("Failed to fetch requests");
  }

  return response.json();
}

export async function updateRequestStatus(
  id: number,
  status: "New" | "In Progress" | "Done",
) {
  const response = await fetch(
    `${API_URL}/requests/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update request status");
  }

  return response.json();
}