import React from 'react';
import reactDom from 'react-dom';
import classes from './Modal.module.css'

const Backdrop = props => {
    return <div onClick={props.onClose} className={classes.backdrop}></div>
}

const ModalOverlay = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const PortalElem = document.getElementById('overlays')

const Modal = (props) => {
    return (
        <React.Fragment>
            {reactDom.createPortal(<Backdrop onClose={props.onClose} />, PortalElem )}
            {reactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, PortalElem )}
        </React.Fragment>
    );
};

export default Modal;