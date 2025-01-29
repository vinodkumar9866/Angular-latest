export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string; // ISO date string
  updatedAt: string; // ISO date string
  category: ICategory;
}

export interface ICategory {
  id: number;
  name: string;
  image: string;
  creationAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface IAddProduct {
  title: string;
  description: string;
  price: number;
  categoryId: number;
  images: string[];
}
