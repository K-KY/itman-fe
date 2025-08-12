import React, {useEffect, useState} from "react";
import LoginApi from "../axios/login.ts";
import {useNavigate} from "react-router-dom";
import {authMe} from "../axios/user.ts"; // 함수명과 컴포넌트명 충돌 방지

const Login = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        authMe().then(user => {
            if (user) {
                navigate("/group");
            }
        });
    }, [navigate]);

    function handleLogin(e: React.FormEvent) {
        e.preventDefault(); // form submit 막기
        LoginApi(userId, password)
            .then((res) => {
                console.log("로그인 성공", res);
                navigate("/group");
            })
            .catch((err) => {
                console.error("로그인 실패", err);
                alert("로그인 실패");
            });
    }

    return (
        <div>
            <form className='login-form' onSubmit={handleLogin}>
                <input
                    type='text'
                    placeholder='userId'
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>로그인</button>
            </form>
        </div>
    );
};

export default Login;
