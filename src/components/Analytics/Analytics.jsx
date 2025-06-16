"use client"

import { useState } from "react"
import { useTask } from "../../context/TaskContext"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { PieChartIcon, BarChart3, TrendingUp, Plus } from "lucide-react"
import TaskForm from "../Tasks/TaskForm"
import Button from "../UI/Button"

const Analytics = () => {
  const { state } = useTask()
  const [showTaskForm, setShowTaskForm] = useState(false)

  const statusData = [
    { name: "Completed", value: state.tasks.filter((t) => t.status === "completed").length, color: "#059669" },
    { name: "In Progress", value: state.tasks.filter((t) => t.status === "in-progress").length, color: "#2563eb" },
    { name: "Pending", value: state.tasks.filter((t) => t.status === "pending").length, color: "#d97706" },
  ]

  const priorityData = [
    { name: "High", value: state.tasks.filter((t) => t.priority === "high").length, color: "#dc2626" },
    { name: "Medium", value: state.tasks.filter((t) => t.priority === "medium").length, color: "#d97706" },
    { name: "Low", value: state.tasks.filter((t) => t.priority === "low").length, color: "#059669" },
  ]

  const projectData = state.projects.map((project) => ({
    name: project.name,
    value: state.tasks.filter((t) => t.projectId === project.id).length,
    color: project.color,
  }))

  const hasStatusData = statusData.some((item) => item.value > 0)
  const hasPriorityData = priorityData.some((item) => item.value > 0)
  const hasProjectData = projectData.some((item) => item.value > 0)

  const EmptyChart = ({ icon: Icon, message }) => (
    <div
      style={{
        height: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text-muted)",
      }}
    >
      <Icon size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
      <p style={{ fontSize: "var(--font-size-sm)", textAlign: "center" }}>{message}</p>
    </div>
  )

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
            Analytics
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>Insights and statistics about your task management.</p>
        </div>
        <Button onClick={() => setShowTaskForm(true)}>
          <Plus size={16} />
          Add Task
        </Button>
      </div>

      <div className="grid grid-cols-1 lg-grid-cols-2" style={{ gap: "2rem" }}>
        <div className="card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem", color: "var(--text-primary)" }}>
            Task Status Distribution
          </h3>
          {!hasStatusData ? (
            <EmptyChart
              icon={PieChartIcon}
              message="No task data available yet. Create some tasks to see the status distribution."
            />
          ) : (
            <div style={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    dataKey="value"
                    label={({ name, value }) => (value > 0 ? `${name}: ${value}` : "")}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem", color: "var(--text-primary)" }}>
            Priority Distribution
          </h3>
          {!hasPriorityData ? (
            <EmptyChart
              icon={BarChart3}
              message="No priority data available yet. Create tasks with different priorities to see the distribution."
            />
          ) : (
            <div style={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priorityData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--secondary-200)" />
                  <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tick={{ fontSize: 12 }} />
                  <YAxis stroke="var(--text-secondary)" fontSize={12} tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid var(--secondary-200)",
                      borderRadius: "var(--radius-lg)",
                      boxShadow: "var(--shadow-md)",
                      fontSize: "var(--font-size-sm)",
                    }}
                  />
                  <Bar dataKey="value" fill="var(--primary-600)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="card" style={{ padding: "1.5rem", gridColumn: "1 / -1" }}>
          <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem", color: "var(--text-primary)" }}>
            Tasks by Project
          </h3>
          {!hasProjectData ? (
            <EmptyChart
              icon={TrendingUp}
              message="No project data available yet. Create tasks in different projects to see the distribution."
            />
          ) : (
            <div style={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--secondary-200)" />
                  <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tick={{ fontSize: 12 }} />
                  <YAxis stroke="var(--text-secondary)" fontSize={12} tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid var(--secondary-200)",
                      borderRadius: "var(--radius-lg)",
                      boxShadow: "var(--shadow-md)",
                      fontSize: "var(--font-size-sm)",
                    }}
                  />
                  <Bar dataKey="value" fill="var(--primary-600)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      <TaskForm isOpen={showTaskForm} onClose={() => setShowTaskForm(false)} />
    </div>
  )
}

export default Analytics
