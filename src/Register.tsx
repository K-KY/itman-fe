import React, {useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {register, verify} from "./axios/register.ts";
import {authMe} from "./axios/user.ts";

export const RegisterComplete = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams(location.search);
            const token = params.get("token");

            if (!token) {
                navigate("/");
                return;
            }

            console.log("토큰:", token);

            // 인증 API 호출
            const result = await verify(token);

            if (result.success) {
                console.log("인증 성공", result.data);
                setVerified(true);
                // 성공 시 동작
            } else {
                console.error("인증 실패", result.error);
                // 실패 시 안내 메시지나 페이지 이동
            }
        };

        fetchData();
    }, [location, navigate]);

    if (verified) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
                    <div className="w-full flex justify-center items-center pb-10">
                        <img className={"w-24"} src={"/itman_logo.png"} alt={"itman"}/>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">🎉 회원가입이 완료되었습니다!</h2>
                    <p className="text-gray-600 mb-6">
                        이제 로그인을 통해 다양한 서비스를 이용하실 수 있습니다.
                    </p>
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
                    >
                        로그인하러 가기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <RegisterFailed/>
        </div>
    )

};

const RegisterFailed = () => {

    return (
        <div>
            <h2 className={"size-80"}>
                회원가입 실패
            </h2>
        </div>
    )
}

const Register = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        authMe().then(user => {
            if (user) {
                navigate("/group");
            }
        });
    }, [navigate]);

    function handleRegister(e: React.FormEvent) {
        e.preventDefault(); // form submit 막기
        register(userId, password, username)
            .then((res) => {
                console.log("요청 성공", res);
            })
            .catch((err) => {
                console.error("회원가입 실패", err);
                alert("회원가입 실패");
            });
    }


    return (
        <div>
            <form className='login-form' onSubmit={handleRegister}>
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
                <input
                    type='text'
                    placeholder='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type='submit'>회원가입</button>
            </form>
        </div>
    )
}

export {Register, RegisterFailed}