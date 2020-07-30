import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "./_services/databaseservice.service"



@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
    constructor(database: DatabaseService) {
        database.createDataBase();
    }
    ngOnInit(): void {

    }



}


