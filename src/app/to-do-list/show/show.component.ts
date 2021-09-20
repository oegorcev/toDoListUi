import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service'
import { ViewControllerService } from 'src/app/view-controller.service'

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  constructor(private api:SharedService, public viewController: ViewControllerService) { }

  toDoList: any=[];
  toDoListWithoutFilter: any=[];

  modalTitle: string | undefined;
  tasks: any;

  ngOnInit(): void {
    this.refreshToDoList();
  }

  editClick(item: any){
    this.tasks={
      id: item.id,
      taskName: item.taskName,
      isCompleted: item.isCompleted
    }

    this.modalTitle = "Edit Task"
    this.showForm();
  }

  addClick() {
    this.tasks={
      id: 0,
      taskName: ""
    }

    this.modalTitle = "Add Task";
    this.showForm();
  }
  
  sortResult(prop: string, asc: boolean) {
    this.toDoList = this.toDoListWithoutFilter.sort(function(a: { [x: string]: number; },b: { [x: string]: number; }) {
      if(asc) {
        return (a[prop]>b[prop]) ? 1 : ((a[prop]<b[prop]) ? -1 : 0);
    } else {
      return (b[prop]>a[prop]) ? 1 : ((b[prop]<a[prop]) ? -1 : 0);
    }  
    });
  }

  deleteClick(item: any) {
    if(confirm("Are you sure?")) {
      this.api.deleteTask(item.id).subscribe(data => {
        this.refreshToDoList();
      });
    }
  }
    
  changeStatus(item: any) {
    if(item.isCompleted == false) {
      item.isCompleted = true;
    } else if (item.isCompleted == true) {
      item.isCompleted = false;
    }

    this.api.updateTask(item).subscribe(data => {
      this.refreshToDoList();
    });
  }

  closeClick() {
    this.hideForm();
    this.refreshToDoList();
  }

  public refreshToDoList(){
    this.api.getTasks().subscribe(data => {
      this.viewController.toDoList = data;
      this.toDoListWithoutFilter = data;
    });
  }

  getForm() {
    return this.viewController.getForm();
  }

  hideForm() {
    this.viewController.setFormVisible(false);
  }

  showForm() {
    this.viewController.setFormVisible(true);
  }

  getToDoList() {
    return this.viewController.toDoList;
  }
}
