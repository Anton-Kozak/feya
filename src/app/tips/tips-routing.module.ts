import { NativeScriptRouterModule } from "@nativescript/angular/router";
import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { TipsListComponent } from './tips-list/tips-list.component';
import { TipsDetailedComponent } from "./tips-detailed/tips-detailed.component";
const routes: Routes = [
    {
        path: '', component: TipsListComponent
    },
    { path: 'tips-detailed/:section', component: TipsDetailedComponent },
    { path: '', redirectTo: '/tips/tips-list', pathMatch: 'full' }
]

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class TipsRoutingModule {

}