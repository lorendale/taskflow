"use client"

import { useState, useEffect } from "react"
import { useTask } from "../../context/TaskContext"
import Modal from "../UI/Modal"
import Button from "../UI/Button"

const TaskForm = ({ isOpen, onClose, editingTask }) => {
  const { state, dispatch } = useTask()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    projectId: state.projects[0]?.id || "",
    dueDate: "",
    assignee: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        status: editingTask.status || "pending",
        priority: editingTask.priority || "medium",
        projectId: editingTask.projectId || state.projects[0]?.id || "",
        dueDate: editingTask.dueDate || "",
        assignee: editingTask.assignee || "",
      })
    } else {
      setFormData({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
        projectId: state.projects[0]?.id || "",
        dueDate: "",
        assignee: "",
      })
    }
    setErrors({})
  }, [editingTask, state.projects, isOpen])

  const validateForm = () => {
    const newErrors = {}

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters long"
    } else if (formData.title.trim().length > 100) {
      newErrors.title = "Title must be less than 100 characters"
    }

    // Description validation
    if (formData.description && formData.description.length > 500) {
      newErrors.description = "Description must be less than 500 characters"
    }

    // Project validation
    if (!formData.projectId) {
      newErrors.projectId = "Please select a project"
    }

    // Due date validation - NOW REQUIRED
    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required"
    } else {
      const selectedDate = new Date(formData.dueDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (selectedDate < today) {
        newErrors.dueDate = "Due date cannot be in the past"
      }
    }

    // Assignee validation
    if (formData.assignee && formData.assignee.length > 50) {
      newErrors.assignee = "Assignee name must be less than 50 characters"
    }

    // Check for duplicate task titles (excluding current task when editing)
    const duplicateTask = state.tasks.find(
      (task) =>
        task.title.toLowerCase().trim() === formData.title.toLowerCase().trim() &&
        (!editingTask || task.id !== editingTask.id),
    )

    if (duplicateTask) {
      newErrors.title = "A task with this title already exists"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (editingTask) {
        dispatch({
          type: "UPDATE_TASK",
          payload: { ...editingTask, ...formData },
        })
      } else {
        dispatch({
          type: "ADD_TASK",
          payload: formData,
        })
      }

      onClose()
    } catch (error) {
      console.error("Error saving task:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setErrors({})
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={editingTask ? "Edit Task" : "Create New Task"} size="md">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={`input ${errors.title ? "error" : ""}`}
            placeholder="Enter task title"
            disabled={isSubmitting}
            maxLength={100}
          />
          {errors.title && (
            <div style={{ color: "var(--error)", fontSize: "var(--font-size-xs)", marginTop: "0.25rem" }}>
              {errors.title}
            </div>
          )}
          <div style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)", marginTop: "0.25rem" }}>
            {formData.title.length}/100 characters
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className={`textarea ${errors.description ? "error" : ""}`}
            placeholder="Enter task description"
            rows={3}
            disabled={isSubmitting}
            maxLength={500}
          />
          {errors.description && (
            <div style={{ color: "var(--error)", fontSize: "var(--font-size-xs)", marginTop: "0.25rem" }}>
              {errors.description}
            </div>
          )}
          <div style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)", marginTop: "0.25rem" }}>
            {formData.description.length}/500 characters
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="select"
              disabled={isSubmitting}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => handleChange("priority", e.target.value)}
              className="select"
              disabled={isSubmitting}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Project *</label>
          <select
            value={formData.projectId}
            onChange={(e) => handleChange("projectId", e.target.value)}
            className={`select ${errors.projectId ? "error" : ""}`}
            disabled={isSubmitting}
          >
            <option value="">Select a project</option>
            {state.projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
          {errors.projectId && (
            <div style={{ color: "var(--error)", fontSize: "var(--font-size-xs)", marginTop: "0.25rem" }}>
              {errors.projectId}
            </div>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="form-group">
            <label className="form-label">Due Date *</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
              className={`input ${errors.dueDate ? "error" : ""}`}
              disabled={isSubmitting}
              min={new Date().toISOString().split("T")[0]}
            />
            {errors.dueDate && (
              <div style={{ color: "var(--error)", fontSize: "var(--font-size-xs)", marginTop: "0.25rem" }}>
                {errors.dueDate}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Assignee</label>
            <input
              type="text"
              value={formData.assignee}
              onChange={(e) => handleChange("assignee", e.target.value)}
              className={`input ${errors.assignee ? "error" : ""}`}
              placeholder="Assign to..."
              disabled={isSubmitting}
              maxLength={50}
            />
            {errors.assignee && (
              <div style={{ color: "var(--error)", fontSize: "var(--font-size-xs)", marginTop: "0.25rem" }}>
                {errors.assignee}
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <Button type="button" variant="secondary" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="loading-spinner" style={{ marginRight: "0.5rem" }} />
                {editingTask ? "Updating..." : "Creating..."}
              </>
            ) : editingTask ? (
              "Update Task"
            ) : (
              "Create Task"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default TaskForm
