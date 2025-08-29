import React, { useEffect, useState, useCallback } from "react";
import { useGroupStore } from "../../store/groupStore";
import { getGroupInfo, getGroups, postGroup, type Group } from "../../axios/group";
import { useNavigate } from "react-router-dom";

/**
 * 새로운 그룹 생성을 위한 모달 폼 컴포넌트
 * - 그룹명 입력 및 유효성 검사
 * - 생성 중 상태 관리 및 중복 요청 방지
 */
const GroupCreationForm: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}> = ({ isOpen, onClose, onSuccess }) => {
    const [groupName, setGroupName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 그룹 생성 요청 처리
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

/**
 * 메인 그룹 보드 컴포넌트
 * - 그룹 목록 조회 및 무한 스크롤 구현
 * - 그룹 생성 기능
 * - 각 그룹으로의 네비게이션
 */
const GroupBoard = () => {
    const navigate = useNavigate();
    const setSelectedGroupSeq = useGroupStore((state) => state.setSelectedGroupSeq);

    // 상태 관리
    const [groups, setGroups] = useState<Group[]>([]);
    const [currentPage, setCurrentPage] = useState(1); // page -> currentPage로 명확하게 변경
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false); // 초기화 상태 추가

    /**
     * 그룹 데이터 불러오기 함수
     * @param resetPage - 페이지를 초기화하고 새로 시작할지 여부
     */
    const loadGroups = useCallback(async (resetPage = false) => {
        // 중복 요청 방지 및 더 이상 데이터가 없으면 중단
        if (loading || (!hasMore && !resetPage)) return;

        setLoading(true);
        setError(null);

        const targetPage = resetPage ? 1 : currentPage;

        try {

            const response = await getGroups({
                page: targetPage,
                size: 16,
            });

            console.log('응답 데이터:', response);

            const newItems = response.content;

            if (newItems.length === 0) {
                setHasMore(false);
            } else {
                setGroups(prev => {
                    if (resetPage) {
                        return newItems;
                    }

                    // 중복 제거: 기존 항목과 새 항목의 groupSeq 비교
                    const existingSeqs = new Set(prev.map(g => g.groupSeq));
                    const uniqueNewItems = newItems.filter(g => !existingSeqs.has(g.groupSeq));

                    console.log(`중복 제거: ${newItems.length}개 중 ${uniqueNewItems.length}개가 새 항목`);
                    console.log('기존 항목 수:', prev.length);
                    console.log('새 항목:', uniqueNewItems.map(g => g.groupSeq));

                    return [...prev, ...uniqueNewItems];
                });

                // 다음 페이지 설정 - 상태 업데이트는 별도로 처리
                const nextPage = targetPage + 1;
                console.log(`페이지 업데이트: ${targetPage} → ${nextPage}`);
                setCurrentPage(nextPage);

                // 받아온 데이터가 요청한 크기보다 작으면 더 이상 데이터가 없음
                setHasMore(newItems.length === 16);
                console.log(`hasMore 업데이트: ${newItems.length === 16}`);
            }
        } catch (error) {
            console.error("Failed to load groups", error);
            setError("그룹을 불러오는데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    }, [currentPage, loading, hasMore]);

    // 초기 데이터 로드 (한 번만 실행)
    useEffect(() => {
        if (!isInitialized) {
            setIsInitialized(true);
            loadGroups();
        }
    }, [isInitialized, loadGroups]);

    /**
     * 무한 스크롤 핸들러
     * 스크롤이 바닥에 가까워지면 다음 페이지 데이터를 로드
     */
    const handleScroll = useCallback(() => {
        // 로딩 중이거나 더 이상 데이터가 없으면 중단
        if (loading || !hasMore) {
            return;
        }

        // 스크롤 컨테이너를 동적으로 찾기
        const scrollContainer = document.querySelector('.overflow-y-auto') as HTMLElement;

        if (!scrollContainer) {
            // 스크롤 컨테이너가 없으면 window 스크롤 사용
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;

            // 바닥에서 200px 전에 다음 데이터 로드
            if (scrollTop + clientHeight >= scrollHeight - 200) {
                console.log('데이터 로드!');
                loadGroups();
            }
            return;
        }

        // 스크롤 컨테이너가 있으면 해당 컨테이너 기준으로 계산
        const scrollTop = scrollContainer.scrollTop;
        const scrollHeight = scrollContainer.scrollHeight;
        const clientHeight = scrollContainer.clientHeight;


        // 바닥에서 100px 전에 다음 데이터 로드
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            console.log('데이터 로드!');
            loadGroups();
        }
    }, [loading, hasMore, loadGroups]);

    // 스크롤 이벤트 리스너 등록/해제
    useEffect(() => {

        // 쓰로틀링을 위한 플래그
        let ticking = false;

        const throttledScrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        // 컨테이너와 윈도우 모두에 이벤트 리스너 등록
        const scrollContainer = document.querySelector('.overflow-y-auto') as HTMLElement;

        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', throttledScrollHandler, { passive: true });
        } else {
            window.addEventListener('scroll', throttledScrollHandler, { passive: true });
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', throttledScrollHandler);
            } else {
                window.removeEventListener('scroll', throttledScrollHandler);
            }
        };
    }, [handleScroll]);

    /**
     * 그룹 클릭 시 해당 그룹을 선택하고 메인 페이지로 이동
     */
    const onGroupClick = useCallback((seq: number | null) => {
        if (!seq) return;
        setSelectedGroupSeq(seq);
        navigate("/");
    }, [setSelectedGroupSeq, navigate]);

    /**
     * 그룹 생성 성공 시 목록 새로고침
     */
    const handleCreateSuccess = useCallback(() => {
        setGroups([]);
        setCurrentPage(1);
        setHasMore(true);
        setIsInitialized(false); // 재초기화 트리거
    }, []); // loadGroups 의존성 제거

    return (
        <div className="container mx-auto px-4 py-6">
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

            {/* 에러 메시지 표시 */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                    <button
                        onClick={() => setError(null)}
                        className="ml-2 text-red-800 hover:text-red-900"
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* 그룹 목록 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                {groups.map((group) => (
                    <GroupBoardItem
                        key={`group-${group.groupSeq}`} // key 개선
                        onClick={() => onGroupClick(group.groupSeq)}
                        group={group}
                    />
                ))}
            </div>

            {/* 로딩 및 상태 메시지 */}
            <div className="text-center py-4">
                {loading && (
                    <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                        <span className="text-gray-600">로딩 중...</span>
                    </div>
                )}
                {!hasMore && groups.length > 0 && (
                    <div className="text-gray-500">모든 그룹을 불러왔습니다.</div>
                )}
                {!loading && groups.length === 0 && !isInitialized && (
                    <div className="text-gray-500">등록된 그룹이 없습니다.</div>
                )}
            </div>

            {/* 그룹 생성 모달 폼 */}
            <GroupCreationForm
                isOpen={showCreateForm}
                onClose={() => setShowCreateForm(false)}
                onSuccess={handleCreateSuccess}
            />
        </div>
    );
};

/**
 * 개별 그룹 카드 컴포넌트
 * - 그룹 기본 정보 표시
 * - 그룹 통계 정보 (부서/사원/자산 수) 로드 및 표시
 * - 각 통계 항목 클릭 시 해당 페이지로 네비게이션
 */
type GroupBoardItemProps = {
    onClick: () => void;
    group: Group;
};

const GroupBoardItem: React.FC<GroupBoardItemProps> = ({ onClick, group }) => {
    const navigate = useNavigate();
    const setSelectedGroupSeq = useGroupStore((state) => state.setSelectedGroupSeq);

    // 그룹 통계 정보 상태
    const [stats, setStats] = useState({
        departs: 0,
        employees: 0,
        assets: 0,
        loading: true,
    });

    // 그룹 통계 정보 로드
    useEffect(() => {
        let isCancelled = false; // cleanup을 위한 플래그

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

        // cleanup 함수: 컴포넌트 언마운트 시 요청 취소
        return () => {
            isCancelled = true;
        };
    }, [group.groupSeq]);

    /**
     * 통계 항목 클릭 시 해당 그룹을 선택하고 관련 페이지로 이동
     */
    const handleIndicatorClick = useCallback((
        groupSeq: number | null,
        href: string,
        e: React.MouseEvent<HTMLElement>
    ) => {
        if (!groupSeq) return;

        e.stopPropagation(); // 부모 클릭 이벤트 방지
        setSelectedGroupSeq(groupSeq);
        navigate(`/${href}`);
    }, [setSelectedGroupSeq, navigate]);

    /**
     * 날짜 포맷팅 유틸리티
     */
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
            className="cursor-pointer bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
        >
            <div className="p-4">
                {/* 그룹 이름 */}
                <h2 className="text-lg font-semibold mb-3 text-gray-900 truncate" title={group.groupName}>
                    {group.groupName}
                </h2>

                {/* 통계 정보 */}
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

                {/* 생성 날짜 */}
                <div className="flex justify-end">
                    <span className="bg-gray-100 text-xs text-gray-600 px-2 py-1 rounded-full">
                        {formatDate(group.createdDate)}
                    </span>
                </div>
            </div>
        </div>
    );
};

/**
 * 통계 항목 컴포넌트
 * - 라벨과 값 표시
 * - 로딩 상태 처리
 * - 클릭 이벤트 핸들링
 */
const StatItem: React.FC<{
    label: string;
    value: number;
    loading: boolean;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
}> = ({ label, value, loading, onClick }) => (
    <div
        className="bg-gray-50 hover:bg-gray-100 rounded-md p-2 cursor-pointer transition-colors duration-150 group"
        onClick={onClick}
    >
        <span className="text-sm text-gray-600 group-hover:text-gray-800">
            {label}: {loading ? (
            <span className="inline-flex items-center">
                    <div className="animate-pulse bg-gray-300 h-3 w-8 rounded"></div>
                </span>
        ) : (
            <span className="font-medium">{value.toLocaleString()}</span>
        )}
        </span>
    </div>
);

export default GroupBoard;