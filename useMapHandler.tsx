import {
	Dispatch,
	RefObject,
	useEffect,
	useRef,
	useState,
} from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { routeName } from 'helpers/utils';

const popupTrigger = (
	polygonRef: RefObject<any>,
	popupRef: RefObject<any>,
	isScroll?: boolean
) => {
	const polygonRect = polygonRef?.current?.getBoundingClientRect()
	const popup = popupRef?.current?.getBoundingClientRect()
	const top = polygonRect?.height / 2 + polygonRect?.y - popup?.height
	const left = polygonRect?.width / 2 + polygonRect?.x - popup?.width / 2

	if (popupRef.current) {
		popupRef.current.style.cssText = `
			${popup.x !== 0 && !isScroll ? 'transition: transform .3s;' : ''}
			transform: translate(${left}px,${top}px);
		`
	}
};

const fetcher = (url:string, select: string | number | null) => {
	if (!select) return null
	return axios.get(url)
}

export const useMapHandler = () => {
	const popupRef = useRef<any>(null);
	const polygonRef = useRef<any>(null);
	const [regionName, setRegionName] = useState<string | null>(null);
	const [select, setSelect] = useState<number | null>(null);
	const { isLoading, data } = useSWR(routeName('api.map.region', Number(select)), url=> fetcher(url, select));

	useEffect(() => {
		const handler = (e: any) => {
			if (polygonRef?.current?.contains(e.target)
				|| e.target.parentElement
				&& e.target.parentElement.closest('[data-type="path-group"]')
			) {
				return popupTrigger(polygonRef, popupRef)
			}
			if (popupRef?.current?.contains(e.target)) return
			setSelect(null)
			setRegionName(null)
		}

		const scrollHandler = () => popupTrigger(polygonRef, popupRef, true)
		document.addEventListener('click', handler, false);
		window.addEventListener('scroll', scrollHandler, false);
		return () => {
			document.removeEventListener('click', handler, false);
			window.removeEventListener('scroll', scrollHandler, false);
		};
	});

	const onClickPath = (id: number, region: string) => () => {
		setSelect(id)
		setRegionName(region)
	}

	return {
		polygonRef,
		popupRef,
		select,
		isLoading,
		regionName,
		// @ts-ignore
		mapData: data?.data?.data,
		onClickPath,
	};
};
