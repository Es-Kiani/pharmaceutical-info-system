import React from "react";
import { Link } from "react-router-dom";
import "./DrugItem.css";

const DrugItem = ({
    faName,
    enName,
    cure,
    drugId,
    adminPage,
    showInfo,
    refresh,
    describtion,
}) => {
    const deleteDrug = () => {
        fetch(`http://localhost:4000/drugs/${drugId}`, {
            method: "DELETE",
        })
            .then((res) => res.status === 200 && refresh())
            .catch((err) => console.log(err));
    };

    return (
        <div className="drugItem">
            <div className="drugItem-right">
                <div className="drugItem-filed">
                    <label className="drugItem-filed__label">
                        International name:
                    </label>
                    <p className="drugItem-filed__answer">{enName}</p>
                </div>
                <div className="drugItem-filed">
                    <label className="drugItem-filed__label">
                        Persian name:
                    </label>
                    <p className="drugItem-filed__answer">{faName}</p>
                </div>
                <div className="drugItem-filed">
                    <label className="drugItem-filed__label">Usage:</label>
                    <p className="drugItem-filed__answer">{cure}</p>
                </div>
                {adminPage ? (
                    <></>
                ) : showInfo ? (
                    <div className="drugItem-filed">
                        <label className="drugItem-filed__label">Info:</label>
                        <p className="drugItem-filed__answer">{describtion}</p>
                    </div>
                ) : (
                    <></>
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
                    <Link to={`/druginfo/${drugId}`} className="drugItem-btn">
                        More info
                    </Link>
                )}
            </div>
        </div>
    );
};

export default DrugItem;
