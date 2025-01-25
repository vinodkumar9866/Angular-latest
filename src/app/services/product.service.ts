import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';

  constructor(private http: HttpClient) {}

  // Get all Products with observable
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl);
  }

  // // Get single Product by ID
  // getIProduct(id: number): Observable<IProduct> {
  //   return this.http.get<IProduct>(`${this.apiUrl}/${id}`);
  // }

  // // Create new Product
  // createIProduct(IProduct: IProduct): Observable<IProduct> {
  //   return this.http.post<IProduct>(this.apiUrl, IProduct);
  // }

  // // Update Product
  // updateIProduct(id: number, IProduct: IProduct): Observable<IProduct> {
  //   return this.http.put<IProduct>(`${this.apiUrl}/${id}`, IProduct);
  // }

  // // Delete Product
  // deleteIProduct(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
}
