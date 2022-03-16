import React from "react";
import TodoTest from 'pages/todo/TodoTest';
import Post from "pages/posts/Post";
import Ticket from "pages/ticket/Ticket";
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
import AudioPlayer from "../pages/audioPlayerTest/AudioPlayer";
import EmojiTest from "../hooks/useAxios/EmojiTest"
import PickCastAudioPlayer from "../pages/audioPlayer/PickCastAudioPlayer";
function Content () {
    return (
        <div className="wrapper">
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/todo" element={<TodoTest />} />
                <Route path="/ticket" element={<Ticket />} />
                <Route path="/post/write" element={<PostWrite />} />
                <Route path="/module" element={<EmojiTest />} />
                <Route path="/module/payment" element={<PaymentTemplate />} />
                <Route path="/module/certification" element={<CertificationTemplate />} />
                <Route path="/audioPlayer" element={<PickCastAudioPlayer />} />
            </Routes>
        </div>
    )
}

export default Content;