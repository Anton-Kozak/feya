import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../_services/databaseservice.service';
import { exit } from 'nativescript-exit';
import * as application from "tns-core-modules/application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules/application";
import { isAndroid } from "tns-core-modules/platform";
import { Router } from '@angular/router';
@Component({
  selector: 'ns-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private database: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    if (!isAndroid) {
      return;
    }
    application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
      if (this.router.isActive("/main", false)) {
        data.cancel = true; // prevents default back button behavior
        console.log('I am active main');
        exit();
      }
    });
  }


  showAllTasks() {
    this.database.showAllTasks();
  }

  resetTasks() {
    this.database.resetTasks();
  }

  completeAllTasks(){
    this.database.completeAllTasks();
  }

}
