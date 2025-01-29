import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IAddProduct, IProduct } from '../interfaces/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';
  private uploadApiUrl = 'https://api.escuelajs.co/api/v1/files/upload';
  private addProductApiUrl = 'https://api.escuelajs.co/api/v1/products/';
  private deleteProductApiUrl = (id: number) =>
    `https://api.escuelajs.co/api/v1/products/${id}`;
  private updateProductApiUrl = (id: number) =>
    `https://api.escuelajs.co/api/v1/products/${id}`;

  // BehaviorSubject to notify product updates
  private productsUpdated = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient) {}

  // Get all Products with observable
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl);
  }

  addProduct(product: IAddProduct): Observable<any> {
    return this.http.post<IAddProduct>(this.addProductApiUrl, product).pipe(
      tap(() => this.productsUpdated.next()) // Notify subscribers
    );
  }

  // Delete Product
  deleteProduct(id: number): Observable<void> {
    return this.http
      .delete<void>(this.deleteProductApiUrl(id))
      .pipe(tap(() => this.productsUpdated.next()));
  }

  // Update Product
  updateProduct(id: number, product: any): Observable<IProduct> {
    return this.http
      .put<IProduct>(this.updateProductApiUrl(id), product)
      .pipe(tap(() => this.productsUpdated.next()));
  }

  // Upload file to the API
  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders().set('enctype', 'multipart/form-data');

    return this.http.post<any>(this.uploadApiUrl, formData, { headers });
  }

  // Expose the BehaviorSubject as an observable
  onProductsUpdated(): Observable<void> {
    return this.productsUpdated.asObservable();
  }

  // // Get single Product by ID
  // getIProduct(id: number): Observable<IProduct> {
  //   return this.http.get<IProduct>(`${this.apiUrl}/${id}`);
  // }

  // // Create new Product
  // createIProduct(IProduct: IProduct): Observable<IProduct> {
  //   return this.http.post<IProduct>(this.apiUrl, IProduct);
  // }
}
