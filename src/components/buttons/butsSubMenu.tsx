interface BotonSubmenuProps {
  type: string;
  children: React.ReactNode;
  action?: () => void;
  disabled?: boolean;
}

const BotonSubmenu = ({ type, children, action, disabled }: BotonSubmenuProps) => {
    return (
        <button
            className={type}
            onClick={disabled ? undefined : () => action?.()}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
export default BotonSubmenu;
