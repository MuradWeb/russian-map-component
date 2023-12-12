import {TooltipStyles} from './styles';

interface TTooltip {
	region: null | string,
	position: {
		top: number | string,
		left: number | string,
	}
}

export const Tooltip = ({ region, position }: TTooltip) => {
	return (
		<TooltipStyles
			style={{
				top: position.top,
				left: position.left
			}}
		>
			<div>{region}</div>
		</TooltipStyles>
	)
}
