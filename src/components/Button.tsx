export const Button = ({
    icon,
    text,
    onClick,
    disabled,
    tabIndex,
}: {
    icon?: React.ReactNode
    text: string
    onClick: () => void
    disabled?: boolean
    tabIndex?: number
}) => {
    return (
        <button
            className="bg-white disabled:text-gray-400 disabled:cursor-not-allowed hover:cursor-pointer hover:bg-gray-100 text-gray-800 font-semibold py-1 px-1 border border-gray-400 rounded shadow"
            onClick={onClick}
            disabled={disabled}
            tabIndex={tabIndex}
        >
            {icon}
            {icon === undefined ? '' : ' '}
            <small>{text}</small>
        </button>
    )
}

export default Button
