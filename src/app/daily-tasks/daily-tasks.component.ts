import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { DatabaseService } from '../_services/databaseservice.service';
import { Task } from '../_models/task'
import { ModalDialogService } from '@nativescript/angular/modal-dialog';
import { DataService } from '../_services/data.service';
import { AchievementModalComponent } from '../ach/achievement-modal/achievement-modal.component';
import { isAndroid } from 'tns-core-modules/platform';
import { Page } from 'tns-core-modules/ui/page';

enum RadioData {
  'Easy',
  'Normal',
  'Difficult'
}


export class RadioOption {
  id: number;
  text: string;
  color: string;
  selected: boolean = false;

  constructor(text: string, color: string, id: number) {
    this.text = text;
    this.color = color;
    this.id = id;
  }
}


@Component({
  selector: 'ns-daily-tasks',
  templateUrl: './daily-tasks.component.html',
  styleUrls: ['./daily-tasks.component.scss']
})
export class DailyTasksComponent implements OnInit {
  dailyTasks: Task[] = [];
  isDifficultySelected = false;
  radioOptions?: Array<RadioOption>;
  selectedDifficulty: RadioData = null;
  isChanged = false;
  constructor(
    private database: DatabaseService,
    private modalDialog: ModalDialogService,
    private vcRef: ViewContainerRef,
    private dataService: DataService,
    private page: Page
  ) { }



  ngOnInit(): void {
    //this.page.actionBarHidden = true;
    if (this.database.checkDB()) {
      let res = this.database.checkTaskStatus();
      if (res === 'tasks_remain') {
        this.isDifficultySelected = true;
        this.database.getCurrentTasks();
      }
      else if (res === 'completed_today') {
        this.isDifficultySelected = true;
      }
      this.database.currentTask.subscribe(data => {
        this.dailyTasks = data;
      });
    }
    console.log(this.dailyTasks);
    this.radioOptions = [
      new RadioOption("Легко - 1 задание", "green", 0),
      new RadioOption("Нормально - 2 задания", "yellow", 1),
      new RadioOption("Сложно - 3 задания!", "red", 2)
    ];
    this.database.achievementObtained.subscribe(ach => {
      if (ach !== null) {
        this.modalDialog
          .showModal(AchievementModalComponent, {
            fullscreen: true,
            viewContainerRef: this.dataService.getRootVCRef()
              ? this.dataService.getRootVCRef()
              : this.vcRef,
            context: ach
          })
      }
    })
  }

  endDay() {
    let res = false;
    this.dailyTasks.forEach((value) => {
      if (value.is_complete === '0') {
        res = false;
      }
      else
        res = true;
    });
    if (res) {
      this.database.completeDailyTasks(this.selectedDifficulty);
      this.dailyTasks = null;
    }
    else {
      console.log("Do not cheat!")
    }
  }

  onPress(index: number) {
    this.database.completeSingleTask(index);
  }

  changeCheckedRadio(radioOption: RadioOption): void {
    radioOption.selected = !radioOption.selected;
    this.selectedDifficulty = radioOption.id;
    if (!radioOption.selected) {
      return;
    }

    // uncheck all other options
    this.radioOptions.forEach(option => {
      if (option.text !== radioOption.text) {
        option.selected = false;
      }
    });
  }

  confirmDifficultySelection() {
    if (this.selectedDifficulty !== null) {
      this.isDifficultySelected = true;
      this.database.getNewTasks(this.selectedDifficulty + 1);
    }
    console.log(RadioData[this.selectedDifficulty])
  }

  canEnableSubmitButton() {
    let res = false;
    for (let value of this.dailyTasks) {
      if (value.is_complete === '1') {
        res = true;
      }
      else {
        res = false;
        break;
      }
    }
    return res;
  }

  onTaskChange(index: number, id: number) {
    this.database.changeTask(index, id);
  }

  getTaskChangeStatus() {
    return this.database.taskStatusChange;
  }

  onLoadedActionBar() {
    if (isAndroid) {
      const androidToolBar = this.page.actionBar.nativeView;
      const backButton = androidToolBar.getNavigationIcon();
      if (backButton) {
        backButton.setColorFilter(android.graphics.Color.parseColor('#171717'), (<any>android.graphics).PorterDuff.Mode.SRC_ATOP);
      }
    }
  }


  test() {
    console.log('test')
  }
}
