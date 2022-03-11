import React, {useEffect, useState} from "react";
import './main.css';
// import Modal from 'components/Modal'
import Modal from 'antd/lib/modal';

function Main() {
    const [modalVisible, setModalVisible] = useState(false);
    const openModal = () => {
        setModalVisible(true);
        // document.body.style.cssText = `overflow: hidden`;
    }
    const closeModal = () => {
        setModalVisible(false);
        // document.body.style.cssText = `overflow: unset`;
    }
    return (
        <>
        <ul className="mainNav">
            <li>뮤지엄</li>
            <li>픽캐스트</li>
            <li>에디터픽</li>
            <li>작품</li>
        </ul>
        <div className="">
            <button type="button" className="modalTestBtn" onClick={openModal}>Modal test</button>
            <Modal title="Modal test" visible={modalVisible} onOk={closeModal} onCancel={closeModal}>
                <p>????</p>
                <p>!!!!!</p>
                <p>123123123123</p>
            </Modal>
            {/*<Modal closable={true} maskClosable={true} onClose={closeModal} className="mainModal" visible={modalVisible}>*/}
            {/*    <p>??????</p>*/}
            {/*    <p>!!!!</p>*/}
            {/*</Modal>*/}
        </div>
        </>
    )
}

export default Main;