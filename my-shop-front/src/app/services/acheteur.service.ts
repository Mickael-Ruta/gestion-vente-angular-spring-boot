import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Iacheteur } from '../interfaces/interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AcheteurService {

  constructor(private http : HttpClient) { }

  private readonly URL = environment.apiUrl

  public addAcheteur(acheteur : Iacheteur):Observable<Iacheteur>{
    return this.http.post<Iacheteur>(`${this.URL}/acheteur/create`,acheteur).pipe(
      catchError(this.handleError)
    )
  }

  public getAcheteur():Observable<Iacheteur[]>{
    return this.http.get<Iacheteur[]>(`${this.URL}/acheteur/all`).pipe(
      catchError(this.handleError)
    )
  }

  public getAcheteurById(id:String):Observable<Iacheteur>{
    return this.http.get<Iacheteur>(`${this.URL}/acheteur/one/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  public deleteById(id:String):Observable<boolean>{
    return this.http.delete<boolean>(`${this.URL}/acheteur/delete/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  public updateById(id:String,acheuteur:Iacheteur):Observable<Iacheteur>{
    return this.http.put<Iacheteur>(`${this.URL}/acheteur/update/${id}`,acheuteur).pipe(
      catchError(this.handleError)
    )
  }


  private handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur : ${error.error.message}`;
    } else {
      errorMessage = `Code d'erreur : ${error.status}\nMessage : ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

}
