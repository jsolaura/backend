import React from "react";
import TodoTest from 'pages/todo/TodoTest';
import Post from "pages/posts/Post";
import Ticket from "pages/posts/Ticket";
import Index from "pages/module/Index";
import Main from "pages/main/Main";
import '../App.css';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import PostWrite from "../pages/posts/PostWrite";
import PaymentTemplate from "../pages/module/payment/PaymentTemplate";
import CertificationTemplate from "../pages/module/certification/CertificationTemplate";

function Content () {
    return (
        <div className="wrapper">
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/todo" element={<TodoTest />} />
                <Route path="/ticket" element={<Ticket />} />
                <Route path="/post/write" element={<PostWrite />} />
                <Route path="/module" element={<Index />} />
                <Route path="/module/payment" element={<PaymentTemplate />} />
                <Route path="/module/certification" element={<CertificationTemplate />} />
            </Routes>
        </div>
    )
}

export default Content;