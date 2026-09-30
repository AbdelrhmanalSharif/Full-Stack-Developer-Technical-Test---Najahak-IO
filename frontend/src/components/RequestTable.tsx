import "../styles/request-table.css";

type ClientRequest = {
  id: number;
  clientName: string;
  title: string;
  description: string | null;
  status: "New" | "In Progress" | "Done";
  createdAt: string;
};

type RequestTableProps = {
  requests: ClientRequest[];
  onUpdateStatus: (
    id: number,
    status: "New" | "In Progress" | "Done",
  ) => void;
};

function RequestTable({
  requests,
  onUpdateStatus,
}: RequestTableProps) {
  return (
  <div className="request-table-container">
    <table className="request-table">
      <thead>
        <tr>
          <th>Client</th>
          <th>Request</th>
          <th>Description</th>
          <th>Status</th>
          <th>Created</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
  {requests.length === 0 ? (
    <tr>
      <td colSpan={6} className="request-empty">
        No client requests found.
      </td>
    </tr>
  ) : (
    requests.map((request) => (
      <tr key={request.id}>
        <td>{request.clientName}</td>

        <td>
          <span className="request-title">
            {request.title}
          </span>
        </td>

        <td>
          <span className="request-description">
            {request.description || "—"}
          </span>
        </td>

        <td>
          <span
            className={`status-badge ${
              request.status === "New"
                ? "status-new"
                : request.status === "In Progress"
                  ? "status-progress"
                  : "status-done"
            }`}
          >
            {request.status}
          </span>
        </td>

        <td>
          {new Date(request.createdAt).toLocaleDateString()}
        </td>

        <td>
          {request.status === "New" && (
            <button
              className="request-action request-action-start"
              onClick={() =>
                onUpdateStatus(request.id, "In Progress")
              }
            >
              Start
            </button>
          )}

          {request.status === "In Progress" && (
            <button
              className="request-action request-action-done"
              onClick={() =>
                onUpdateStatus(request.id, "Done")
              }
            >
              Mark Done
            </button>
          )}

          {request.status === "Done" && (
            <span className="request-completed">
              Completed
            </span>
          )}
        </td>
      </tr>
    ))
  )}
</tbody>
    </table>
  </div>
);
}

export default RequestTable;
