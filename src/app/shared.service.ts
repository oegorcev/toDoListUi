import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl="https://localhost:44323/api/";

  constructor(private http:HttpClient) { }

  getTasks():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'todoitems');
  }

  addTask(val:any){
    //alert(JSON.stringify(val, null, 4));
    return this.http.post<any>(this.APIUrl+'todoitems', val);
  }

  updateTask(val:any){
    //alert(JSON.stringify(val, null, 4));
    return this.http.put<any>(this.APIUrl+'todoitems', val);
  }

  deleteTask(val:any){
    //alert(JSON.stringify(val, null, 4));
    return this.http.delete<any>(this.APIUrl+'todoitems/' + val);
  }
}
