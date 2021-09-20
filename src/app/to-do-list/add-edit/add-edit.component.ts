import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { ShowComponent } from '../show/show.component';
import { ViewControllerService } from 'src/app/view-controller.service'

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  constructor(private api:SharedService, private viewController: ViewControllerService) { }

  @Input() tasks:any;
  id!: string;
  taskName!: string;
  isCompleted!: boolean;

  ngOnInit(): void {
    this.id = this.tasks.id;
    this.taskName = this.tasks.taskName;
    this.isCompleted = this.tasks.isCompleted;
  }

  addTask() {
    var val = {
      id: this.id,
      taskName: this.taskName,
    }
   
    this.api.addTask(val).subscribe(()=> {
      this.changeToDoList();
    });

    this.viewController.setFormVisible(false);
    this.changeToDoList();
  }
  
  updateTask() {
    var val = {
      id: this.id,
      taskName: this.taskName,
      isCompleted: this.isCompleted
    }

    this.api.updateTask(val).subscribe(()=> {
      this.changeToDoList();
    });

    this.viewController.setFormVisible(false);
    this.changeToDoList();
  }

  changeToDoList() {
    this.api.getTasks().subscribe(data => {
      this.viewController.toDoList = data;
    });
  } 
}
