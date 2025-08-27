import React, { useRef, useEffect, useState, useCallback } from "react";
import { useGroupStore } from "../../store/groupStore";
import { getGroupInfo, getGroups, postGroup, type Group } from "../../axios/group";
import { useNavigate } from "react-router-dom";

// 새로운 그룹 생성 폼 컴포넌트
const GroupCreationForm: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}> = ({ isOpen, onClose, onSuccess }) => {
    const [groupName, setGroupName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!groupName.trim() || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const newGroup: Group = {
                groupSeq: null,
                groupName: groupName.trim(),
                del: false,
                createdDate: null,
                modifiedDate: null,
            };

            await postGroup(newGroup);
            setGroupName("");
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Failed to create group:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">새 그룹 생성</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 mb-2">
                            그룹 이름
                        </label>
                        <input
                            type="text"
                            id="groupName"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            placeholder="그룹 이름을 입력하세요"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            maxLength={100}
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                            disabled={isSubmitting}
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            disabled={!groupName.trim() || isSubmitting}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isSubmitting ? "생성 중..." : "생성"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const GroupBoard = () => {
    const navigate = useNavigate();
    const setSelectedGroupSeq = useGroupStore((state) => state.setSelectedGroupSeq);

    const [groups, setGroups] = useState<Group[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const initRef = useRef(false);

    // 그룹 데이터 불러오기 함수 (개선됨)
    const loadGroups = useCallback(async (resetPage = false) => {
        if (loading || (!hasMore && !resetPage)) return;

        setLoading(true);
        setError(null);
        const targetPage = resetPage ? 1 : page;

        try {
            const response = await getGroups({
                page: targetPage,
                size: 16,
            });

            if (response.content.length === 0) {
                setHasMore(false);
            } else {
                setGroups(prev => {
                    if (resetPage) {
                        return response.content;
                    }
                    // 중복 제거 로직 개선
                    const existingSeqs = new Set(prev.map(g => g.groupSeq));
                    const newItems = response.content.filter(g => !existingSeqs.has(g.groupSeq));
                    return [...prev, ...newItems];
                });

                // 다음 페이지 번호 설정
                const nextPage = targetPage + 1;
                setPage(nextPage);
                setHasMore(response.content.length === 16); // 16개 미만이면 마지막 페이지
            }
        } catch (error) {
            console.error("Failed to load groups", error);
            setError("그룹을 불러오는데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    }, [page, loading, hasMore]);

    // 초기 데이터 로드
    useEffect(() => {
        if (initRef.current) return;
        initRef.current = true;
        loadGroups();
    }, []);

    // 무한 스크롤 핸들러
    const handleScroll = useCallback(() => {
        if (loading || !hasMore) {
            console.log('스크롤 중단:', { loading, hasMore });
            return;
        }


        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;

        console.log('스크롤 정보:', {
            scrollTop,
            windowHeight,
            fullHeight,
            trigger: scrollTop + windowHeight >= fullHeight - 300
        });

        if (scrollTop + windowHeight >= fullHeight - 300) {
            console.log('무한 스크롤 트리거!');
            loadGroups();
        }
    }, [loading, hasMore, loadGroups]);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        const throttledScroll = () => {
            if (timeoutId) return;

            timeoutId = setTimeout(() => {
                handleScroll();
                timeoutId = undefined as any;
            }, 100);
        };

        window.addEventListener("scroll", throttledScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", throttledScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [handleScroll]);

    const onGroupClick = useCallback((seq: number | null) => {
        if (!seq) return;
        setSelectedGroupSeq(seq);
        navigate("/");
    }, [setSelectedGroupSeq, navigate]);

    const handleCreateSuccess = useCallback(() => {
        // 그룹 생성 성공 시 목록 새로고침
        setGroups([]);
        setPage(1);
        setHasMore(true);
        loadGroups(true);
    }, [loadGroups]);

    return (
        <div className="container mx-auto px-4">
            {/* 헤더 섹션 */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">그룹 목록</h1>
                <button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    그룹 생성
                </button>
            </div>

            {/* 에러 메시지 */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* 그룹 목록 */}
            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8"
                style={{ maxWidth: '100%', margin: '0 auto' }}
            >
                {groups.map((group) => (
                    <GroupBoardItem
                        key={group.groupSeq}
                        onClick={() => onGroupClick(group.groupSeq)}
                        group={group}
                    />
                ))}
            </div>

            {/* 로딩 및 상태 메시지 */}
            <div className="text-center">
                {loading && <div className="text-gray-600">로딩 중...</div>}
                {!hasMore && groups.length > 0 && (
                    <div className="text-gray-500">모든 그룹을 불러왔습니다.</div>
                )}
                {!loading && groups.length === 0 && (
                    <div className="text-gray-500">등록된 그룹이 없습니다.</div>
                )}
            </div>

            {/* 그룹 생성 폼 */}
            <GroupCreationForm
                isOpen={showCreateForm}
                onClose={() => setShowCreateForm(false)}
                onSuccess={handleCreateSuccess}
            />
        </div>
    );
};

// 그룹 아이템 컴포넌트 (개선됨)
type GroupBoardItemProps = {
    onClick: () => void;
    group: Group;
};

const GroupBoardItem: React.FC<GroupBoardItemProps> = ({ onClick, group }) => {
    const navigate = useNavigate();
    const setSelectedGroupSeq = useGroupStore((state) => state.setSelectedGroupSeq);

    const [stats, setStats] = useState({
        departs: 0,
        employees: 0,
        assets: 0,
        loading: true,
    });

    useEffect(() => {
        let isCancelled = false;

        const fetchGroupInfo = async () => {
            if (!group.groupSeq) return;

            try {
                const groupInfo = await getGroupInfo(group.groupSeq);
                if (!isCancelled) {
                    setStats({
                        departs: groupInfo.departs,
                        employees: groupInfo.employees,
                        assets: groupInfo.assets,
                        loading: false,
                    });
                }
            } catch (error) {
                if (!isCancelled) {
                    console.error("Failed to fetch group info:", error);
                    setStats(prev => ({ ...prev, loading: false }));
                }
            }
        };

        fetchGroupInfo();
        return () => { isCancelled = true; };
    }, [group.groupSeq]);

    const handleIndicatorClick = useCallback((
        groupSeq: number | null,
        href: string,
        e: React.MouseEvent<HTMLElement>
    ) => {
        if (!groupSeq) return;

        e.stopPropagation();
        setSelectedGroupSeq(groupSeq);
        navigate(`/${href}`);
    }, [setSelectedGroupSeq, navigate]);

    const formatDate = (date: Date | null) => {
        if (!date) return "날짜 없음";
        return new Date(date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div
            onClick={onClick}
            className="cursor-pointer bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-3 text-gray-900 truncate">
                    {group.groupName}
                </h2>

                <div className="space-y-2 mb-4">
                    <StatItem
                        label="부서 수"
                        value={stats.departs}
                        loading={stats.loading}
                        onClick={(e) => handleIndicatorClick(group.groupSeq, "departs", e)}
                    />
                    <StatItem
                        label="사원 수"
                        value={stats.employees}
                        loading={stats.loading}
                        onClick={(e) => handleIndicatorClick(group.groupSeq, "employees", e)}
                    />
                    <StatItem
                        label="자산 수"
                        value={stats.assets}
                        loading={stats.loading}
                        onClick={(e) => handleIndicatorClick(group.groupSeq, "assets", e)}
                    />
                </div>

                <div className="flex justify-end">
          <span className="bg-gray-100 text-xs text-gray-600 px-2 py-1 rounded-full">
            {formatDate(group.createdDate)}
          </span>
                </div>
            </div>
        </div>
    );
};

// 통계 아이템 컴포넌트
const StatItem: React.FC<{
    label: string;
    value: number;
    loading: boolean;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
}> = ({ label, value, loading, onClick }) => (
    <div
        className="bg-gray-50 hover:bg-gray-100 rounded-md p-2 cursor-pointer transition-colors duration-150"
        onClick={onClick}
    >
    <span className="text-sm text-gray-600">
      {label}: {loading ? "..." : value.toLocaleString()}
    </span>
    </div>
);

export default GroupBoard;