import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule, NativeScriptFormsModule } from "@nativescript/angular";
import { AppRoutingModule } from "./app-routing.module";
import { TNSCheckBoxModule } from '@nstudio/nativescript-checkbox/angular';
import { AppComponent } from "./app.component";
import { MainComponent } from "./main/main.component";
import { DailyTasksComponent } from './daily-tasks/daily-tasks.component';
import { GreetingModalComponent } from './greeting-modal/greeting-modal.component';
import { AchievementsComponent } from './ach/achievements/achievements.component';
import { AchievementModalComponent } from './ach/achievement-modal/achievement-modal.component';
import { SharedModule } from './shared/shared.module';
import { ContactsComponent } from './contacts/contacts.component';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        TNSCheckBoxModule,
        SharedModule,
    ],
    declarations: [
        AppComponent,
        MainComponent,
        DailyTasksComponent,
        GreetingModalComponent,
        AchievementsComponent,
        AchievementModalComponent,
        ContactsComponent,
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
