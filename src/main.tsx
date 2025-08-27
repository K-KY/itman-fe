import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Register, RegisterComplete} from "./Register.tsx";
import {App} from "./app.tsx";
import Login from "./components/login.tsx";
import GroupBoard from "./components/boards/groupBoard.tsx";
import {Header} from "./components/header/header.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>

            <div className="flex flex-col h-screen overflow-hidden">
                <Header />
                <div className="flex flex-1 overflow-y-auto">
                    <Routes>
                        <Route path="/signup" element={<RegisterComplete />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/*" element={<App />} />
                        <Route path={"/group"} element={<GroupBoard/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    </StrictMode>
)
