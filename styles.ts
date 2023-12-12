import styled, { css } from 'styled-components';
import { ButtonLink } from 'components/common/styled';

export const PopupStyles = styled.div`
	max-width: 250px;
  	min-width: 250px;
	position: fixed;
	z-index: 1000;
	top: 0;
	left: 0;
	
	
	@media (max-width: 600px) {
		position: absolute;
		top: -200%;
		left: 50%;
		transform: translate(-50%, 0) !important;
	}

	@media (max-width: 500px) {
		top: -40vw;
		width: 100%;
	}

  
	${ButtonLink} {
		width: 100%;
		display: block;

		@media (max-width: 600px) {
			font-size: 12px;
		}

		@media (max-width: 500px) {
			text-align: center;
		}
	}

	.popup-wrapper {
		position: relative;
		box-shadow: 0px 56px 128px #dfe5ef;
	      background: linear-gradient(
	              270deg,
	              rgba(20, 166, 213, 1) 0%,
	              rgba(33, 115, 186, 1) 100%
	      );
	      padding: 2px;
	      border-radius: 4px;
		@media (max-width: 600px) {
			box-shadow: none;
			&:after {
				display: none;
			}
		}


		&:after {
			content: '';
			position: absolute;
			bottom: -18px;
			left: 50%;
			transform: translateX(-50%);
			border-style: solid;
			border-width: 19px 10.5px 0 10.5px;
			border-color: #2173ba transparent transparent transparent;
		}
	}

	.popup-inner {
		position: relative;
		z-index: 10;
		color: #000;
		padding: 16px;
		background-color: #fff;
		border-radius: 4px;
	}

	.popup-fail,
	.popup-loader {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 200px;
		min-height: 180px;

		@media (max-width: 600px) {
			max-width: 214px;
		}
	}

	.popup-fail {
		min-height: 120px;
	}

	.popup-title {
		font-size: 16px;
		line-height: 120%;
		margin-bottom: 22px;
		font-weight: 700;
		text-align: center;

		@media (max-width: 600px) {
			font-size: 14px;
		}
	}

	.popup-values {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		line-height: 120%;
		&:not(:last-child) {
			margin-bottom: 12px;
		}
		strong {
			font-weight: 400;
			font-size: 32px;
			line-height: 120%;
			margin-right: 16px;

			@media (max-width: 600px) {
				font-size: 24px;
			}
		}
	}
`;

export const MapPath = styled.path<{ isActive?: boolean }>`
	fill: currentColor;
	cursor: pointer;
	stroke: #1d74b9;
	//stroke-miterlimit: 10;
	//stroke-linecap: round;
	//stroke-linejoin: round;

	color: #fff;

	&:hover {
		color: #78b6ec;
	}

	${(props) =>
		props.isActive &&
		css`
			color: #2173ba !important;
		`}
`;

export const TooltipStyles = styled.div`
  position: fixed;
  background: linear-gradient(
          270deg,
          rgba(20, 166, 213, 1) 0%,
          rgba(33, 115, 186, 1) 100%
  );
  padding: 14px 20px;
  border-radius: 4px;
  color: #fff;
  text-align: center;
`

export const MapPathGroup = styled.g`
  &:hover {
    ${MapPath} {
      color: #91c1ea;
    }
  }
`;

export const MapScheme = styled.svg`
	margin: -50px 0 -200px;
	.path-group {
		filter: drop-shadow(0px 56px 128px #dfe5ef);
	}
`;

export const MapStyles = styled.div`
	position: relative;
`;
