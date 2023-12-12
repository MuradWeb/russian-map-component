import {PopupStyles} from './styles';
import {RefObject} from 'react';
import {Button} from 'components';
import {Spinner} from 'components/common/Spinner';
import {areaLabel, eventLabel} from 'helpers/utils';
interface TPopup {
	isLoading: boolean,
	inref: RefObject<any>
	select: number | null
    mapData: any
	regionName: string | null
}

const PopupInner = ({ regionName, mapData, select }: any)=> {
	return (
		<>
			<div className="popup-title">{regionName}</div>
			{!mapData ? <div className="popup-fail">Нет мероприятий</div>:
				<>
					<div className="popup-values">
						<strong>{mapData.sports_ground_count}</strong>
						{areaLabel(mapData.sports_ground_count)}
					</div>
					<div className="popup-values">
						<strong>{mapData.trainings_count}</strong>
						{eventLabel(mapData.trainings_count)}
					</div>

					{!mapData.is_disabled && (
						<Button
							as={'a'}
							text="Смотреть площадки"
							href={`/area?region_id=${select}`}
							variant="blue"
						/>
					)}
				</>
			}
		</>
	)
}

export const MapPopup = ({
	inref,
	isLoading,
	select,
    mapData,
	regionName,
}: TPopup) => {
	return (
		<PopupStyles ref={inref}>
			<div className="popup-wrapper">
				<div className="popup-inner">
					{isLoading ? <div className="popup-loader"><Spinner /></div>:
						<PopupInner mapData={mapData} regionName={regionName} select={select} />
					}
				</div>
			</div>
		</PopupStyles>
	)
}
