import { TaskProvider, useTask } from "./context/TaskContext"
import Layout from "./components/Layout/Layout"
import Dashboard from "./components/Dashboard/Dashboard"
import TaskList from "./components/Tasks/TaskList"
import CalendarView from "./components/Calendar/CalendarView"
import Analytics from "./components/Analytics/Analytics"
import "./styles/globals.css"

function AppContent() {
  const { state } = useTask()

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

  return <Layout>{renderCurrentView()}</Layout>
}

function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  )
}

export default App
