import { useTask } from "../../context/TaskContext"
import { format } from "date-fns"
import { Clock, AlertCircle, CheckCircle, Plus } from "lucide-react"

const RecentTasks = () => {
  const { state } = useTask()

  const recentTasks = state.tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={16} style={{ color: "var(--success)" }} />
      case "in-progress":
        return <Clock size={16} style={{ color: "var(--info)" }} />
      default:
        return <AlertCircle size={16} style={{ color: "var(--warning)" }} />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "var(--error)"
      case "medium":
        return "var(--warning)"
      default:
        return "var(--success)"
    }
  }

  return (
    <div className="card" style={{ padding: "1.5rem", height: "400px", display: "flex", flexDirection: "column" }}>
      <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem", color: "var(--text-primary)" }}>
        Recent Tasks
      </h3>

      {recentTasks.length === 0 ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-muted)",
          }}
        >
          <Plus size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
          <p style={{ fontSize: "var(--font-size-sm)", textAlign: "center" }}>
            No tasks created yet.
            <br />
            Create your first task to see recent activity.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1, overflowY: "auto" }}>
          {recentTasks.map((task) => {
            const project = state.projects.find((p) => p.id === task.projectId)
            return (
              <div
                key={task.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--secondary-200)",
                  transition: "var(--transition)",
                }}
              >
                <div style={{ flexShrink: 0 }}>{getStatusIcon(task.status)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4
                    style={{
                      fontSize: "var(--font-size-sm)",
                      fontWeight: "500",
                      color: "var(--text-primary)",
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {task.title}
                  </h4>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
                    <span className="badge badge-secondary" style={{ fontSize: "0.625rem" }}>
                      {project?.name || "Unknown"}
                    </span>
                    <div
                      style={{
                        width: "0.5rem",
                        height: "0.5rem",
                        borderRadius: "50%",
                        backgroundColor: getPriorityColor(task.priority),
                      }}
                    />
                  </div>
                </div>
                <div style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)" }}>
                  {format(new Date(task.createdAt), "MMM dd")}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default RecentTasks
