import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function LogoutPage() {
    let navigate = useNavigate();

    useEffect(() => {
        Cookies.remove("login");
        navigate("/login");
    }, [navigate]);

    return (<></>);
}

export default LogoutPage;
