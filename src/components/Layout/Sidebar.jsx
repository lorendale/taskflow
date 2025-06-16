"use client"
import { X, LayoutDashboard, CheckSquare, Calendar, BarChart3 } from "lucide-react"
import { useTask } from "../../context/TaskContext"
import ProjectManager from "../Projects/ProjectManager"

const Sidebar = ({ isOpen, onClose }) => {
  const { state, dispatch } = useTask()

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ]

  const handleNavClick = (viewId) => {
    dispatch({ type: "SET_VIEW", payload: viewId })
    if (window.innerWidth < 1024) {
      onClose()
    }
  }

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-content">
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="sidebar-brand-icon">
              <CheckSquare size={20} />
            </div>
            <span className="sidebar-brand-text">TaskFlow</span>
          </div>
          <button onClick={onClose} className="sidebar-close">
            <X size={20} />
          </button>
        </div>

        <nav>
          <ul className="sidebar-nav">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id} className="sidebar-nav-item">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`sidebar-nav-link ${state.currentView === item.id ? "active" : ""}`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <ProjectManager />
      </div>
    </aside>
  )
}

export default Sidebar
