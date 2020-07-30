import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { TipsDetailedComponent } from "./tips-detailed/tips-detailed.component";
import { NativeScriptCommonModule } from "@nativescript/angular/common";
import { TipsListComponent } from './tips-list/tips-list.component';
import { TipsRoutingModule } from './tips-routing.module';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { SharedModule } from "../shared/shared.module";
@NgModule({
    declarations: [TipsListComponent, TipsDetailedComponent],
    imports: [NativeScriptCommonModule, NativeScriptUIListViewModule, TipsRoutingModule, SharedModule],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
})
export class TipsModule {

}