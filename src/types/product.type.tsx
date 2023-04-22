export interface Product {
  id: number;
  name: string;
  gender: number;
  status: number;
  description: string;
  totalAmount: number;
  available: number;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  brand: object;
  category: object;
  madeIn: object;
  listProductDetail: ProductDetail[];
  listProductImage: ProductImage[];
}

export interface ProductDetail {
  originPrice: number;
  promotionPercentage: number;
  promotionPrice: number;
  status: number;
  color?: ProductColor;
  listSize: ProductSize[];
  listProductImage: ProductImage[];
}

export interface ProductImage {
  id: number;
  image: string;
}

export interface ProductColor {
  id?: number;
  name?: string;
  description?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  updatedBy?: string;
}
export interface ProductSize {
  id: number;
  name: string;
  description: string;
  availAmount: number;
  productDetailId: number;
}
