import {useRef, useState} from "react";
import EmployeeItem from "./employeeItem.tsx";
import type {Employee} from "../../interfaces/Employee.ts";



const EmployeeBoard = () => {
    const headers = ["직원", "사번", "부서", "직책", "연락처", "입사일", "상태"]
    const [employees, setEmployees] = useState<Employee[]>([])
    const tableHeader = useRef<string[]>(headers)
    return <div className={"m-4"}>
        <div className={"grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-2"}>
            <div className={"rounded-lg border"}>
                <div className={"p-6 flex flex-row items-center justify-between space-y-0 pb-2"}>
                    <h3 className={"tracking-tight text-sm font-medium"}>a</h3>
                </div>
                <div className={"p-6 pt-0"}>
                    <div className={"text-2xl font-bold"}>b</div>
                    <p className={"text-xs text"}>c</p>
                </div>
            </div>
        </div>



        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6"><h3
                className="text-2xl font-semibold leading-none tracking-tight">직원 목록</h3>
                <p className="text-sm text-muted-foreground">총 10명의 직원이 검색되었습니다</p>
            </div>
            <div className="flex justify-end px-6 mb-2">
                <a
                    className="bg-green-500 hover:bg-green-600
                    text-white text-sm font-medium py-2 px-4 rounded-md shadow"
                    href={"/employees/new"}
                >
                    직원 추가
                </a>
            </div>

            <div className="p-6 pt-0">
                <div className="overflow-x-auto">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&amp;_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                {tableHeader.current.map(item => <th
                                        key={item}
                                        className="h-12 px-4 text-left align-middle font-medium text-muted-foreground
                                        [&:has([role=checkbox])]:pr-0"
                                    >
                                        {item}
                                    </th>)
                                }
                            </tr>
                            </thead>
                            <tbody className="[&amp;_tr:last-child]:border-0">
                                <EmployeeItem></EmployeeItem>
                                <EmployeeItem></EmployeeItem>
                                <EmployeeItem></EmployeeItem>
                                <EmployeeItem></EmployeeItem>
                                <EmployeeItem></EmployeeItem>
                                <EmployeeItem></EmployeeItem>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default EmployeeBoard;