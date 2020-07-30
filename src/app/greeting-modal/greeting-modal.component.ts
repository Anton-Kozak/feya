import { Component, OnInit } from '@angular/core';
// import { ModalDialogParams } from '@nativescript/angular/modal-dialog';
import { DataService } from '../_services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'ns-greeting-modal',
  templateUrl: './greeting-modal.component.html',
  styleUrls: ['./greeting-modal.component.scss'],
  moduleId: module.id
})
export class GreetingModalComponent implements OnInit {

  greetingText: string = '';

//private modalParams: ModalDialogParams
  constructor(private data: DataService, private router: Router) { }

  ngOnInit(): void {
    this.greetingText = this.data.greetingTips[Math.floor(Math.random() * this.data.greetingTips.length)];
  }

  close() {
    this.router.navigate(['/main']);
  }

}
