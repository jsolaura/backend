import React, {useRef, useState} from "react";
import axios from "axios";
import PostService from "../../services/PostService";
import {useLocation} from "react-router-dom";

const PostWrite = () => {
    // 이미지 파일 preview
    const [imageBase64, setImageBase64] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const initialPostState = {
        id: null,
        title: "",
        content: "",
        // imgUrl: "",
        isActive: false,
    }

    const [postList, setPostList] = useState(initialPostState);
    const [submitted, setSubmitted] = useState(false);

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setPostList({...postList, [name]: value});
    }

    // const handleChangeFile = (e) => {
    //     let reader = new FileReader();
    //     reader.onloadend = () => {
    //         const base64 = reader.result;
    //         if (base64) {
    //             setImageBase64(base64.toString());
    //         }
    //     }
    //     if (e.target.files[0]) {
    //         reader.readAsDataURL(e.target.files[0]);
    //         setImageFile(e.target.files[0]);
    //     }
    // }


    const savePost = () => {
        let data = {
            title: postList.title,
            content: postList.content,
            // imgUrl: imageFile,
            isActive: false,
        };
        PostService.create(data)
            .then(response => {
                setPostList({
                    id: response.data.id,
                    title: response.data.title,
                    content: response.data.content,
                    // imgUrl: response.data.imgUrl,
                    isActive: response.data.isActive,
                });
                setSubmitted(true);
                alert("정말 등록하시겠습니까?");
                window.location = "/post";
                console.log(response.data);
            })
            .catch(e => {
                console.log(e.message());
            })
    }

    return (
        <div className="postForm">
            <h5>POSTING</h5>
            <label>
                Title:
                <input type="text" name="title" value={postList.title} onChange={handleChangeInput} className="postTitle" placeholder="제목을 입력하세요!" />
            </label>
            <label>
                Content:
                <textarea name="content" value={postList.content} onChange={handleChangeInput} className="postText" placeholder="내용을 입력하세요!" />
            </label>

            <button type="button" onClick={savePost} className="submitPost">Submit</button>
        </div>
    );
}

export default PostWrite;