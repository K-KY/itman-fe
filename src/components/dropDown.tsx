import { useState, useEffect, useRef } from "react";
import {type PageRequest } from "../interfaces/PageRequest";

interface Props<T> {
    value?: T | null;
    fetchItems: (pageRequest: PageRequest) => Promise<T[]>;
    onChange: (value: T) => void;
    label?: string;
    displayKey: keyof T;
    keyField: keyof T;
}

export default function InfiniteDropdown<T>({ value, onChange, label, fetchItems, displayKey, keyField }: Props<T> ) {
    const [items, setItems] = useState<T[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const loadItems = async (pageRequest: PageRequest) => {
        if (loading) return;
        setLoading(true);
        try {
            const data = await fetchItems(pageRequest);
            if (!data || data.length === 0) {
                setHasMore(false);
            } else {
                setItems((prev) => {
                    const ids = new Set(prev.map((d) => d[keyField]));
                    const unique = data.filter((d) => !ids.has(d[keyField]));
                    return [...prev, ...unique];
                });
            }
        } catch (e) {
            console.error("데이터 로딩 실패:", e);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (isOpen) {
            loadItems({ page, size: 10 });
        }
    }, [page, isOpen]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        if (!loading && hasMore && target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
            setPage((prev) => prev + 1);
        }
    };

    const toggleDropdown = () => {
        setIsOpen((prev) => {
            const next = !prev;
            if (next) {
                setHasMore(true);
            }
            return next;
        });
    };

    const handleSelect = (item: T) => {
        setIsOpen(false);
        onChange(item);
    };

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
            {label && <label className="w-24 font-bold block mb-1">{label}</label>}
            <div onClick={toggleDropdown} className="w-full border p-2 bg-white text-left cursor-pointer">
                {String(value ? value[displayKey] : "선택하세요")}
            </div>

            {isOpen && (
                <div className="absolute w-full border max-h-60 overflow-y-auto
                bg-white z-10 shadow" onScroll={handleScroll}>
                    {items.map((item) => (
                        <div
                            key={String(item[keyField])}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelect(item)}
                        >
                            {String(item[displayKey])}
                        </div>
                    ))}
                    {loading && <div className="p-2 text-center">로딩 중...</div>}
                    {!hasMore && !loading && items.length === 0 && (
                        <div className="p-2 text-center text-gray-400">데이터가 없습니다.</div>
                    )}
                </div>
            )}
        </div>
    );
}
