
import { useTask } from "../../context/TaskContext"

const TaskFilters = () => {
  const { state, dispatch } = useTask()

  const handleFilterChange = (filterType, value) => {
    dispatch({
      type: "SET_FILTERS",
      payload: { [filterType]: value },
    })
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        marginBottom: "2rem",
        padding: "1rem",
        backgroundColor: "white",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-sm)",
        border: "1px solid var(--secondary-200)",
        flexWrap: "wrap",
      }}
    >
      <div style={{ minWidth: "120px" }}>
        <label
          style={{
            display: "block",
            fontSize: "var(--font-size-xs)",
            fontWeight: "500",
            color: "var(--text-secondary)",
            marginBottom: "0.25rem",
          }}
        >
          Status
        </label>
        <select
          value={state.filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          className="select"
          style={{ fontSize: "var(--font-size-sm)" }}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div style={{ minWidth: "120px" }}>
        <label
          style={{
            display: "block",
            fontSize: "var(--font-size-xs)",
            fontWeight: "500",
            color: "var(--text-secondary)",
            marginBottom: "0.25rem",
          }}
        >
          Priority
        </label>
        <select
          value={state.filters.priority}
          onChange={(e) => handleFilterChange("priority", e.target.value)}
          className="select"
          style={{ fontSize: "var(--font-size-sm)" }}
        >
          <option value="all">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div style={{ minWidth: "120px" }}>
        <label
          style={{
            display: "block",
            fontSize: "var(--font-size-xs)",
            fontWeight: "500",
            color: "var(--text-secondary)",
            marginBottom: "0.25rem",
          }}
        >
          Project
        </label>
        <select
          value={state.filters.project}
          onChange={(e) => handleFilterChange("project", e.target.value)}
          className="select"
          style={{ fontSize: "var(--font-size-sm)" }}
        >
          <option value="all">All Projects</option>
          {state.projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default TaskFilters
