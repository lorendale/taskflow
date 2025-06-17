
const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) => {
  const baseClass = "btn"
  const variantClass = `btn-${variant}`
  const sizeClass = size !== "md" ? `btn-${size}` : ""

  const classes = [baseClass, variantClass, sizeClass, className].filter(Boolean).join(" ")

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  )
}

export default Button
