import React from 'react';
import styled from "styled-components";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {RevolvingDot} from 'react-loader-spinner'
const Loader = () => {
    return (
        <RevolvingDot
            width={"00"}
            height={"100"}
            color={"#fff"}
            wrapperClass={"spinner"}
        />
    );
};


export default Loader;