import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular/router";
import { MainComponent } from './main/main.component'
import { DailyTasksComponent } from "./daily-tasks/daily-tasks.component";
import { AchievementsComponent } from "./ach/achievements/achievements.component";
import { GreetingModalComponent } from "./greeting-modal/greeting-modal.component";
import { ContactsComponent } from "./contacts/contacts.component";
const routes: Routes = [

    { path: "", component: GreetingModalComponent },
    { path: "main", component: MainComponent },
    {
        path: "tips", loadChildren: () => import('./tips/tips.module').then(m => m.TipsModule)
    },
    { path: "dailyTasks", component: DailyTasksComponent },
    { path: "achievements", component: AchievementsComponent },
    { path: "contacts", component: ContactsComponent },
    // { path: "", redirectTo: "/main", pathMatch: "full" },
];

@NgModule({
    // { enableTracing: true }  - возможность смотреть раутинг
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
