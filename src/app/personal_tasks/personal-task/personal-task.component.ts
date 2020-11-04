import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from '../../_services/databaseservice.service';
import { TextField, Label, Button } from '@nativescript/core/ui'
import { FlexboxLayout } from 'tns-core-modules/ui/layouts';
import { PersonalTask } from '../../_models/personal_task';
import { TasksAndDate } from 'src/app/_models/tasks_and_date';
import { CheckBox } from '@nstudio/nativescript-checkbox';
import { EventData } from 'tns-core-modules/ui/page';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'ns-personal-task',
  templateUrl: './personal-task.component.html',
  styleUrls: ['./personal-task.component.css']
})
export class PersonalTaskComponent implements OnInit {


  @ViewChild('stack', { static: true }) stackRef: ElementRef;
  @ViewChild('saveChangesButton') saveChangesButton: ElementRef;
  constructor(private dbService: DatabaseService) { }


  hasDailyTask: boolean = false;
  hasExistedTasks = false;
  textfields: number = 0;
  showAdd = true;
  currentIDOffset: number = 0;
  selectedDate: Date = new Date();
  dateString: string = '';
  isToday = true;
  currentPersonalTasks: PersonalTask[] = [];
  hasTextChanged = false;
  hasTextChangedObs = new BehaviorSubject<boolean>(false);
  showAddToCurrentTasks = false;
  showAddNewCurrentTasks = false;
  async ngOnInit() {
    this.dateString = this.selectedDate.getUTCFullYear() + '-' + (this.selectedDate.getUTCMonth() + 1) + '-' + (this.selectedDate.getUTCDate() + this.currentIDOffset);
    this.hasDailyTask = <boolean>await this.dbService.isTaskDayCreated();
    if (this.hasDailyTask) {
      let tempArr = <string[]>await this.dbService.hasTasksForCurrentDay();
      if (tempArr !== null) {
        this.hasExistedTasks = true;
        this.showAddToCurrentTasks = true;
        this.fillCurrentPersonalTasks(tempArr);
      }
    }
    else
      console.log('no todays task');
  }

  onCheckboxChecked(args: EventData) {
    let status = args.object.get('checked') === true ? 1 : 0;
    let id = (<string>(args.object.get('id'))).replace("ch", '');
    this.dbService.changeCompleteOnTask(status, id);
    console.log(this.dateString);
  }



  fillPersonalTasks(arr) {
    this.currentPersonalTasks.splice(0);
    if (this.dateString === this.selectedDate.getUTCFullYear() + '-' + (this.selectedDate.getUTCMonth() + 1) + '-' + (this.selectedDate.getUTCDate())) {
      this.fillCurrentPersonalTasks(arr);
      this.showAddToCurrentTasks = true;
    }
    else {
      for (const task of arr) {
        let flex: FlexboxLayout = new FlexboxLayout();
        flex.alignItems = "center";
        let textField = new Label();
        textField.text = task[2];
        if (+task[3] === 1)
          textField.css = "textfield {width: 80%; font-size: 20; text-decoration: line-through}";
        else
          textField.css = "label {width: 80%; font-size: 20}";
        textField.id = task[0];
        let checkBox = new CheckBox();
        checkBox.checked = +task[3] === 1 ? true : false;
        checkBox.isEnabled = false;
        flex.addChild(checkBox);
        flex.addChild(textField);
        (<FlexboxLayout>this.stackRef.nativeElement).addChild(flex);
        this.showAddToCurrentTasks = false;
      }
    }
  }


  fillCurrentPersonalTasks(arr) {
    this.hasTextChanged = false;
    for (const task of arr) {
      this.currentPersonalTasks.push({ id: +task[0], task_id: +task[1], task: task[2], is_complete: +task[3] });
      let flex: FlexboxLayout = new FlexboxLayout();
      flex.justifyContent = "center";
      flex.alignItems = "center";
      let textField = new TextField();
      textField.text = task[2];
      if (+task[3] === 1)
        textField.css = "textfield {width: 80%; font-size: 20; text-decoration: line-through}";
      else
        textField.css = "textfield {width: 80%; font-size: 20}";
      textField.id = task[0];
      textField.on("ontextChange", () => {
        (<Button>(this.saveChangesButton.nativeElement)).visibility = 'visible';
      })
      let checkBox = new CheckBox();
      checkBox.checked = +task[3] === 1 ? true : false;
      checkBox.id = 'ch' + task[0];
      checkBox.on("checkedChange", (args) => {
        let status = args.object.get('checked') === true ? 1 : 0;
        let id = (<string>(args.object.get('id'))).replace("ch", '');
        if (status === 1)
          textField.css = "textfield {width: 80%; font-size: 20; text-decoration: line-through}";
        else {
          textField.css = "textfield {width: 80%; font-size: 20}";
        }
        this.dbService.changeCompleteOnTask(status, id);
      });
      flex.addChild(textField);
      flex.addChild(checkBox);
      (<FlexboxLayout>this.stackRef.nativeElement).addChild(flex);
      console.log('task:', task);
    }
  }


  //создание дня списка - не сам список с пунктами
  onAdd() {
    this.dbService.addPersonalTaskDay(this.dateString);
    this.hasDailyTask = true;
  }


  onDelete() {
    this.dbService.deleteDailyTasks();
  }

