import styles from './index.module.css';

import {cloneElement, createRef, ReactNode, useEffect, useState} from 'react';

const useOutsideAlerter = (ref: any, action: any) => {
	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (ref.current && !ref.current.contains(event.target)) {
				action();
			}
		};
		
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [action, ref]);
};


interface IOption {
	children: ReactNode;
	value: string;
	isActive?: boolean;
	callback?: any;
}

export const Option = ({children, value, isActive, callback}: IOption) => (
	<span className={`${styles.Option} ${isActive ? styles.Option_active : ''}`} onClick={callback.bind(this, value)}>
		{children}
	</span>
);

interface IReactCustomSelect {
	children: ReactNode;
	value: any;
	callback: (value: any) => void;
	
	[prop: string]: any;
}

export const ReactCustomSelect = ({children, value, callback, ...props}: IReactCustomSelect) => {
	const FIRST_ELEMENT = 0;
	
	const childrenList = (children as JSX.Element).props.children.filter((child: JSX.Element) => child.type.name === 'Option');
	const childrenValueList = childrenList.map((child: JSX.Element) => child.props.value);
	
	const [activeValue, setActiveValue] = useState(0);
	
	const childrenListWithProps = childrenList.map((child: JSX.Element, index: number) => {
		return cloneElement(
			child,
			{...child.props, callback: callback, key: index, isActive: activeValue === index},
		);
	});
	
	const [isActive, setIsActive] = useState(false);
	const [isTabPressed, setIsTabPressed] = useState(false);
	
	useEffect(() => {
		callback(value);
	}, [callback, childrenValueList, value]);
	
	useEffect(() => {
		callback(childrenValueList[FIRST_ELEMENT]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	useEffect(() => {
		setActiveValue(childrenValueList.indexOf(value));
		// eslint-disable-next-line
	}, [value]);
	
	const selectRef: any = createRef();
	const selectOptionsRef: any = createRef();
	
	useOutsideAlerter(selectRef, () => setIsActive(false));
	
	const handleKeyDownSelect = (event: any) => {
		event.preventDefault();
		
		if (event.key === 'Enter') {
			setIsActive(!isActive);
			selectOptionsRef.current.focus();
		} else if (event.key === 'ArrowUp') {
			if (activeValue > 0) {
				callback(childrenValueList[activeValue - 1]);
				setActiveValue(activeValue - 1);
			}
		} else if (event.key === 'ArrowDown') {
			if (activeValue < childrenValueList.length - 1) {
				callback(childrenValueList[activeValue + 1]);
				setActiveValue(activeValue + 1);
			}
		} else if (event.key === 'ArrowLeft') {
			if (activeValue > 0) {
				callback(childrenValueList[activeValue - 1]);
				setActiveValue(activeValue - 1);
			}
		} else if (event.key === 'ArrowRight') {
			if (activeValue < childrenValueList.length - 1) {
				callback(childrenValueList[activeValue + 1]);
				setActiveValue(activeValue + 1);
			}
		} else if (event.key === 'Escape') {
			setIsActive(false);
		} else if (event.key === 'Tab') {
			if (!isTabPressed) {
				setIsActive(false);
				setIsTabPressed(true);
			} else {
				if (document.activeElement === selectRef.current) {
					selectRef.current.blur();
				}
			}
		}
	};
	
	return (
		<div
			{...props}
			className={`${styles.customSelect} ${isActive ? styles.customSelect_active : ''}`}
			onClick={(event: any) => {
				event.target.focus();
				setIsActive(!isActive);
			}}
			onKeyDown={handleKeyDownSelect}
			onBlur={setIsActive.bind(this, false)}
			tabIndex={0}
			ref={selectRef}
		>
			<div className={styles.customSelect__title}>
				<span>{value}</span>
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
					<path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
				</svg>
			</div>
			<div
				className={`${styles.customSelect__options} ${isActive ? styles.customSelect__options_active : ''}`}
			>
				{childrenListWithProps}
			</div>
		</div>
	);
};