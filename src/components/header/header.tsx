import {SimpleButton} from "../buttons/simpleButton.tsx";

const Header = () => {
    return (
        <header>
            <div className="bg-white h-14 flex items-center px-4 shadow-lg justify-between min-w-96">
                <a href="/" className="h-14 block">
                    <img
                        src="/itman_header_logo.png"
                        className="h-full object-contain p-3"
                        alt="사이트 로고"
                    />
                </a>
                <div className="flex items-center justify-center gap-4">
                    <SimpleButton className={"bg-gray-100 hover:bg-gray-200"} text={"로그인"} href={"/login"}/>
                    <SimpleButton className={"bg-gray-100 hover:bg-gray-200"} text={"회원가입"}/>
                </div>
            </div>
        </header>
    )
}

export {Header}