import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useTask } from "../../context/TaskContext"
import { BarChart3 } from "lucide-react"

const TaskChart = () => {
  const { state } = useTask()

  const chartData = [
    {
      name: "Completed",
      count: state.tasks.filter((task) => task.status === "completed").length,
      color: "#059669",
    },
    {
      name: "In Progress",
      count: state.tasks.filter((task) => task.status === "in-progress").length,
      color: "#2563eb",
    },
    {
      name: "Pending",
      count: state.tasks.filter((task) => task.status === "pending").length,
      color: "#d97706",
    },
  ]

  const hasData = chartData.some((item) => item.count > 0)

  return (
    <div className="card" style={{ padding: "1.5rem", height: "400px", display: "flex", flexDirection: "column" }}>
      <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem", color: "var(--text-primary)" }}>
        Task Overview
      </h3>

      {!hasData ? (
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
          <BarChart3 size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
          <p style={{ fontSize: "var(--font-size-sm)", textAlign: "center" }}>
            No tasks available yet.
            <br />
            Create your first task to see the overview.
          </p>
        </div>
      ) : (
        <div style={{ flex: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
              <Bar dataKey="count" fill="var(--primary-600)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

export default TaskChart
