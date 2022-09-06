import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AIService {

  constructor(private http: HttpClient) {

  }

  setMove() {
    this.http.post<string[]>(environment.endpoint + 'setMove', {
      "moveStr": "g0e2",
      "id": "123"
    }).subscribe(e => {

    })
  }

}
