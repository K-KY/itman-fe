import {useEffect} from "react";
import {SideBar} from "./components/sideBar/sideBar.tsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import {AssetBoard, SimpleBoards} from "./components/boards/simpleBoards.tsx";
import {DepartService} from "./service/DepartService.ts";
import EmployeeBoard from "./components/boards/employeeBoards.tsx";
import {JobService} from "./service/JobService.ts";
import NewEmployee from "./components/boards/newEmployee.tsx";
import Login from "./components/login.tsx";
import {authMe} from "./axios/user.ts";

export const App = () => {
    const navigate = useNavigate();

    useEffect(() => {
        authMe().then(user => {
            if (!user) {
                navigate("/login");
            }
        });
    }, [navigate]);

    return (
        <div className="flex flex-col h-screen">
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

    )
}
