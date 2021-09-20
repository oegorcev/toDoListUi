import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewControllerService {

  constructor() { }

  private isFormVisible: boolean = false;
  toDoList: any=[];

  getForm() {
    return this.isFormVisible;
  }

  setFormVisible(action: boolean) {
    this.isFormVisible = action;
  }
}
