import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { ClientViewComponent } from './client-view/client-view.component';
import { ComponentsModule } from '../Components/Components.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations:
  [
    ClientsListComponent,
    ClientViewComponent
  ],
  imports:
  [
    TableModule,
    ButtonModule,
    ScrollingModule,
    PanelModule,
    ComponentsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:
  [
    ClientsListComponent,
    ClientViewComponent
  ]
})

export class ViewsModule { }
