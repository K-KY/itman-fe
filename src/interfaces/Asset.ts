// types/dto.ts

// Category DTO
export interface Category {
    categorySeq?: number;   // DB 생성 PK
    categoryName?: string;
    groupSeq?: number;      // ManageGroup FK
    tagColor?: string;      // Hex/RGB
    enabled?: boolean;
    del?: boolean;
    createdDate?: Date;
    updatedDate?: Date;
}

// AssetCategory DTO
export interface AssetCategory {
    assetCategorySeq?: number;  // DB 생성 PK
    category: Category;  // Category 포함
    del?: boolean;
    createdDate?: Date;
    updatedDate?: Date;
}

// Asset DTO
export interface Asset {
    assetSeq?: number|null;                   // DB 생성 PK
    serialNumber?: string;
    assetName?: string;
    imageUrl:string|null;
    groupSeq: number|null;                    // Required
    location?: string;
    acqDate?: string;                    // ISO String 획득일
    enabled?: boolean;
    del?: boolean;
    categories: AssetCategory[]; // 여러 개 가능
    createdDate?: Date;
    updatedDate?: Date;
}

