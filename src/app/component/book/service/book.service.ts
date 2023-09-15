import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BookingInfo } from 'src/app/interface/book';
@Injectable({
  providedIn: 'root',
})
export class BookService {
  getAllCountry() {
    throw new Error('Method not implemented.');
  }
  data = 'http://localhost:3000/posts';
  lend = 'http://localhost:3000/lend';
  nameCountry = 'https://restcountries.com/v3/all';

  constructor(private http: HttpClient) {}

  updateBook(id: number, input: any) {
    return this.http.patch(`${this.data}/${id}`, input);
  }

  getBooks(): Observable<any> {
    return this.http.get(`${this.data}`);
  }

  getBookId(id: number) {
    return this.http.get(`${this.data}/${id}`);
  }

  deleteBook(id: number) {
    return this.http.delete(`${this.data}/${id}`);
  }

  lendBook(input: any): Observable<any> {
    return this.http.post<any>(`${this.lend}`, input);
  }
  postBook(input: any): Observable<any> {
    return this.http.post<any>(`${this.data}`, input);
  }
  getCountry(): Observable<string[]> {
    return this.http
      .get<any[]>(`${this.nameCountry}`)
      .pipe(
        map((countries: any[]) =>
          countries.map((country) => country.name.common)
        )
      );
  }
  getLanguages(): Observable<string[]> {
    return this.http.get<any[]>(`${this.nameCountry}`)
  }
}

