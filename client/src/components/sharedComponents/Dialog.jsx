import React from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import {useSelector} from "react-redux";
import dialogAction from "../../redux/actions/dialogAction";

const Dialog = function () {
	const {show, component, title} = useSelector(state => state.dialog)
	console.log(component, title)
	const toggle = function () {
		dialogAction.hide()
	}

	return (
		<div>
			<Modal isOpen={show} toggle={toggle}>
				<ModalHeader toggle={toggle}>{title}</ModalHeader>
				<ModalBody>
					{component}
				</ModalBody>

			</Modal>
		</div>
	);
}

export default Dialog;