import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { BrowserModule } from '@angular/platform-browser';
import { UniversalFieldComponent } from './universal-field/universal-field.component';
import { UniversalDropDownComponent } from './universal-dropdown/universal-dropdown.component';
import { AccountCardComponent } from './account-card/account-card.component';
import { AccountsListComponent } from './accounts-list/accounts-list.component';

@NgModule({
  declarations: 
  [
    UniversalFieldComponent,
    UniversalDropDownComponent,
    AccountCardComponent,
    AccountsListComponent
  ],
  imports:
  [
    TableModule,
    PanelModule,
    ButtonModule,
    InputMaskModule,
    DropdownModule,
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  exports:
  [
    UniversalFieldComponent,
    UniversalDropDownComponent,
    AccountCardComponent,
    AccountsListComponent
  ]
})

export class ComponentsModule { }
