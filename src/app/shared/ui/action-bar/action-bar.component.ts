import { Component, OnInit, Input } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'ns-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit {

  @Input() actionBarTitle: string;
  @Input() canGoBack: string;
  constructor(private router: RouterExtensions) { }

  ngOnInit(): void {
  }

  goBack(){
    this.router.backToPreviousPage();
  }

}
