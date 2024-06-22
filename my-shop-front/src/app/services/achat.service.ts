import { IachatTotal } from './../interfaces/interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AchatService {

  constructor(private http : HttpClient) { }

  private readonly URL = environment.apiUrl

  public doAchat(achat :any):Observable<boolean>{
    return this.http.post<boolean>(`${this.URL}/achat/create`,achat)
  }

  public getRevenu():Observable<IachatTotal>{
    return this.http.get<IachatTotal>(`${this.URL}/achat/achatnow`)
  }

  public getEvolutionAchat():Observable<IachatTotal[]>{
    return this.http.get<IachatTotal[]>(`${this.URL}/achat/evolutionAchat`)
  }
}

