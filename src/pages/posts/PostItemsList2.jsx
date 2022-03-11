import React from "react";

const PostItemsList2 = ({ posts, loading }) => {
    return (
        <>
            { loading &&
                <div>loading...</div>
            }
            <ul className="postList">
                { posts.map(post => (
                    <li key={post.id}>
                        <a href={post.url}>
                            <img src={post.thumbnailUrl} alt="postThumbnail" />
                            <p>{post.title}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default PostItemsList2;