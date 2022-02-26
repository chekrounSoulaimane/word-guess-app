import { ReactNode } from "react"
import classnames from "classnames"
import { CharStatus } from "../../lib/statuses"
import { MAX_WORD_LENGTH, REVEAL_TIME_MS } from "../../constants/settings"
import { getStoredIsHighContrastMode } from "../../lib/localStorage"

type Props = {
	children?: ReactNode
	value: string
	width?: number
	status?: CharStatus
	onClick: (value: string) => void
	isRevealing?: boolean
}

export const Key = ({ children, status, width = 40, value, onClick, isRevealing }: Props) => {
	const keyDelayMs = REVEAL_TIME_MS * MAX_WORD_LENGTH
	const isHighContrast = getStoredIsHighContrastMode()

	const classes = classnames(
		"flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none dark:text-white",
		{
			"transition ease-in-out": isRevealing,
			"bg-lightGray dark:bg-gray hover:bg-[#b6b6b6] active:bg-[#b6b6b6]": !status,
			"bg-gray dark:bg-darkGray text-white": status === "absent",
			"bg-darkendOrange hover:bg-orange active:bg-orange text-white":
				status === "correct" && isHighContrast,
			"bg-darkendBlue hover:bg-blue active:bg-blue text-white":
				status === "present" && isHighContrast,
			"bg-darkendGreen hover:bg-green active:bg-green text-white":
				status === "correct" && !isHighContrast,
			"bg-darkendYellow hover:bg-yellow active:bg-yellow text-white":
				status === "present" && !isHighContrast,
		}
	)

	const styles = {
		transitionDelay: isRevealing ? `${keyDelayMs}ms` : "unset",
		width: `${width}px`,
		height: "58px",
	}

	const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		onClick(value)
		event.currentTarget.blur()
	}

	return (
		<button style={styles} className={classes} onClick={handleClick}>
			{children || value}
		</button>
	)
}
