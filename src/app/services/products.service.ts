import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { ProductResponse } from '../models/product-response';
import { ProductUpdateRequest } from '../models/product-update-request';
import { NewProductRequest } from '../models/new-product-request';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl: string = environment.productsMicroserviceUrl;
  public isAuthenticated: boolean = false;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(`${this.baseUrl}`);
  }

  searchProducts(searchString: string): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(
      `${this.baseUrl}search/${searchString}`
    );
  }

  getProductByProductID(productID: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(
      `${this.baseUrl}search/product-id/${productID}`
    );
  }

  updateProduct(
    productUpdateRequest: ProductUpdateRequest
  ): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(
      `${this.baseUrl}`,
      productUpdateRequest
    );
  }

  deleteProduct(productID: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}${productID}`);
  }

  createProduct(
    newProductRequest: NewProductRequest
  ): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(
      `${this.baseUrl}`,
      newProductRequest
    );
  }
}
