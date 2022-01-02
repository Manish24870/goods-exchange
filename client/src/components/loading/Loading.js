import React from "react";

import "./Loading.css";

const Loading = () => {
    return (
        <div className="lds-ring" style={{ marginLeft: "40%" }}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Loading;
