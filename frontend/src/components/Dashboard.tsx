import { useEffect, useState } from "react";
import RequestTable from "./RequestTable";
import "../styles/dashboard.css";
import {
  getRequests,
  updateRequestStatus,
} from "../services/api";

type ClientRequest = {
  id: number;
  clientName: string;
  title: string;
  description: string | null;
  status: "New" | "In Progress" | "Done";
  createdAt: string;
};
type DashboardProps = {
  onLogout: () => void;
};

function Dashboard({ onLogout }: DashboardProps) {
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 async function fetchRequests() {
  try {
    setError("");

    const data = await getRequests();
    setRequests(data);
  } catch (error) {
    console.error("Error fetching requests:", error);
    setError("Unable to load client requests.");
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    fetchRequests();
  }, []);
async function updateStatus(
  id: number,
  status: "New" | "In Progress" | "Done",
) {
  try {
    setError("");

    await updateRequestStatus(id, status);
    await fetchRequests();
  } catch (error) {
    console.error("Error updating status:", error);
    setError("Unable to update request status.");
  }
}
  if (loading) {
  return (
    <main className="dashboard">
      <div className="loading-state">
        Loading requests...
      </div>
    </main>
  );
}
return (
  <main className="dashboard">
    <div className="dashboard-header">
  <div>
    <h1 className="dashboard-title">Client Requests</h1>
    <p className="dashboard-subtitle">
      Manage and track client requests
    </p>
  </div>

  <div className="dashboard-header-actions">
    <div className="request-count">
      <span className="request-count-label">Total Requests</span>
      <span className="request-count-number">{requests.length}</span>
    </div>

    <button
      className="logout-button"
      onClick={onLogout}
    >
      Logout
    </button>
  </div>
</div>
{error && (
  <div className="error-message">
    {error}
  </div>
)}
    <RequestTable
      requests={requests}
      onUpdateStatus={updateStatus}
    />
  </main>
);
}

export default Dashboard;
