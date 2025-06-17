
import { useState } from "react"
import { Menu, Search, Bell, User } from "lucide-react"
import { useTask } from "../../context/TaskContext"

const Header = ({ onToggleSidebar }) => {
  const { state, dispatch } = useTask()
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    dispatch({ type: "SET_SEARCH", payload: value })
  }

  // Only show search bar on tasks page
  const showSearch = state.currentView === "tasks"

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button onClick={onToggleSidebar} className="sidebar-toggle-btn">
            <Menu size={20} />
          </button>
          <h2 className="header-title">TaskFlow</h2>
        </div>

        {showSearch && (
          <div className="header-center">
            <div className="search-box">
              <Search className="search-icon" size={16} />
              <input
                type="text"
                placeholder="Search tasks..."
                className="search-input"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        )}

        <div className="header-right">
          <button className="header-btn">
            <Bell size={18} />
          </button>
          <div className="user-avatar">
            <User size={16} />
          </div>
        </div>
      </div>

      {showSearch && (
        <div className="mobile-search">
          <div className="search-box">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search tasks..."
              className="search-input"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
