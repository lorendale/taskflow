"use client"

import { useState } from "react"
import { useTask } from "../../context/TaskContext"
import Header from "./Header"
import Sidebar from "./Sidebar"
import Dashboard from "../Dashboard/Dashboard"
import TaskList from "../Tasks/TaskList"
import CalendarView from "../Calendar/CalendarView"
import Analytics from "../Analytics/Analytics"

const Layout = () => {
  const { state } = useTask()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const renderCurrentView = () => {
    switch (state.currentView) {
      case "dashboard":
        return <Dashboard />
      case "tasks":
        return <TaskList />
      case "calendar":
        return <CalendarView />
      case "analytics":
        return <Analytics />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-layout">
        <Header onToggleSidebar={toggleSidebar} />
        <main className="main-content">
          <div className="content-wrapper">{renderCurrentView()}</div>
        </main>
      </div>
    </div>
  )
}

export default Layout
