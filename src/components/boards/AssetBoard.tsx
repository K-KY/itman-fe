import {useEffect, useRef, useState} from "react";
import {countAll} from "../../axios/emplyee.ts"
import type {PageRequest} from "../../interfaces/PageRequest.ts";
import {useSearchParams} from "react-router-dom";
import PageIndicator from "./pageIndicator.tsx";
import {useGroupStore} from "../../store/groupStore.ts";
import {getAssets, postAsset} from "../../axios/asset.ts";
import type {Asset, AssetCategory} from "../../interfaces/Asset.ts";
import AssetItem from "./AssetItem.tsx";

const AssetBoard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const selectedGroup = useGroupStore(state => state.selectedGroupSeq);

    const headers = ["자산", "분류", "장소", "획득일", "사용여부", "상태", "사용자"]
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

    getAssets(pageRequest, selectedGroup).then(res => {
        console.log(res);
    });

    const [assets, setAssets] = useState<Asset[]>([])

    const goToPage = (index: number) => {
        setPageRequest({page: index, size: 10,});
        setSearchParams({page: String(index)});
    }

    const getPages = (pageRequest: PageRequest) => {
        return getAssets(pageRequest, selectedGroup)
            .then(data => {
                setAssets(data.content);
                setTotalPage(data.totalPages);
            })
            .catch(() => {
                setLoading(true);
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

    const handleAddAsset = (assetData:Asset) => {
        console.log('새 자산 데이터:', assetData);
        // 여기서 실제 API 호출이나 상태 업데이트를 수행
        postAsset(assetData);
        alert('자산이 추가되었습니다!');
        setIsModalOpen(false);
    };


    if (loading) {
        return <div className="p-4">로딩 중입니다...</div>
    }

    return <div className={"m-4"}>
        <div className={"grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-2"}>
            <div className={"rounded-lg border"}>
                <div className={"p-6 flex flex-row items-center justify-between space-y-0 pb-2"}>
                    <h3 className={"tracking-tight text-sm font-medium"}></h3>
                </div>
                <div className={"p-6 pt-0"}>
                    <div className={"text-2xl font-bold"}></div>
                    <p className={"text-xs text"}></p>
                </div>
            </div>
            <div className={"rounded-lg border"}>
                <div className={"p-6 flex flex-row items-center justify-between space-y-0 pb-2"}>
                    <h3 className={"tracking-tight text-sm font-medium"}></h3>
                </div>
                <div className={"p-6 pt-0"}>
                    <div className={"text-2xl font-bold"}></div>
                    <p className={"text-xs text"}></p>
                </div>
            </div>
            <div className={"rounded-lg border"}>
                <div className={"p-6 flex flex-row items-center justify-between space-y-0 pb-2"}>
                    <h3 className={"tracking-tight text-sm font-medium"}></h3>
                </div>
                <div className={"p-6 pt-0"}>
                    <div className={"text-2xl font-bold"}></div>
                    <p className={"text-xs text"}></p>
                </div>
            </div>
            <div className={"rounded-lg border"}>
                <div className={"p-6 flex flex-row items-center justify-between space-y-0 pb-2"}>
                    <h3 className={"tracking-tight text-sm font-medium"}></h3>
                </div>
                <div className={"p-6 pt-0"}>
                    <div className={"text-2xl font-bold"}></div>
                    <p className={"text-xs text"}></p>
                </div>
            </div>
        </div>

        <div className="rounded-lg border  m-3">
            <div className="flex flex-col space-y-1.5 p-6"><h3 className="font-semibold tracking-tight text-lg">
                검색 및 필터</h3></div>
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
                                placeholder="..."
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
                onClick={() => setIsModalOpen(true)}
            >
                자산 추가
            </a>
        </div>



        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 pt-0">
                <div className="overflow-x-auto">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&amp;_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                {tableHeader.current.map(item =>
                                    <th key={item}
                                    className="h-12 px-4 text-left align-middle font-medium text-muted-foreground
                                        [&:has([role=checkbox])]:pr-0">
                                    {item}
                                </th>)}
                            </tr>
                            </thead>
                            <tbody className="[&amp;_tr:last-child]:border-0">

                            {assets.map((item: Asset) => (
                                <AssetItem key={item.assetSeq} item={item}/>
                            ))}

                            </tbody>
                        </table>
                        <PageIndicator totalPage={totalPage} currentPage={currentPage} onPageChange={goToPage}></PageIndicator>

                    </div>
                </div>
            </div>
        </div>
        <AddAssetModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddAsset}
        />
    </div>
}

import { X, Upload } from 'lucide-react';

// 임시 카테고리 데이터 (실제로는 props나 API에서 받아와야 함)

interface AssetItemProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (asset: Asset) => void;
}

interface FormData {
    assetSeq: number|null;
    groupSeq: number|null; // 필수 추가
    assetName: string;
    serialNumber: string;
    location: string;
    acqDate: string;
    enabled: boolean;
    imageUrl: string | ArrayBuffer | null;
    categories: AssetCategory[];
}


