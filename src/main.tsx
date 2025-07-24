import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {Header} from "./components/header/header.tsx";
import {SideBar} from "./components/sideBar/sideBar.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AssetBoard, DepartBoard, EmployeeBoard} from "./components/boards/departBoards.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <div className="flex flex-col h-screen">
                <Header />
                <div className="flex flex-1 overflow-hidden">
                    <SideBar />
                    <div className="flex-1 overflow-y-auto">
                        <Routes>
                            <Route path="/departs" element={<DepartBoard />} />
                            <Route path="/employees" element={<EmployeeBoard />} />
                            <Route path="/assets" element={<AssetBoard />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    </StrictMode>
)
