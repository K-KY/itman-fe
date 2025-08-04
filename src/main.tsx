import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {Header} from "./components/header/header.tsx";
import {SideBar} from "./components/sideBar/sideBar.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AssetBoard, SimpleBoards} from "./components/boards/simpleBoards.tsx";
import EmployeeBoard from "./components/boards/employeeBoards.tsx";
import NewEmployee from "./components/boards/newEmployee.tsx";
import Login from "./components/login.tsx";
import {DepartService} from "./service/DepartService.ts";
import {JobService} from "./service/JobService.ts";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <div className="flex flex-col h-screen">
                <Header />
                <div className="flex flex-1 overflow-hidden">
                    <SideBar />
                    <div className="flex-1 overflow-y-auto">
                        <Routes>
                            <Route path="/departs" element={<SimpleBoards boardName={"부서"} service={new DepartService()} />} />
                            <Route path="/employees" element={<EmployeeBoard />} />
                            <Route path="/assets" element={<AssetBoard />} />
                            <Route path="/jobs" element={<SimpleBoards boardName={"직무"} service={new JobService()} />} />
                            <Route path="/employees/new" element={<NewEmployee />} />
                            <Route path="/login" element={<Login/>} />
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    </StrictMode>
)
