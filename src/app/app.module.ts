import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ComputationService } from './computation.service';
import { CoreService } from './core.service';


@NgModule({
  imports:      [ BrowserModule, FormsModule, NgbModule,  ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ComputationService, CoreService]
})
export class AppModule { }
