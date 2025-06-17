
import { useState } from "react"
import { Plus, Edit2, Trash2, RefreshCw } from "lucide-react"
import { useTask } from "../../context/TaskContext"
import { generateId } from "../../utils/localStorage"
import Modal from "../UI/Modal"
import Button from "../UI/Button"

const ProjectManager = () => {
  const { state, dispatch } = useTask()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    color: "#dc9750",
  })

  const colors = [
    "#dc9750", // Primary orange
    "#059669", // Green
    "#dc2626", // Red
    "#2563eb", // Blue
    "#7c3aed", // Purple
    "#d97706", // Amber
    "#0891b2", // Cyan
    "#be185d", // Pink
    "#374151", // Gray
    "#1e293b", // Dark blue
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    const projectData = {
      ...formData,
      id: editingProject?.id || generateId(),
    }

    if (editingProject) {
      dispatch({ type: "UPDATE_PROJECT", payload: projectData })
    } else {
      dispatch({ type: "ADD_PROJECT", payload: projectData })
    }

    handleCloseModal()
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setFormData({
      name: project.name,
      color: project.color,
    })
    setIsModalOpen(true)
  }

  const handleDelete = (projectId) => {
    if (state.projects.length <= 1) {
      alert("You must have at least one project")
      return
    }

    if (window.confirm("Are you sure you want to delete this project? All tasks will be moved to the first project.")) {
      dispatch({ type: "DELETE_PROJECT", payload: projectId })
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingProject(null)
    setFormData({ name: "", color: "#dc9750" })
  }

  const handleAddNew = () => {
    setEditingProject(null)
    setFormData({ name: "", color: "#dc9750" })
    setIsModalOpen(true)
  }

  const handleResetData = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all data? This will remove all tasks and projects and cannot be undone.",
      )
    ) {
      dispatch({ type: "CLEAR_ALL_DATA" })
    }
  }

  return (
    <div className="sidebar-section">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <h3 className="sidebar-section-title">Projects</h3>
        <div style={{ display: "flex", gap: "0.25rem" }}>
          <button
            onClick={handleResetData}
            className="add-project-btn"
            style={{ width: "auto", padding: "0.25rem" }}
            title="Clear all data"
          >
            <RefreshCw size={14} />
          </button>
          <button onClick={handleAddNew} className="add-project-btn" style={{ width: "auto", padding: "0.25rem" }}>
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="project-list">
        {state.projects.map((project) => {
          const taskCount = state.tasks.filter((task) => task.projectId === project.id).length

          return (
            <div key={project.id} className="project-item">
              <div className="project-info">
                <div className="project-color" style={{ backgroundColor: project.color }}></div>
                <div className="project-details">
                  <p className="project-name">{project.name}</p>
                  <p className="project-task-count">{taskCount} tasks</p>
                </div>
              </div>

              <div className="project-actions">
                <button onClick={() => handleEdit(project)} className="project-action-btn" title="Edit project">
                  <Edit2 size={12} />
                </button>
                {state.projects.length > 1 && (
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="project-action-btn delete"
                    title="Delete project"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingProject ? "Edit Project" : "Add Project"}
        size="sm"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Project Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="input"
              placeholder="Enter project name"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Color</label>
            <div className="color-picker">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, color }))}
                  className={`color-option ${formData.color === color ? "selected" : ""}`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className="modal-footer">
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit">{editingProject ? "Update" : "Add"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default ProjectManager
