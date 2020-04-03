import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewsModule } from './View/Views/Views.module';
import { ComponentsModule } from './View/Components/Components.module';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './Servicess/AppService';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ViewsModule,
    ComponentsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
