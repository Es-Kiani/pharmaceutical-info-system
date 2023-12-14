import React from "react";
import "./PostItem.css";

const PostItem = ({ author, title, newsText, postID, adminPage, refresh }) => {
    const deleteDrug = () => {
        fetch(`http://localhost:4000/posts/${postID}`, {
            method: "DELETE",
        })
            .then((res) => res.status === 200 && refresh())
            .catch((err) => console.log(err));
    };

    return (
        <div className="drugItem">
            <div className="drugItem-right">
                <div className="drugItem-filed">
                    <label className="drugItem-filed__label">Title:</label>
                    <p className="drugItem-filed__answer">{title}</p>
                </div>
                <div className="drugItem-filed">
                    <label className="drugItem-filed__label">Author:</label>
                    <p className="drugItem-filed__answer">{author}</p>
                </div>
                {adminPage ? (
                    <></>
                ) : (
                    <><div className="drugItem-filed">
                    <label className="drugItem-filed__label">Details:</label>
                    <p className="drugItem-filed__answer">{newsText}</p>
                </div></>
                )}
            </div>
            <div className="drugItem-left">
                {adminPage ? (
                    <button
                        className="drugItem-left__delete"
                        onClick={deleteDrug}
                    >
                        Delete
                    </button>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default PostItem;
