const BotonSubmenu = ({ type, children, action, disabled }) => {
    return (
        <button
            className={type}
            onClick={disabled ? undefined : () => action()}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
export default BotonSubmenu;