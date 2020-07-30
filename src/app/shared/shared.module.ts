import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActionBarComponent } from "./ui/action-bar/action-bar.component";
import { NativeScriptRouterModule, NativeScriptCommonModule } from '@nativescript/angular';
@NgModule({
    declarations: [ActionBarComponent],
    exports: [ActionBarComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [NativeScriptRouterModule, NativeScriptCommonModule]
})
export class SharedModule { }