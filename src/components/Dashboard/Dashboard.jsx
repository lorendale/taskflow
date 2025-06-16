"use client"

import { useState } from "react"
import { useTask } from "../../context/TaskContext"
import StatsCard from "./StatsCard"
import RecentTasks from "./RecentTasks"
import TaskChart from "./TaskChart"
import TaskForm from "../Tasks/TaskForm"
import Button from "../UI/Button"
import { CheckSquare, Clock, AlertCircle, TrendingUp, Plus } from "lucide-react"

const Dashboard = () => {
  const { state } = useTask()
  const [showTaskForm, setShowTaskForm] = useState(false)

  const completedTasks = state.tasks.filter((task) => task.status === "completed").length
  const pendingTasks = state.tasks.filter((task) => task.status === "pending").length
  const inProgressTasks = state.tasks.filter((task) => task.status === "in-progress").length
  const highPriorityTasks = state.tasks.filter((task) => task.priority === "high").length

  const stats = [
    {
      title: "Completed Tasks",
      value: completedTasks,
      icon: CheckSquare,
      color: "#059669",
      bgColor: "#d1fae5",
    },
    {
      title: "Pending Tasks",
      value: pendingTasks,
      icon: Clock,
      color: "#d97706",
      bgColor: "#fef3c7",
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      icon: TrendingUp,
      color: "#2563eb",
      bgColor: "#dbeafe",
    },
    {
      title: "High Priority",
      value: highPriorityTasks,
      icon: AlertCircle,
      color: "#dc2626",
      bgColor: "#fee2e2",
    },
  ]

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "2rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.875rem", fontWeight: "700", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
            Dashboard
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>Welcome back! Here's what's happening with your tasks today.</p>
        </div>
        <Button onClick={() => setShowTaskForm(true)}>
          <Plus size={16} />
          Add Task
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm-grid-cols-2 lg-grid-cols-4" style={{ marginBottom: "2rem", gap: "1rem" }}>
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg-grid-cols-2" style={{ gap: "2rem", marginBottom: "2rem" }}>
        <div>
          <TaskChart />
        </div>
        <div>
          <RecentTasks />
        </div>
      </div>

      <TaskForm isOpen={showTaskForm} onClose={() => setShowTaskForm(false)} />
    </div>
  )
}

export default Dashboard
