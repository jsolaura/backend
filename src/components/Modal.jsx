import React, {useEffect} from "react";
import './css/modal.css';
import styled from "styled-components";
import PropsType from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Portal from "./Portal";

function Modal({ className, onClose, maskClosable, closable, visible, children }) {
    const onMaskClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose(e);
        }
    }
    const close = (e) => {
        if (onClose) {
            onClose(e);
            document.body.style.overflow = "unset";
        }
    }

    return (
        <Portal elementId="modal-root">
            <ModalOverlay visible={visible} />
            <ModalWrapper
                className={className}
                tabIndex={-1}
                visible={visible}
                onClick={maskClosable ? onMaskClick : null}
            >
                <ModalInner tabIndex={0} className="modal-inner">
                    {closable && <div className="modal-close" onClick={close} ><FontAwesomeIcon icon={faTimes} /></div>}
                    {children}
                </ModalInner>
            </ModalWrapper>
        </Portal>
    )
}

Modal.propTypes = {
    visible: PropsType.bool,
}

Modal.defaultProps = {
    closable: true,
    maskClosable: true,
    visible: false,
}

const ModalWrapper = styled.div`
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1000;
    overflow: auto;
    outline: 0;
`

const ModalOverlay = styled.div`
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 999;
`

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 360px;
  max-width: 480px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
`

export default Modal;