const AddAssetModal = ({ isOpen, onClose, onSubmit } : AssetItemProps) => {
    const selectedGroup = useGroupStore(state => state.selectedGroupSeq);

    console.log(selectedGroup);
    const [formData, setFormData] = useState<FormData>({
        assetSeq:null,
        groupSeq:selectedGroup,
        assetName: '',
        serialNumber: '',
        location: '',
        acqDate: '',
        enabled: true,
        imageUrl: '',
        categories: []
    });

    console.log(formData);

    const mockCategories = [
        { assetCategorySeq: 1, category: { categorySeq: 1 ,categoryName: 'IT장비', tagColor: '#3b82f6' } },
        { assetCategorySeq: 2, category: { categorySeq: 2 ,categoryName: '가구', tagColor: '#10b981' } },
        { assetCategorySeq: 3, category: { categorySeq: 7 ,categoryName: '차량', tagColor: '#f59e0b' } },
        { assetCategorySeq: 4, category: { categorySeq: 8 ,categoryName: '사무용품', tagColor: '#8b5cf6' } },
        { assetCategorySeq: 5, category: { categorySeq: 11 ,categoryName: '전자제품', tagColor: '#ef4444' } },
        { assetCategorySeq: 3, category: { categorySeq: 7 ,categoryName: '차량', tagColor: '#f59e0b' } },
        { assetCategorySeq: 4, category: { categorySeq: 8 ,categoryName: '사무용품', tagColor: '#8b5cf6' } },
        { assetCategorySeq: 5, category: { categorySeq: 11 ,categoryName: '전자제품', tagColor: '#ef4444' } },
        { assetCategorySeq: 3, category: { categorySeq: 7 ,categoryName: '차량', tagColor: '#f59e0b' } },
        { assetCategorySeq: 4, category: { categorySeq: 8 ,categoryName: '사무용품', tagColor: '#8b5cf6' } },
        { assetCategorySeq: 5, category: { categorySeq: 11 ,categoryName: '전자제품', tagColor: '#ef4444' } },
        { assetCategorySeq: 3, category: { categorySeq: 7 ,categoryName: '차량', tagColor: '#f59e0b' } },
        { assetCategorySeq: 4, category: { categorySeq: 8 ,categoryName: '사무용품', tagColor: '#8b5cf6' } },
        { assetCategorySeq: 5, category: { categorySeq: 11 ,categoryName: '전자제품', tagColor: '#ef4444' } },
        { assetCategorySeq: 3, category: { categorySeq: 7 ,categoryName: '차량', tagColor: '#f59e0b' } },
        { assetCategorySeq: 4, category: { categorySeq: 8 ,categoryName: '사무용품', tagColor: '#8b5cf6' } },
        { assetCategorySeq: 5, category: { categorySeq: 11 ,categoryName: '전자제품', tagColor: '#ef4444' } },
        { assetCategorySeq: 3, category: { categorySeq: 7 ,categoryName: '차량', tagColor: '#f59e0b' } },
        { assetCategorySeq: 4, category: { categorySeq: 8 ,categoryName: '사무용품', tagColor: '#8b5cf6' } },
        { assetCategorySeq: 5, category: { categorySeq: 11 ,categoryName: '전자제품', tagColor: '#ef4444' } },
        { assetCategorySeq: 3, category: { categorySeq: 7 ,categoryName: '차량', tagColor: '#f59e0b' } },
        { assetCategorySeq: 4, category: { categorySeq: 8 ,categoryName: '사무용품', tagColor: '#8b5cf6' } },
        { assetCategorySeq: 5, category: { categorySeq: 11 ,categoryName: '전자제품', tagColor: '#ef4444' } },
        { assetCategorySeq: 3, category: { categorySeq: 7 ,categoryName: '차량', tagColor: '#f59e0b' } },
        { assetCategorySeq: 4, category: { categorySeq: 8 ,categoryName: '사무용품', tagColor: '#8b5cf6' } },
        { assetCategorySeq: 5, category: { categorySeq: 11 ,categoryName: '전자제품', tagColor: '#ef4444' } },
        { assetCategorySeq: 3, category: { categorySeq: 7 ,categoryName: '차량', tagColor: '#f59e0b' } },
        { assetCategorySeq: 4, category: { categorySeq: 8 ,categoryName: '사무용품', tagColor: '#8b5cf6' } },
        { assetCategorySeq: 5, category: { categorySeq: 11 ,categoryName: '전자제품', tagColor: '#ef4444' } },
        { assetCategorySeq: 3, category: { categorySeq: 7 ,categoryName: '차량', tagColor: '#f59e0b' } },
        { assetCategorySeq: 4, category: { categorySeq: 8 ,categoryName: '사무용품', tagColor: '#8b5cf6' } },
        { assetCategorySeq: 5, category: { categorySeq: 11 ,categoryName: '전자제품', tagColor: '#ef4444' } },
        { assetCategorySeq: 3, category: { categorySeq: 7 ,categoryName: '차량', tagColor: '#f59e0b' } },
        { assetCategorySeq: 4, category: { categorySeq: 8 ,categoryName: '사무용품', tagColor: '#8b5cf6' } },
        { assetCategorySeq: 5, category: { categorySeq: 11 ,categoryName: '전자제품', tagColor: '#ef4444' } },
        { assetCategorySeq: 3, category: { categorySeq: 7 ,categoryName: '차량', tagColor: '#f59e0b' } },
        { assetCategorySeq: 4, category: { categorySeq: 8 ,categoryName: '사무용품', tagColor: '#8b5cf6' } },
        { assetCategorySeq: 5, category: { categorySeq: 11 ,categoryName: '전자제품', tagColor: '#ef4444' } },
    ];


    const [selectedImage, setSelectedImage] = useState<File|null>(null);
    const [previewUrl, setPreviewUrl] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target;
        const name = target.name;

        let value: string | boolean;
        if (target.type === "checkbox" && "checked" in target) {
            value = target.checked;
        } else {
            value = target.value;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     const { name, value, type, checked } = e.target;
    //     setFormData(prev => ({
    //         ...prev,
    //         [name]: type === 'checkbox' ? checked : value
    //     }));
    // };
    //
    const handleCategoryToggle = (category:AssetCategory) => {
        setFormData(prev => {
            const isSelected = prev.categories.some(c => c.assetCategorySeq === category.assetCategorySeq);
            if (isSelected) {
                return {
                    ...prev,
                    categories: prev.categories.filter(c => c.assetCategorySeq !== category.assetCategorySeq)
                };
            } else {
                return {
                    ...prev,
                    categories: [...prev.categories, category]
                };
            }
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedImage(file);

        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result; // string | ArrayBuffer | null
            setPreviewUrl(result as string); // 미리보기는 문자열로 단언
            setFormData(prev => ({
                ...prev,
                imageUrl: result as string // FormData 타입과 호환
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = () => {
        if (!formData.assetName || !formData.location || !formData.acqDate) {
            alert('필수 항목을 모두 입력해주세요.');
            return;
        }
        onSubmit(formData);
        // 폼 리셋
        setFormData({
            assetSeq:null,
            groupSeq:selectedGroup,
            assetName: '',
            serialNumber: '',
            location: '',
            acqDate: '',
            enabled: true,
            imageUrl: '',
            categories: []
        });
        setSelectedImage(null);
        setPreviewUrl('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* 헤더 */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">새 자산 추가</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* 폼 내용 */}
                <div className="p-6 space-y-6">
                    {/* 이미지 업로드 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            자산 이미지
                        </label>
                        <div className="flex items-center gap-4">
                            <div className="h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                                {previewUrl ? (
                                    <img
                                        src={previewUrl}
                                        alt="미리보기"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <Upload className="h-8 w-8 text-gray-400" />
                                )}
                            </div>
                            <div>
                                <input
                                    type="file"
                                    id="image-upload"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    <Upload className="h-4 w-4 mr-2" />
                                    이미지 선택
                                </label>
                                <p className="text-xs text-gray-500 mt-1">JPG, PNG 파일 지원</p>
                            </div>
                        </div>
                    </div>

                    {/* 자산명 */}
                    <div>
                        <label htmlFor="assetName" className="block text-sm font-medium text-gray-700 mb-2">
                            자산명 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="assetName"
                            name="assetName"
                            value={formData.assetName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="자산명을 입력하세요"
                        />
                    </div>

                    {/* 시리얼 번호 */}
                    <div>
                        <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700 mb-2">
                            시리얼 번호
                        </label>
                        <input
                            type="text"
                            id="serialNumber"
                            name="serialNumber"
                            value={formData.serialNumber}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="시리얼 번호를 입력하세요"
                        />
                    </div>

                    {/* 위치 */}
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                            위치 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="자산 위치를 입력하세요"
                        />
                    </div>

                    {/* 취득일 */}
                    <div>
                        <label htmlFor="acqDate" className="block text-sm font-medium text-gray-700 mb-2">
                            취득일 <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                id="acqDate"
                                name="acqDate"
                                value={formData.acqDate}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* 카테고리 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            카테고리
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {mockCategories.map((category) => {
                                const isSelected = formData.categories.some(c => c.assetCategorySeq === category.assetCategorySeq);
                                return (
                                    <button
                                        key={category.assetCategorySeq}
                                        type="button"
                                        onClick={() => handleCategoryToggle(category)}
                                        className={`inline-block px-3 py-1.5 text-sm font-medium rounded-md border transition-all ${
                                            isSelected
                                                ? 'text-white border-transparent'
                                                : 'text-gray-600 border-gray-300 bg-white hover:bg-gray-50'
                                        }`}
                                        style={isSelected ? { backgroundColor: category.category.tagColor } : {}}
                                    >
                                        {category.category.categoryName}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 사용 여부 */}
                    <div>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="enabled"
                                checked={formData.enabled}
                                onChange={handleInputChange}
                                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                            <span className="text-sm font-medium text-gray-700">사용 중</span>
                        </label>
                    </div>

                    {/* 버튼 */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            취소
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            자산 추가
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssetBoard;

