import React, {useState} from "react";
import AscendImg from "../images/ascend.jpg";
import {Link} from "react-router-dom";
import {CognitoUser, AuthenticationDetails} from "amazon-cognito-identity-js";
import UserPool from "../UserPool";


console.log("gi");

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const submitInfo = async (event) => {
        event.preventDefault();
        const user = new CognitoUser({
            Username: email,
            Pool: UserPool,
        });
        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
        });
        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                console.log("onSuccess: ", data);
            },
            onFailure: (err) => {
                console.error("onFailure: ", err);
            },
        });
    };

    return (
        <div
            style={{
                backgroundImage: `url(${AscendImg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
            className="flex items-center justify-center h-screen w-screen text-white"
        >
            <div className="flex flex-col justify-center bg-gray-400 w-[330px] h-[350px] px-5 py-5 rounded-md">
                <h1 className="text-xl text-center font-bold">Log In</h1>
                <form className="flex flex-col items-center">
                    <label className="w-full mt-2">Email:</label>
                    <input
                        className="w-full text-black p-1 rounded-md"
                        type="text"
                        value={email}
                        onChange={(x) => setEmail(x.target.value)}
                    />
                    <label className="w-full mt-2">Password:</label>
                    <input
                        className="w-full text-black p-1 rounded-md"
                        type="password"
                        value={password}
                        onChange={(x) => setPassword(x.target.value)}
                    />
                    <button
                        type="Submit"
                        className="mt-7 mb-3 border border-black-150 p-2 w-[80%] hover:border-blue-600 hover:scale-103 hover:bg-blue-600 hover:text-white duration-300"
                        onClick={submitInfo}
                    >
                        Log In
                    </button>
                    <p>Don't have an account?</p>
                    <Link to="/Signup" className="text-blue-500 underline">
                        Sign up here!
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
