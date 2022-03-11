import React from "react";
import {NavLink} from "react-router-dom";
import './certification/certification.css';

function Index() {
    return (
        <>
            <NavLink className="paymentNav" to="/module/payment">PAYMENT</NavLink>
            <NavLink className="paymentNav" to="/module/certification">CERTIFICATION</NavLink>
        </>
    )
}

export default Index;