  async onAddTask() {
    if (this.hasDailyTask) {
      for (let i = 0; i < (<FlexboxLayout>this.stackRef.nativeElement).getChildrenCount(); i++) {
        let text = ((<FlexboxLayout>this.stackRef.nativeElement).getChildAt(i) as TextField).text;
        if (text !== '')
          this.dbService.addPersonalTaskForCurrentDay(text);
      }
      (<FlexboxLayout>this.stackRef.nativeElement).removeChildren();
      this.showAdd = false;
      this.showAddToCurrentTasks = true;
      this.textfields = 0;
      let tempArr = <string[]>await this.dbService.hasTasksForCurrentDay();
      if (tempArr !== null) {
        this.hasExistedTasks = true;
        this.fillCurrentPersonalTasks(tempArr);
      }
    }
  }


  hasFirst = false;
  async onPrev() {
    console.log('on prev');
    this.isToday = false;
    let tasksAndDate;
    if (!this.hasExistedTasks && !this.hasFirst) {
      console.log('no today task. offset: ', this.currentIDOffset);
      tasksAndDate = (<TasksAndDate>(await this.dbService.getCurrentIDForPersonalTasks(this.currentIDOffset)));
      this.hasFirst = true;
    }
    else if (!this.hasExistedTasks && this.hasFirst) {
      console.log('no today task. hasFirst true. offset: ', this.currentIDOffset);
      this.currentIDOffset--;
      tasksAndDate = (<TasksAndDate>(await this.dbService.getCurrentIDForPersonalTasks(this.currentIDOffset)));
    }
    else {
      console.log('no today task. 3 option. offset: ', this.currentIDOffset);
      this.currentIDOffset--;
      tasksAndDate = (<TasksAndDate>(await this.dbService.getCurrentIDForPersonalTasks(this.currentIDOffset)));
    }
    if (tasksAndDate === undefined) {
      console.log('there is nothing DB I do not do anything!');
      this.isToday = true;
      this.hasFirst = false;
    }
    else if (tasksAndDate !== null) {
      console.log('tasks not null. offset: ', this.currentIDOffset);
      (<FlexboxLayout>this.stackRef.nativeElement).removeChildren();
      this.dateString = tasksAndDate.date;
      this.fillPersonalTasks(tasksAndDate.tasks.slice());
      console.log('____________________________');
    }
    else {
      console.log('no previous tasks exist');
      this.currentIDOffset++;
    }
  }


  async onNext() {
    let tasksAndDate = (<TasksAndDate>(await this.dbService.getCurrentIDForPersonalTasks(this.currentIDOffset + 1)));
    //переходим на текущий день без созданного списка
    if ((tasksAndDate === null || tasksAndDate === undefined) && !this.hasExistedTasks) {
      this.currentIDOffset = 0;
      this.hasFirst = false;
      this.isToday = true;
      (<FlexboxLayout>this.stackRef.nativeElement).removeChildren();
      this.dateString = this.selectedDate.getUTCFullYear() + '-' + (this.selectedDate.getUTCMonth() + 1) + '-' + (this.selectedDate.getUTCDate());
    }
    else if (tasksAndDate === undefined) {
      console.log('there is nothing DB I do not do anything!');
    }
    else if (tasksAndDate !== null) {
      tasksAndDate = (<TasksAndDate>(await this.dbService.getCurrentIDForPersonalTasks(this.currentIDOffset + 1)));
      if (tasksAndDate !== null) {
        this.currentIDOffset++;
        console.log('change in offset after change direction: ', this.currentIDOffset);
        (<FlexboxLayout>this.stackRef.nativeElement).removeChildren();
        this.dateString = tasksAndDate.date;
        this.fillPersonalTasks(tasksAndDate.tasks.slice());
        console.log('____________________________');
      }
      else {
        console.log('no next tasks exist');
      }
    }
  }

  addNewField() {
    const textField = new TextField();
    textField.text = "";
    textField.css = "textfield {width: 80%; font-size: 20}";
    (<FlexboxLayout>this.stackRef.nativeElement).addChild(textField);
    this.textfields++;
  }

  addNewFieldToExistingTask() {
    const textField = new TextField();
    textField.text = "";
    textField.css = "textfield {width: 80%; font-size: 20}";
    textField.id = "new_" + this.textfields++;
    (<FlexboxLayout>this.stackRef.nativeElement).addChild(textField);
    this.showAddNewCurrentTasks = true;
    //flag to show edit button for adding new fields to current day
  }

  onAddNewCurrentTasks() {
    for (let i = 0; i < this.textfields; i++) {
      let text: TextField = (<TextField>(<FlexboxLayout>this.stackRef.nativeElement).getViewById("new_" + i));
      //проверить на пустые строки
      this.dbService.addPersonalTaskForCurrentDay(text.text);
      console.log(text.text, i);
    }
  }

  async onEdit() {
    let tasksForEdit: PersonalTask[] = [];
    //проверка текущей даты
    //собираем массив, отсылаем на сервис, меняем все строки в БД
    for (let i = 0; i < this.currentPersonalTasks.length; i++) {
      let text = (<TextField>(<FlexboxLayout>(<FlexboxLayout>this.stackRef.nativeElement).getChildAt(i)).getChildAt(0)).text
      if (this.currentPersonalTasks[i].task !== text) {
        let taskForEdit: PersonalTask =
        {
          id: this.currentPersonalTasks[i].id,
          task_id: this.currentPersonalTasks[i].task_id,
          task: text,
          is_complete: this.currentPersonalTasks[i].is_complete
        }
        tasksForEdit.push(taskForEdit);
      }
    }
    console.log('task for edit', tasksForEdit);
    let res = <string>await this.dbService.editCurrentTasks(tasksForEdit);
    (<Button>(this.saveChangesButton.nativeElement)).visibility = 'collapse';

    //console.log(res);
  }
}
