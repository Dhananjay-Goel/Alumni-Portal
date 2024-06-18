import React, { useState, useEffect } from 'react';
import captchaImg from '../assets/captcha.jpeg';

function Captcha({ setVerified }) {  // Receive setVerified as prop
    const [user, setUser] = useState({ username: "" });
    const [captcha, setCaptcha] = useState("");

    useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = () => {
        const characters = 'abc123';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        setCaptcha(result);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const onSubmit = () => {
        const element = document.getElementById("successBTN");
        const inputData = document.getElementById("inputType");
        element.style.cursor = "wait";
        element.innerHTML = "Checking...";
        inputData.disabled = true;
        element.disabled = true;

        const myFunctions = () => {
            if (captcha === user.username) {
                setVerified(true);
                element.classList.remove("bg-white", "text-black");
                element.classList.add("bg-green-500", "text-white");
                element.innerHTML = "Captcha Verified";
                element.disabled = true;
                element.classList.add("cursor-not-allowed");
                inputData.style.display = "none";
            } else {
                setVerified(false);
                element.classList.add("bg-red-500", "text-white");
                element.classList.add("cursor-not-allowed");
                element.innerHTML = "Not Matched";
                element.disabled = true;
                const myFunction = () => {
                    element.classList.remove("bg-red-500", "text-white");
                    element.classList.add("bg-white", "text-black");
                    element.classList.remove("cursor-not-allowed");
                    element.innerHTML = "Verify Captcha";
                    element.disabled = false;
                    inputData.disabled = false;
                    inputData.value = '';
                };
                setTimeout(myFunction, 5000);
            }
        };        
        setTimeout(myFunctions, 5000);
    };

    useEffect(() => {
        const handleDOMContentLoaded = () => {
            const element = document.getElementById("successBTN");
            const inputData = document.getElementById("inputType");
            if (element && inputData) {
                element.addEventListener("click", onSubmit);
            }
        };
        document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);
        return () => {
            document.removeEventListener("DOMContentLoaded", handleDOMContentLoaded);
        };
    }, []);

    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-md-4"></div>
                <div className="col-md-8" style={{ position: "relative" }}>
                    <img src={captchaImg} style={{ width: "150px", height: "50px" }} alt="Captcha" />
                    <h4 id="captcha" style={{ position: "absolute", top: "25%", left: "8%", transform: "translate(-50%, -50%)", color: "black", textShadow: "1px 1px 2px black" }}>{captcha}</h4>
                    <div className="form-group row mt-3">
                        <input 
                            type="text" 
                            id="inputType" 
                            className="form-control w-1/5 rounded-md mr-3 p-2 border border-gray-400" 
                            placeholder="Enter Captcha"
                            name="username" 
                            onChange={handleChange} 
                            autoComplete="off" 
                        />
                        <button 
                            type="submit" 
                            id="successBTN" 
                            className="btn btn-primary ml-3 border border-gray-400 p-2 rounded-md"
                            onClick={onSubmit}
                        >
                            Verify Captcha
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Captcha;