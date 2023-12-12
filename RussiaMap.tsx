import {MapPath, MapPathGroup, MapScheme, MapStyles} from './styles';
import data from './data.json';
import {RefObject, SyntheticEvent, useEffect, useState} from 'react';
import {MapPopup} from './MapPopup';
import {useMapHandler} from './useMapHandler';
import {Tooltip} from 'components/RussiaMap/Tooltip';

interface TPath {
	polygonRef: RefObject<any> | null
	id: number,
	path: string,
	setSelect?: (e: SyntheticEvent)=> void,
	select: number | null
	isMain?: boolean,
	regionName: string
}

const Path = ({id, regionName, path, setSelect, select, polygonRef, isMain=true }: TPath) => {
	return (
		<MapPath
			ref={select === id && isMain ? polygonRef : null}
			data-code={id}
			data-region={regionName}
			d={path}
			onClick={setSelect}
			isActive={select === id}
		/>
	)
}

const tooltipInit = {
	position: { top: '0px', left: '0px'},
	region: null
}

export const RussiaMap = () => {
	const { polygonRef, select, popupRef, regionName, isLoading, onClickPath, mapData } = useMapHandler()
	const [tooltipParams, setTooltipParams] = useState(tooltipInit)

	useEffect(()=> {
		if (select) return setTooltipParams(tooltipInit)
	}, [select])

	const onMouseOver = (e: any)=> {
		if (e.target.tagName === 'path') {

			setTooltipParams(state=> ({
				position: {
					top: `${(e.clientY+60)}px`,
					left: `${e.clientX-80}px`,
				},
				region: e.target.dataset.region
			}))
		} else {
			setTooltipParams(tooltipInit)
		}
	}

	const onMouseMove = (e: any)=> {
		if (e.target.tagName === 'path') {
			if (+e.target.dataset.code === select) return setTooltipParams(tooltipInit)
			setTooltipParams(state=> ({
				...state,
				position: {
					top: `${(e.clientY+60)}px`,
					left: `${e.clientX-80}px`,
				}
			}))
		}
	}

	const onMouseLeave = ()=> setTooltipParams(tooltipInit)


	return (
		<MapStyles>
			{select &&
				<MapPopup
                    mapData={mapData}
					inref={popupRef}
					isLoading={isLoading}
					select={select}
                    regionName={regionName}
				/>
			}
			{tooltipParams.region && <Tooltip region={tooltipParams.region} position={tooltipParams.position} />}
			<MapScheme
				onMouseOver={onMouseOver}
				onMouseMove={onMouseMove}
				onMouseOut={onMouseLeave}
				viewBox="0 0 1954 1155"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g className="path-group">
					{data && data.map((scheme, i) => {
						if (scheme?.group) {
							return (
								<MapPathGroup key={i+'-'+scheme.id} onClick={onClickPath(scheme.id, scheme.name)} data-type="path-group">
									{scheme.group.map((g, i)=>(
										<Path
											key={i+'-'+scheme.id}
											path={g}
											id={scheme.id}
											select={select}
											polygonRef={i === 0 ? polygonRef : null}
											isMain={i===0}
											regionName={scheme.name}
										/>))}
								</MapPathGroup>
							)
						}
						return <Path
									key={i+'-'+scheme.id}
									path={scheme.path}
									id={scheme.id}
									select={select}
									setSelect={onClickPath(scheme.id, scheme.name)}
									polygonRef={polygonRef}
									regionName={scheme.name}
								/>
					})}
				</g>
			</MapScheme>
		</MapStyles>
	)
}
