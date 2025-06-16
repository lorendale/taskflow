"use client"

import { useState } from "react"
import { Edit2, Trash2, Calendar, Flag } from "lucide-react"
import { useTask } from "../../context/TaskContext"
import Badge from "../UI/Badge"
import Button from "../UI/Button"
import Modal from "../UI/Modal"
import TaskForm from "./TaskForm"
import { format } from "date-fns"

export default function TaskItem({ task }) {
  const { state, dispatch } = useTask()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const project = state.projects.find((p) => p.id === task.projectId)

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch({ type: "DELETE_TASK", payload: task.id })
    }
  }

  const handleStatusChange = (newStatus) => {
    dispatch({
      type: "UPDATE_TASK",
      payload: { ...task, status: newStatus, updatedAt: new Date().toISOString() },
    })
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "danger"
      case "medium":
        return "warning"
      case "low":
        return "success"
      default:
        return "default"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success"
      case "in-progress":
        return "warning"
      case "pending":
        return "danger"
      default:
        return "default"
    }
  }

  return (
    <>
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: project?.color || "#922C40" }}></div>
            <h3 className="font-semibold text-[#1E2640]">{task.title}</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setIsEditModalOpen(true)}>
              <Edit2 size={16} />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDelete} className="text-red-600 hover:text-red-700">
              <Trash2 size={16} />
            </Button>
          </div>
        </div>

        {task.description && <p className="text-gray-600 mb-4">{task.description}</p>}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Badge variant={getPriorityColor(task.priority)}>
              <Flag size={12} className="mr-1" />
              {task.priority}
            </Badge>
            <Badge variant={getStatusColor(task.status)}>{task.status.replace("-", " ")}</Badge>
            {task.dueDate && (
              <div className="flex items-center text-sm text-gray-500">
                <Calendar size={14} className="mr-1" />
                {format(new Date(task.dueDate), "MMM dd")}
              </div>
            )}
          </div>

          <select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#922C40]"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Task">
        <TaskForm editTask={task} onClose={() => setIsEditModalOpen(false)} />
      </Modal>
    </>
  )
}
