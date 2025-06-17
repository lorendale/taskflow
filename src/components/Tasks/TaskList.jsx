
import { useState } from "react"
import { useTask } from "../../context/TaskContext"
import { Plus } from "lucide-react"
import TaskCard from "./TaskCard"
import TaskForm from "./TaskForm"
import TaskFilters from "./TaskFilters"
import Button from "../UI/Button"

const TaskList = () => {
  const { state } = useTask()
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const filteredTasks = state.tasks.filter((task) => {
    // Search filter
    if (
      state.searchTerm &&
      !task.title.toLowerCase().includes(state.searchTerm.toLowerCase()) &&
      !task.description?.toLowerCase().includes(state.searchTerm.toLowerCase())
    ) {
      return false
    }

    // Status filter
    if (state.filters.status !== "all" && task.status !== state.filters.status) {
      return false
    }

    // Priority filter
    if (state.filters.priority !== "all" && task.priority !== state.filters.priority) {
      return false
    }

    // Project filter
    if (state.filters.project !== "all" && task.projectId !== state.filters.project) {
      return false
    }

    return true
  })

  const handleEditTask = (task) => {
    setEditingTask(task)
    setShowTaskForm(true)
  }

  const handleCloseForm = () => {
    setShowTaskForm(false)
    setEditingTask(null)
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.875rem", fontWeight: "700", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
            Tasks
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>Manage and track your tasks efficiently.</p>
        </div>
        <Button onClick={() => setShowTaskForm(true)}>
          <Plus size={16} />
          Add Task
        </Button>
      </div>

      <TaskFilters />

      <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={handleEditTask} />
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Plus size={32} />
          </div>
          <h3 className="empty-state-title">No tasks found</h3>
          <p className="empty-state-description">
            {state.tasks.length === 0
              ? "Get started by creating your first task."
              : "Try adjusting your filters to see more tasks."}
          </p>
          <Button onClick={() => setShowTaskForm(true)}>
            <Plus size={16} />
            Create Task
          </Button>
        </div>
      )}

      <TaskForm isOpen={showTaskForm} onClose={handleCloseForm} editingTask={editingTask} />
    </div>
  )
}

export default TaskList
