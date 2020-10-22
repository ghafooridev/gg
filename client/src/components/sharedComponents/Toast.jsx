import React, {useEffect} from 'react';
import {useSelector} from 'react-redux'

import {ToastBody, ToastHeader} from 'reactstrap';
import ReactStrapToast from 'reactstrap/lib/Toast';

import ToastAction from "../../redux/actions/ToastAction";

const Toast = function () {
	const {show, text} = useSelector(state => state.toast);

	const toggle = () => {
		ToastAction.hide();
	}

	useEffect(() => {
		setTimeout(() => {
			if (show) {
				ToastAction.hide()
			}
		}, 5000)
	}, [show])

	return (
		<div>
			<ReactStrapToast
				isOpen={show}
				className='staticToast bg-info rounded'
			>
				<ToastHeader toggle={toggle}>Success</ToastHeader>
				<ToastBody>
					{text}
				</ToastBody>
			</ReactStrapToast>
		</div>
	);
}

export default Toast;