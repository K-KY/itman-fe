import {useEffect, useRef, useState} from "react";
import EmployeeItem from "./employeeItem.tsx";
import {getEmployees, countAll} from "../../axios/emplyee.ts"
import type {Employee} from "../../interfaces/Employee.ts";
import type {PageRequest} from "../../interfaces/PageRequest.ts";
import {useSearchParams} from "react-router-dom";
import PageIndicator from "./pageIndicator.tsx";
import {useGroupStore} from "../../store/groupStore.ts";

const EmployeeBoard = () => {
    const selectedGroup = useGroupStore(state => state.selectedGroupSeq);

    const headers = ["직원", "사번", "부서", "직책", "연락처", "입사일", "상태", "담당자"]
    const tableHeader = useRef<string[]>(headers)

    const [searchParams, setSearchParams] = useSearchParams();
    const [totalPage, setTotalPage] = useState(0);
    const [itemCount, setItemCount] = useState(0);
    const [loading, setLoading] = useState(true); // 로딩 상태도 고려

    const currentPage = Number(searchParams.get("page") || 1); // 기본 1페이지

    const [pageRequest, setPageRequest] = useState<PageRequest>({
        page: Number(searchParams.get("page")) || currentPage,
        size:10
    })


    const [employees, setEmployees] = useState<Employee[]>([])

    const goToPage = (index: number) => {
        setPageRequest({page: index, size: 10,});
        setSearchParams({page: String(index)});
    }

    const getPages = (pageRequest: PageRequest) => {
        return getEmployees(pageRequest, selectedGroup)
            .then(data => {
                setEmployees(data.content);
                setTotalPage(data.totalPages);
            })
            .catch(() => {
                setEmployees([]);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    useEffect(() => {
        countAll(selectedGroup)
            .then(res => {
                setItemCount(res)
            })
        getPages(pageRequest)
    },[])

    useEffect(() => {
        getPages(pageRequest);
    }, [pageRequest]);



    if (loading) {
        return <div className="p-4">로딩 중입니다...</div>
    }

    return <div className={"m-4"}>
        <div className={"grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-2"}>
            <div className={"rounded-lg border"}>
                <div className={"p-6 flex flex-row items-center justify-between space-y-0 pb-2"}>
                    <h3 className={"tracking-tight text-sm font-medium"}>전체 직원 수</h3>
                </div>
                <div className={"p-6 pt-0"}>
                    <div className={"text-2xl font-bold"}>{itemCount ? itemCount : 0}</div>
                    <p className={"text-xs text"}>등록된 직원</p>
                </div>
            </div>
            <div className={"rounded-lg border"}>
                <div className={"p-6 flex flex-row items-center justify-between space-y-0 pb-2"}>
                    <h3 className={"tracking-tight text-sm font-medium"}>재직자</h3>
                </div>
                <div className={"p-6 pt-0"}>
                    <div className={"text-2xl font-bold"}>{itemCount ? itemCount : 0}</div>
                    <p className={"text-xs text"}>등록된 직원</p>
                </div>
            </div>
            <div className={"rounded-lg border"}>
                <div className={"p-6 flex flex-row items-center justify-between space-y-0 pb-2"}>
                    <h3 className={"tracking-tight text-sm font-medium"}>휴직자</h3>
                </div>
                <div className={"p-6 pt-0"}>
                    <div className={"text-2xl font-bold"}>{itemCount ? itemCount : 0}</div>
                    <p className={"text-xs text"}>등록된 직원</p>
                </div>
            </div>
            <div className={"rounded-lg border"}>
                <div className={"p-6 flex flex-row items-center justify-between space-y-0 pb-2"}>
                    <h3 className={"tracking-tight text-sm font-medium"}>퇴사자</h3>
                </div>
                <div className={"p-6 pt-0"}>
                    <div className={"text-2xl font-bold"}>{itemCount ? itemCount : 0}</div>
                    <p className={"text-xs text"}>등록된 직원</p>
                </div>
            </div>
        </div>

        <div className="rounded-lg border  m-3">
            <div className="flex flex-col space-y-1.5 p-6"><h3 className="font-semibold tracking-tight text-lg">검색 및
                필터</h3></div>
            <div className="p-6 pt-0">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round"
                                 className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </svg>
                            <input
                                className="h-10 w-full rounded-md border px-3 py-2 text-base pl-10"
                                placeholder="부서명, 코드, 부서장으로 검색..."
                                defaultValue=""
                            />
                        </div>
                    </div>
                    <button type="button"
                            className="flex h-10 items-center justify-between rounded-md border px-3 py-2 text-sm w-32">
                        <span>전체</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round" className="h-4 w-4 opacity-50" aria-hidden="true">
                            <path d="m6 9 6 6 6-6"></path>
                        </svg>
                    </button>
                    <button type="button"
                            className="flex h-10 items-center justify-between rounded-md border px-3 py-2 text-sm w-32">
                        <span>전체</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round" className="h-4 w-4 opacity-50" aria-hidden="true">
                            <path d="m6 9 6 6 6-6"></path>
                        </svg>
                    </button>
                </div>
            </div>
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



        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
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

                                {employees.map((item: Employee) => (
                                    <EmployeeItem key={item.empSeq} item={item}/>
                                ))}

                            </tbody>
                        </table>
                        <PageIndicator totalPage={totalPage} currentPage={currentPage} onPageChange={goToPage}></PageIndicator>

                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default EmployeeBoard;