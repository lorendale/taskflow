"use client"

import { createContext, useContext, useReducer, useEffect } from "react"
import { loadFromStorage, saveToStorage, generateId } from "../utils/localStorage"

const TaskContext = createContext()

// Dummy data for initial state
const dummyProjects = [
  {
    id: "project-1",
    name: "Website Redesign",
    color: "#dc9750",
  },
  {
    id: "project-2",
    name: "Mobile App",
    color: "#059669",
  },
  {
    id: "project-3",
    name: "Marketing Campaign",
    color: "#2563eb",
  },
]

const dummyTasks = [
  {
    id: "task-1",
    title: "Design Homepage Layout",
    description: "Create wireframes and mockups for the new homepage design with modern UI elements",
    status: "completed",
    priority: "high",
    projectId: "project-1",
    dueDate: "2024-12-15",
    assignee: "Sarah Johnson",
    createdAt: "2024-12-01T10:00:00.000Z",
    updatedAt: "2024-12-14T14:30:00.000Z",
  },
  {
    id: "task-2",
    title: "Implement User Authentication",
    description: "Set up secure login and registration system with JWT tokens",
    status: "in-progress",
    priority: "high",
    projectId: "project-2",
    dueDate: "2025-07-15",
    assignee: "Mike Chen",
    createdAt: "2024-12-10T09:15:00.000Z",
    updatedAt: "2024-12-16T16:45:00.000Z",
  },
  {
    id: "task-3",
    title: "Create Social Media Content",
    description: "Develop engaging posts for Instagram, Twitter, and LinkedIn campaigns",
    status: "pending",
    priority: "medium",
    projectId: "project-3",
    dueDate: "2025-08-08",
    assignee: "Emma Davis",
    createdAt: "2024-12-12T11:30:00.000Z",
    updatedAt: "2024-12-12T11:30:00.000Z",
  },
  {
    id: "task-4",
    title: "Database Optimization",
    description: "Improve query performance and add proper indexing to the database",
    status: "in-progress",
    priority: "medium",
    projectId: "project-2",
    dueDate: "2025-07-20",
    assignee: "Alex Rodriguez",
    createdAt: "2024-12-08T08:45:00.000Z",
    updatedAt: "2024-12-16T10:20:00.000Z",
  },
  {
    id: "task-5",
    title: "Content Strategy Meeting",
    description: "Plan Q1 content calendar and discuss brand messaging strategy",
    status: "completed",
    priority: "low",
    projectId: "project-3",
    dueDate: "2024-12-12",
    assignee: "Lisa Park",
    createdAt: "2024-12-05T13:00:00.000Z",
    updatedAt: "2024-12-11T15:00:00.000Z",
  },
  {
    id: "task-6",
    title: "API Documentation",
    description: "Write comprehensive API documentation for the mobile app endpoints",
    status: "pending",
    priority: "low",
    projectId: "project-2",
    dueDate: "2025-09-01",
    assignee: "David Kim",
    createdAt: "2024-12-14T14:20:00.000Z",
    updatedAt: "2024-12-14T14:20:00.000Z",
  },
  {
    id: "task-7",
    title: "User Testing Session",
    description: "Conduct usability testing with 10 users for the new website design",
    status: "pending",
    priority: "high",
    projectId: "project-1",
    dueDate: "2025-06-30",
    assignee: "Rachel Green",
    createdAt: "2024-12-15T09:10:00.000Z",
    updatedAt: "2024-12-15T09:10:00.000Z",
  },
  {
    id: "task-8",
    title: "Performance Monitoring Setup",
    description: "Implement analytics and performance monitoring tools for the mobile app",
    status: "completed",
    priority: "medium",
    projectId: "project-2",
    dueDate: "2024-12-10",
    assignee: "Tom Wilson",
    createdAt: "2024-12-02T12:00:00.000Z",
    updatedAt: "2024-12-09T09:45:00.000Z",
  },
]

const initialState = {
  tasks: dummyTasks,
  projects: dummyProjects,
  currentView: "dashboard",
  filters: {
    status: "all",
    priority: "all",
    project: "all",
  },
  searchTerm: "",
}

function taskReducer(state, action) {
  switch (action.type) {
    case "LOAD_DATA":
      return {
        ...state,
        ...action.payload,
      }

    case "SET_VIEW":
      return {
        ...state,
        currentView: action.payload,
      }

    case "SET_SEARCH":
      return {
        ...state,
        searchTerm: action.payload,
      }

    case "ADD_TASK":
      const newTask = {
        ...action.payload,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      return {
        ...state,
        tasks: [...state.tasks, newTask],
      }

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...action.payload, updatedAt: new Date().toISOString() } : task,
        ),
      }

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      }

    case "ADD_PROJECT":
      const newProject = {
        ...action.payload,
        id: action.payload.id || generateId(),
      }
      return {
        ...state,
        projects: [...state.projects, newProject],
      }

    case "UPDATE_PROJECT":
      return {
        ...state,
        projects: state.projects.map((project) => (project.id === action.payload.id ? action.payload : project)),
      }

    case "DELETE_PROJECT":
      const projectToDelete = action.payload
      const remainingProjects = state.projects.filter((p) => p.id !== projectToDelete)
      const firstProject = remainingProjects[0]

      return {
        ...state,
        projects: remainingProjects,
        tasks: state.tasks.map((task) =>
          task.projectId === projectToDelete ? { ...task, projectId: firstProject.id } : task,
        ),
      }

    case "SET_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      }

    case "CLEAR_ALL_DATA":
      return {
        ...state,
        tasks: [],
        projects: [
          {
            id: "default",
            name: "Personal",
            color: "#dc9750",
          },
        ],
      }

    default:
      return state
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState)

  useEffect(() => {
    const savedData = loadFromStorage()
    if (savedData) {
      // If there's saved data, use it; otherwise keep the dummy data
      dispatch({ type: "LOAD_DATA", payload: savedData })
    }
  }, [])

  useEffect(() => {
    saveToStorage(state)
  }, [state])

  return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>
}

export function useTask() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider")
  }
  return context
}
