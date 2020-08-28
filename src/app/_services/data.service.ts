import { Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';


var Sqlite = require("nativescript-sqlite");

@Injectable({
  providedIn: 'root'
})
export class DataService {

  tips = new Subject<string[]>();
  private _rootVCRef: ViewContainerRef;

  constructor() { }


  public getdbConnection() {
    return new Sqlite('tasks');
  }


  getTips(section: string) {
    let tips: string[] = [];
    this.getdbConnection().then(db => {
      db.all("select * from tips where section = ?", [section]).then((rows) => {
        rows.forEach((tip) => {
          tips.push(tip[1]);
        });
      });
      this.tips.next(tips);
    });
  }
  setRootVCRef(vcRef: ViewContainerRef) {
    this._rootVCRef = vcRef;
  }

  getRootVCRef() {
    return this._rootVCRef;
  }


}
