import {useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";

export const RegisterComplete = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");

        if (!token) {
            // token이 없으면 메인 페이지로 리디렉션
            navigate("/");
        }

        //여기서 백엔드 인증 API 호출
    }, [location, navigate]);

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
};

const Register = () => {
    return (
        <div></div>
    )
}

export {Register}