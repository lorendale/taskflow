
import { useTask } from "../../context/TaskContext"
import { Edit2, Trash2, Calendar, User } from "lucide-react"
import { format } from "date-fns"

const TaskCard = ({ task, onEdit }) => {
  const { state, dispatch } = useTask()

  const project = state.projects.find((p) => p.id === task.projectId)

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch({ type: "DELETE_TASK", payload: task.id })
    }
  }

  const handleStatusChange = (newStatus) => {
    dispatch({
      type: "UPDATE_TASK",
      payload: { ...task, status: newStatus },
    })
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: "badge-warning", label: "Pending" },
      "in-progress": { class: "badge-info", label: "In Progress" },
      completed: { class: "badge-success", label: "Completed" },
    }

    const config = statusConfig[status] || statusConfig.pending
    return <span className={`badge ${config.class}`}>{config.label}</span>
  }

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      low: { class: "badge-success", label: "Low" },
      medium: { class: "badge-warning", label: "Medium" },
      high: { class: "badge-error", label: "High" },
    }

    const config = priorityConfig[priority] || priorityConfig.medium
    return <span className={`badge ${config.class}`}>{config.label}</span>
  }

  return (
    <div className="task-card">
      <div className={`task-priority-indicator task-priority-${task.priority}`}></div>

      <div className="task-card-header">
        <h3 className="task-card-title">{task.title}</h3>
        <div className="task-card-actions">
          <button onClick={() => onEdit(task)} className="btn btn-ghost btn-sm" style={{ padding: "0.25rem" }}>
            <Edit2 size={14} />
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-ghost btn-sm"
            style={{ padding: "0.25rem", color: "var(--error)" }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {task.description && <p className="task-card-description">{task.description}</p>}

      <div className="task-card-footer">
        <div className="task-card-meta">
          {getStatusBadge(task.status)}
          {getPriorityBadge(task.priority)}
          {project && (
            <span
              className="badge badge-secondary"
              style={{ backgroundColor: project.color + "20", color: project.color }}
            >
              {project.name}
            </span>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "var(--font-size-xs)",
            color: "var(--text-muted)",
          }}
        >
          {task.dueDate && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <Calendar size={12} />
              {format(new Date(task.dueDate), "MMM dd")}
            </div>
          )}
          {task.assignee && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <User size={12} />
              {task.assignee}
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="select"
          style={{
            fontSize: "var(--font-size-xs)",
            padding: "0.25rem 0.5rem",
            width: "auto",
            minWidth: "120px",
            maxWidth: "150px",
          }}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  )
}

export default TaskCard
