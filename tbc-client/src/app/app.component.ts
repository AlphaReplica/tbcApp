import { Component } from '@angular/core';
import { Client } from './Servicess/Interfaces/Client';
import { Gender, AccountType, Currency, AccountState } from './Servicess/Enums/Enums';
import { ClientAccount } from './Servicess/Interfaces/ClientAccount';
import { Router } from '@angular/router';
import { AppService } from './Servicess/AppService';
import { ActionEvent } from './Servicess/Interfaces/ActionEvent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent
{
  constructor(private appService:AppService)
  {
  }

  public onActivate(ref)
  {
    ref.onAction.subscribe((e:ActionEvent)=>
    {
      this.appService.onActions(e.type,e.data);
    });
  }
}