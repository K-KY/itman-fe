import React, {useRef, useEffect, useState, useCallback} from "react";
import {useGroupStore} from "../../store/groupStore";
import {getGroupInfo, getGroups, type Group} from "../../axios/group";
import {useNavigate} from "react-router-dom";


const GroupBoard = () => {
    const navigate = useNavigate();
    const setSelectedGroupSeq = useGroupStore((state) => state.setSelectedGroupSeq);


    const [groups, setGroups] = useState<Group[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const initRef = useRef(false);

    // 그룹 데이터 불러오기 함수
    const loadGroups = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        const currentPage = page; // 여기서 고정
        try {
            const response = await getGroups({
                page: currentPage,
                size: 16,
            }).then(res => res.content);

            if (response.length === 0) {
                setHasMore(false);
            } else {
                setGroups(prev => {
                    //마지막 몇개 중복 렌더링해서 중복 제거용으로 넣음
                    //분명 다른 방법이 있을거
                    const existingSeq = new Set(prev.map(g => g.groupSeq));
                    const newItems = response.filter(g => !existingSeq.has(g.groupSeq));
                    return [...prev, ...newItems];
                });
                setPage(prev => prev + 1); // 요청 성공 후 페이지 증가
            }
        } catch (error) {
            console.error("Failed to load groups", error);
        } finally {
            setLoading(false);
        }
    }, [page, loading, hasMore]);

    useEffect(() => {
        if (initRef.current) {
            return;
        }
        initRef.current = true;
        loadGroups();

    }, []);

    // 스크롤 이벤트 핸들러
    const handleScroll = useCallback(() => {
        console.log("scroll")
        if (loading || !hasMore) return;

        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= fullHeight - 100) {
            loadGroups();
        }
    }, [loading, hasMore, loadGroups]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);


    const onGroupClick = (seq: number) => {
        setSelectedGroupSeq(seq);

        // console.log(selectedGroupSeq)
        navigate("/");
    };

    return (
        <>
            <div
                className="flex flex-wrap justify-center gap-4"
                style={{maxWidth: '100%', margin: '0 auto'}}
            >
                {groups.map((group) => (
                    <div key={group.groupSeq} className={"min-w-64"}>
                        <GroupBoardItem
                            onClick={() => onGroupClick(group.groupSeq)}
                            group={group}
                        />
                    </div>
                ))}
            </div>

            {loading && <div>로딩 중...</div>}
            {!hasMore && <div>모든 그룹을 불러왔습니다.</div>}
        </>
    );
};

type GroupBoardItemProps = {
    onClick: () => void;
    group: Group;
};

const GroupBoardItem: React.FC<GroupBoardItemProps> = ({onClick, group}) => {
    const [departs, setDeparts] = useState(0)
    const [employees, setEmployees] = useState(0)
    const [assets, setAssets] = useState(0)
    useEffect(() => {
        async function fetch() {
            const groupInfo = await getGroupInfo(group.groupSeq);
            setDeparts(groupInfo.departs);
            setEmployees(groupInfo.employees);
            setAssets(groupInfo.assets);
        }

        fetch();
    }, [group.groupSeq]);

    return (
        <div
            onClick={onClick}
            className={"cursor-pointer border-gray-200 p-2"}
        >
            <ul className="m-4 border border-gray-300 rounded-2xl shadow-sm overflow-hidden max-w-xl min-w-64">

                <li>
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2">{group.groupName}</h2>
                        <p className="text-gray-700 mb-4 bg-gray-100 line-clamp-3 rounded-md text-base p-1">
                            부서 수 : {departs}
                        </p>
                        <p className="text-gray-700 mb-4 bg-gray-100 line-clamp-3 rounded-md text-base p-1">
                            사원 수 : {employees}
                        </p>
                        <p className="text-gray-700 mb-4 bg-gray-100 line-clamp-3 rounded-md text-base p-1">
                            자산 수 : {assets}
                        </p>

                        <ul className="flex flex-wrap gap-2 justify-end">
                            <li
                                className="bg-gray-200 text-sm text-gray-800 px-2 py-1 rounded-xl"
                            >
                                {new Date(group.createdDate).toLocaleDateString()}
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default GroupBoard;
