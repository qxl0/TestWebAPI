import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material';


import { AppComponent } from './app.component';
import { ScmEnvComponent } from './scm-env/scm-env.component';
import { EnvironmentService } from 'src/service/environment.service';
import { ApiService } from 'src/service/api.service';
import { NgxJsonViewerModule } from 'ngx-json-viewer';



@NgModule({
  declarations: [
    AppComponent,
    ScmEnvComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    MatRadioModule,
    NgxJsonViewerModule
  ],
  providers: [
    EnvironmentService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
