import { useState, useEffect, useRef } from "react";
import { type Depart, get, type PageRequest } from "../axios/depart.ts";

interface Props {
    value: Depart | null;
    onChange: (value: Depart) => void;
    label?: string;
}

export default function InfiniteDropdown({ value, onChange, label }: Props) {
    const [departs, setDeparts] = useState<Depart[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const fetchItems = async (pageRequest: PageRequest) => {
        if (loading) return;
        setLoading(true);
        try {
            const res = await get(pageRequest);
            const data = res.content;

            if (!data || data.length === 0) {
                setHasMore(false);
            } else {
                setDeparts((prev) => {
                    const ids = new Set(prev.map((d) => d.departSeq));
                    const unique = data.filter((d) => !ids.has(d.departSeq));
                    return [...prev, ...unique];
                });
            }
        } catch (e) {
            console.error("데이터 로딩 실패:", e);
        }
        setLoading(false);
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        if (!loading && hasMore && target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
            setPage((prev) => prev + 1);
        }
    };

    // 페이지 바뀔 때마다 fetch
    useEffect(() => {
        if (isOpen) {
            fetchItems({ page, size: 10 });
        }
    }, [page, isOpen]);

    // 드롭다운 열릴 때 초기화
    const toggleDropdown = () => {
        setIsOpen((prev) => {
            const next = !prev;
            if (next) {
                // 초기화
                setHasMore(true);
            }
            return next;
        });
    };

    const handleSelect = (item: Depart) => {
        setIsOpen(false);
        onChange(item);
    };

    // 외부 클릭시 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-64" ref={dropdownRef}>
            {label && <label className="block mb-1">{label}</label>}
            <div
                onClick={toggleDropdown}
                className="w-full border p-2 bg-white text-left cursor-pointer"
            >
                {value ? value.departName : "부서를 선택하세요"}
            </div>

            {isOpen && (
                <div
                    className="absolute w-full border max-h-60 overflow-y-auto bg-white z-10 shadow"
                    onScroll={handleScroll}
                >
                    {departs.map((item) => (
                        <div
                            key={item.departSeq}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelect(item)}
                        >
                            {item.departName}
                        </div>
                    ))}
                    {loading && <div className="p-2 text-center">로딩 중...</div>}
                    {!hasMore && !loading && departs.length === 0 && (
                        <div className="p-2 text-center text-gray-400">부서가 없습니다.</div>
                    )}
                </div>
            )}
        </div>
    );
}
