import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AIService {

  constructor(private http: HttpClient) {

  }

  setMove(moveStr: string) {
    return this.http.post<string[]>(environment.endpoint + 'setMove', {
      "moveStr": moveStr,
      "id": "123"
    })
  }
  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max++ - min) + min);
  }
}
