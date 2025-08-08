import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {RegisterComplete} from "./Register.tsx";
import {App} from "./app.tsx";
import Login from "./components/login.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/register" element={<RegisterComplete />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/*" element={<App />} />
                </Routes>
            </div>
        </BrowserRouter>
    </StrictMode>
)
