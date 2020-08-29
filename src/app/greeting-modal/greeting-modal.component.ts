import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page, isAndroid } from "tns-core-modules/ui/page";
import { AndroidApplication, AndroidActivityBackPressedEventData } from 'tns-core-modules/application';
import { exit } from 'nativescript-exit';
import * as application from "tns-core-modules/application";
@Component({
  selector: 'ns-greeting-modal',
  templateUrl: './greeting-modal.component.html',
  styleUrls: ['./greeting-modal.component.scss'],
  moduleId: module.id
})
export class GreetingModalComponent implements OnInit {

  motivationImage: string = null;

  constructor(private router: Router, private page: Page) { }

  ngOnInit(): void {
    if (!isAndroid) {
      return;
    }
    application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
      if (this.router.isActive("", true)) {
        data.cancel = true;
        exit();
      }
    });
    this.page.actionBarHidden = true;
    this.motivationImage = Math.floor(Math.random() * (41 - 1 + 1) + 1).toString();
    console.log(this.motivationImage);
    if (this.motivationImage <= '0' || this.motivationImage > '41')
      this.motivationImage = '1';
  }

  close() {
    this.router.navigate(['/main']);
  }

}
