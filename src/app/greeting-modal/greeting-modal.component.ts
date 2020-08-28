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

  motivationImage: string = null;

  //private modalParams: ModalDialogParams
  constructor(private data: DataService, private router: Router) { }

  ngOnInit(): void {
    this.motivationImage = Math.floor(Math.random() * (41 - 1 + 1) + 1).toString();
    console.log(this.motivationImage);
    if (this.motivationImage <= '0' || this.motivationImage > '41')
      this.motivationImage = '1';
  }

  close() {
    this.router.navigate(['/main']);
  }

}
