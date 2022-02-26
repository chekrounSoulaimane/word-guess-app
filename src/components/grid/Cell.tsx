import { CharStatus } from "../../lib/statuses"
import classnames from "classnames"
import { REVEAL_TIME_MS } from "../../constants/settings"
import { getStoredIsHighContrastMode } from "../../lib/localStorage"

type Props = {
	value?: string
	status?: CharStatus
	isRevealing?: boolean
	isCompleted?: boolean
	position?: number
}

export const Cell = ({ value, status, isRevealing, isCompleted, position = 0 }: Props) => {
	const isFilled = value && !isCompleted
	const shouldReveal = isRevealing && isCompleted
	const animationDelay = `${position * REVEAL_TIME_MS}ms`
	const isHighContrast = getStoredIsHighContrastMode()

	const classes = classnames(
		"w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-bold rounded dark:text-white cursor-pointer",
		{
			"bg-white dark:bg-black border-lightGray dark:border-darkGray": !status,
			"border-black dark:border-white": value && !status,
			"absent shadowed bg-lightGray dark:bg-darkGray text-white border-lightGray dark:border-darkGray":
				status === "absent",
			"correct shadowed bg-orange text-white border-orange": status === "correct" && isHighContrast,
			"present shadowed bg-blue text-white border-blue": status === "present" && isHighContrast,
			"correct shadowed bg-darkendGreen text-white border-darkendGreen":
				status === "correct" && !isHighContrast,
			"present shadowed bg-darkendYellow text-white border-darkendYellow":
				status === "present" && !isHighContrast,
			"cell-fill-animation": isFilled,
			"cell-reveal": shouldReveal,
		}
	)

	return (
		<div className={classes} style={{ animationDelay }}>
			<div className="letter-container" style={{ animationDelay }}>
				{value}
			</div>
		</div>
	)
}
