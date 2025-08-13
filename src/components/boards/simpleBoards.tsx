import {type PageRequest} from "../../interfaces/PageRequest.ts";
import {useEffect, useState} from "react";
import SimpleBoardItem from "./simpleBoardItem.tsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import SimpleInsertModal from "./simpleModal.tsx";
import PageIndicator from "./pageIndicator.tsx";
import type {SimpleBoard} from "../../interfaces/SimpleBoard.ts";
import type {SimpleService} from "../../service/SimpleService.ts";
import {useGroupStore} from "../../store/groupStore.ts";

interface Props {
    boardName: string;
    service: SimpleService
}

const SimpleBoards = ({service, boardName}: Props) => {
    const selectedGroup = useGroupStore(state => state.selectedGroupSeq);

    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page") || 1); // 기본 1페이지

    const [pageRequest, setPageRequest] = useState<PageRequest>({
        page: Number(searchParams.get("page") || currentPage),
        size: 10,
    });
    const [totalPage, setTotalPage] = useState(0);
    const [departCount, setDepartCount] = useState(0);
    const [activeCount, setActiveCount] = useState(0);
    const [data, setData] = useState<SimpleBoard[]>([]);
    const [error, setError] = useState(false); // 에러 상태 추가
    const [loading, setLoading] = useState(true); // 로딩 상태도 고려

    // const [searchKeyword, setSearchKeyword] = useState("");
    // const [sortOption, setSortOption] = useState("recent");

    const goToPage = (index: number) => {
        setPageRequest({page: index, size: 10,});
        setSearchParams({page: String(index)});
    }

    const getPages = (pageRequest: PageRequest) => {
        return service.getAll(pageRequest, selectedGroup)
            .then(data => {
                setData(data.content);
                setTotalPage(data.totalPages);
            })
            .catch(() => {
                setError(true);
                setData([]);
            })
    }

    const onChange = () => {
        Promise.all([
            service.getCountAll(false, selectedGroup)
                .then(setDepartCount)
                .catch(() => setError(true)),
            service.getCount(selectedGroup)
                .then(setActiveCount)
                .catch(() => setError(true))
        ]).finally(() => setLoading(false));
    }


    useEffect(() => {
        if (selectedGroup === 0 || null) {
            navigate("/group");
        }

        setLoading(true);
        onChange();
    }, []);

    useEffect(() => {
        getPages(pageRequest);
    }, [pageRequest]);

    if (loading) {
        return <div className="p-4">로딩 중입니다...</div>
    }

    if (error) {
        return <div className="p-4 text-red-500">⚠ 서버 연결에 실패했습니다. UI는 제한적으로 표시됩니다.</div>
    }


    return (
        <div className={"m-4"}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-2">
                <div className="rounded-lg border ">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">총 {boardName} 수</h3>
                        <img src={"/depart_manage.svg"} alt=""/>
                    </div>
                    <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">{departCount}</div>
                        <p className="text-xs text-muted-foreground">활성 {activeCount}개</p>
                    </div>
                </div>
                <div className="rounded-lg border ">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2"><h3
                        className="tracking-tight text-sm font-medium"></h3>
                        <img src={"/employee_manage.svg"} alt="직원 관리"/>
                    </div>
                    <div className="p-6 pt-0">
                        <div className="text-2xl font-bold"></div>
                        <p className="text-xs text-muted-foreground"></p></div>
                </div>
                <div className="rounded-lg border ">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium"></h3>
                        <img src={"/reports.svg"} alt="reports"/>
                    </div>
                    <div className="p-6 pt-0">
                        <div className="text-2xl font-bold"></div>
                        <p className="text-xs text-muted-foreground"></p></div>
                </div>
                <div className="rounded-lg border ">
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
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2
                                    text-base ring-offset-background file:border-0 file:bg-transparent
                                    file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground
                                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                                    disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10"
                                    placeholder={`${boardName}명, 또는 ${boardName} 번호로 검색`} defaultValue={""}/></div>
                        </div>
                        <button type="button" role="combobox" aria-controls="radix-:rg:" aria-expanded="false"
                                aria-autocomplete="none" dir="ltr" data-state="closed"
                                className="flex h-10 items-center justify-between rounded-md border border-input
                                bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground
                                focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                                disabled:cursor-not-allowed disabled:opacity-50 [&amp;&gt;span]:line-clamp-1 w-32">
                            <span>전체</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round" className="lucide lucide-chevron-down h-4 w-4 opacity-50"
                                 aria-hidden="true">
                                <path d="m6 9 6 6 6-6"></path>
                            </svg>
                        </button>
                        <button type="button" role="combobox" aria-controls="radix-:rh:" aria-expanded="false"
                                aria-autocomplete="none" dir="ltr" data-state="closed"
                                className="flex h-10 items-center justify-between rounded-md border border-input
                                bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground
                                focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                                disabled:cursor-not-allowed disabled:opacity-50 [&amp;&gt;span]:line-clamp-1 w-32">
                            <span>전체</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round" className="lucide lucide-chevron-down h-4 w-4 opacity-50"
                                 aria-hidden="true">
                                <path d="m6 9 6 6 6-6"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-end px-6 mb-2">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-md shadow"
                >
                    + {boardName} 추가
                </button>
            </div>


            <div className="min-h-[400px] flex flex-col justify-between p-3">
                <ul className="divide-y divide-gray-200 border rounded-lg shadow-sm">
                    {data.map((item: SimpleBoard) => (
                        <SimpleBoardItem key={item.seq} item={item} boardName={boardName} service={service}
                                         onChange={onChange}/>
                    ))}
                </ul>
                <PageIndicator totalPage={totalPage} currentPage={currentPage} onPageChange={goToPage}></PageIndicator>
            </div>

            <SimpleInsertModal boardName={boardName} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
                               service={service}/>

        </div>
    )
}


const AssetBoard = () => {
    return (
        <div>
            <h2 className={"text-9xl"}>asset</h2>
        </div>
    )
}
export {SimpleBoards, AssetBoard}
