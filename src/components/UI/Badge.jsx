const Badge = ({ children, variant = "secondary", className = "" }) => {
  const variantClasses = {
    primary: "badge-primary",
    secondary: "badge-secondary",
    success: "badge-success",
    warning: "badge-warning",
    error: "badge-error",
  }

  return <span className={`badge ${variantClasses[variant]} ${className}`}>{children}</span>
}

export default Badge
