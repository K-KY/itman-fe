import {useMemo} from "react";

interface PageIndicatorProps {
    totalPage: number;
    currentPage: number;
    onPageChange?: (page: number) => void;
}

const PageIndicator = ({totalPage, currentPage, onPageChange}: PageIndicatorProps) => {
    const pageSize = 10;
    const currentGroup = Math.floor((currentPage - 1) / pageSize);
    const totalGroup = Math.ceil(totalPage / pageSize);

    const startPage = currentGroup * pageSize + 1;
    const endPage = Math.min(startPage + pageSize - 1, totalPage);

    const pageNumbers = useMemo(() => {
        return Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i);
    }, [startPage, endPage]);

    const goToPage = (page: number) => {
        if (onPageChange) onPageChange(page);
    };

    const goToPrevPage = () => {
        if (currentPage > 1) goToPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPage) goToPage(currentPage + 1);
    };

    const goToPrevGroup = () => {
        const prevGroupStart = Math.max(startPage - pageSize, 1);
        goToPage(prevGroupStart);
    };

    const goToNextGroup = () => {
        const nextGroupStart = startPage + pageSize;
        if (nextGroupStart <= totalPage) goToPage(nextGroupStart);
    };

    return (
        <div className="flex justify-center items-center gap-1 mt-4">
            <button onClick={goToPrevGroup} disabled={currentGroup === 0} className="px-2">&laquo;</button>
            <button onClick={goToPrevPage} disabled={currentPage === 1} className="px-2">&lt;</button>

            {pageNumbers.map((page) => (
                <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-8 h-8 border rounded ${
                        currentPage === page ? 'bg-blue-500 text-white' : ''
                    }`}
                >
                    {page}
                </button>
            ))}

            <button onClick={goToNextPage} disabled={currentPage === totalPage} className="px-2">&gt;</button>
            <button onClick={goToNextGroup} disabled={currentGroup === totalGroup - 1} className="px-2">&raquo;</button>
        </div>
    );
};

export default PageIndicator;
