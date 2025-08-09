import {SimpleButton} from "../buttons/simpleButton.tsx";
import {authMe} from "../../axios/user.ts";
import {useEffect, useState} from "react";

const Header = () => {
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);
    useEffect(() => {
        authMe().then((result) => {
            if (result) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
        }).catch(() => {
            setAuthenticated(false);
        })
    }, []);

    if (authenticated === null) {
        // 새로고침시 로그인 되지 않은 상태의 UI가 보이지 않게
        return (
            <HeaderContainer/>
        )
    }


    if (authenticated) {
        return (
            <HeaderContainer>
                <SimpleButton className={"bg-gray-100 hover:bg-gray-200"} text={"로그아웃"}/>
            </HeaderContainer>
        )
    }

    return (
        <HeaderContainer>
            <SimpleButton className={"bg-gray-100 hover:bg-gray-200"} text={"로그인"} href={"/login"}/>
            <SimpleButton className={"bg-gray-100 hover:bg-gray-200"} text={"회원가입"}/>
        </HeaderContainer>
    )

}

interface HeaderContentProps {
    children?: React.ReactNode;
}


const HeaderContainer =  ({ children }: HeaderContentProps) => {
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
                    {children}
                </div>
            </div>
        </header>

    )
}

export {Header}