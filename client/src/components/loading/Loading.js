import React from "react";

import "./Loading.css";

const Loading = () => {
    return (
        <div className="lds-ring" style={{ marginLeft: "43%" }}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Loading;
