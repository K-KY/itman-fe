import {useEffect} from "react";
import {SideBar} from "./components/sideBar/sideBar.tsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import {SimpleBoards} from "./components/boards/simpleBoards.tsx";
import {DepartService} from "./service/DepartService.ts";
import EmployeeBoard from "./components/boards/employeeBoards.tsx";
import {JobService} from "./service/JobService.ts";
import NewEmployee from "./components/boards/newEmployee.tsx";
import Login from "./components/login.tsx";
import {authMe} from "./axios/user.ts";
import {PositionService} from "./service/PositionService.ts";
import AssetBoard from "./components/boards/AssetBoard.tsx";
import {useGroupStore} from "./store/groupStore.ts";
import {CategoryService} from "./service/CategoryService.ts";
import {StateService} from "./service/StateService.ts";

export const App = () => {
    const navigate = useNavigate();
    const selectedGroup = useGroupStore(state => state.selectedGroupSeq);

    useEffect(() => {
        authMe().then(user => {
            if (!user) {
                navigate("/login");
            }
        });

        if (selectedGroup === null) {
            navigate("/group");
        }
    }, [navigate, selectedGroup]);



    return (
        <div className="flex flex-1 overflow-hidden">
            <SideBar/>
            <div className="flex-1 overflow-y-auto">
                <Routes>
                    <Route path="/departs" element={<SimpleBoards boardName={"부서"} boardSubName={"설명"} service={new DepartService()}/>}/>
                    <Route path="/employees" element={<EmployeeBoard/>}/>
                    <Route path="/employees/new" element={<NewEmployee/>}/>
                    <Route path="/assets" element={<AssetBoard/>}/>
                    <Route path="/jobs" element={<SimpleBoards boardName={"직무"} boardSubName={"설명"} service={new JobService()}/>}/>
                    <Route path="/category" element={<SimpleBoards boardName={"분류"} boardSubName={"색상"} service={new CategoryService()}/>}/>
                    <Route path="/state" element={<SimpleBoards boardName={"상태"} boardSubName={"상태"} service={new StateService()}/>}/>
                    <Route path="/positions"
                           element={<SimpleBoards boardName={"직위"} boardSubName={"설명"} service={new PositionService()}/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </div>
        </div>

    )
}
