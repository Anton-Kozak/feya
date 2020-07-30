import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular/modal-dialog';
import { Achievement } from 'src/app/_models/achievement';

@Component({
  selector: 'ns-achievement-modal',
  templateUrl: './achievement-modal.component.html',
  styleUrls: ['./achievement-modal.component.scss']
})
export class AchievementModalComponent implements OnInit {

  achievementTitle: Achievement;

  constructor(private modalParams: ModalDialogParams) { }

  ngOnInit(): void {
    this.achievementTitle = this.modalParams.context;
    console.log('This is achievement', this.modalParams.context as Achievement);
  }
  close() {
    this.modalParams.closeCallback();
  }
}
