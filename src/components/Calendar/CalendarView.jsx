
import { useState } from "react"
import { useTask } from "../../context/TaskContext"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addMonths, subMonths } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"

const CalendarView = () => {
  const { state } = useTask()
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getTasksForDate = (date) => {
    return state.tasks.filter((task) => task.dueDate && isSameDay(new Date(task.dueDate), date))
  }

  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.875rem", fontWeight: "700", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
          Calendar
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>View your tasks organized by due date.</p>
      </div>

      <div className="card" style={{ padding: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button onClick={goToPreviousMonth} className="btn btn-ghost btn-sm" style={{ padding: "0.5rem" }}>
              <ChevronLeft size={16} />
            </button>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "var(--text-primary)",
                minWidth: "200px",
                textAlign: "center",
              }}
            >
              {format(currentDate, "MMMM yyyy")}
            </h2>
            <button onClick={goToNextMonth} className="btn btn-ghost btn-sm" style={{ padding: "0.5rem" }}>
              <ChevronRight size={16} />
            </button>
          </div>
          <button onClick={goToToday} className="btn btn-secondary btn-sm">
            Today
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "1px",
            backgroundColor: "var(--secondary-200)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
          }}
        >
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              style={{
                padding: "0.75rem",
                backgroundColor: "var(--secondary-100)",
                textAlign: "center",
                fontSize: "var(--font-size-sm)",
                fontWeight: "600",
                color: "var(--text-secondary)",
              }}
            >
              {day}
            </div>
          ))}

          {days.map((day) => {
            const tasksForDay = getTasksForDate(day)
            const isCurrentDay = isToday(day)

            return (
              <div
                key={day.toISOString()}
                style={{
                  minHeight: "100px",
                  padding: "0.5rem",
                  backgroundColor: "white",
                  border: isCurrentDay ? "2px solid var(--primary-500)" : "none",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontSize: "var(--font-size-sm)",
                    fontWeight: isCurrentDay ? "600" : "400",
                    color: isCurrentDay ? "var(--primary-600)" : "var(--text-primary)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {format(day, "d")}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  {tasksForDay.slice(0, 2).map((task) => {
                    const project = state.projects.find((p) => p.id === task.projectId)
                    return (
                      <div
                        key={task.id}
                        style={{
                          padding: "0.25rem 0.5rem",
                          backgroundColor: project?.color + "20" || "var(--primary-100)",
                          borderRadius: "var(--radius)",
                          fontSize: "var(--font-size-xs)",
                          color: project?.color || "var(--primary-700)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {task.title}
                      </div>
                    )
                  })}
                  {tasksForDay.length > 2 && (
                    <div
                      style={{
                        fontSize: "var(--font-size-xs)",
                        color: "var(--text-muted)",
                        textAlign: "center",
                      }}
                    >
                      +{tasksForDay.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CalendarView
