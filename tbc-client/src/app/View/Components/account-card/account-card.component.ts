import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AccountType, Currency, AccountState } from 'src/app/Servicess/Enums/Enums';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientAccount } from 'src/app/Servicess/Interfaces/ClientAccount';
import { ActionEvent } from 'src/app/Servicess/Interfaces/ActionEvent';

@Component({
  selector: 'account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent
{
  public editable     = false;
  public dataObject   = null;
  public accountTypes = AccountType;
  public currencies   = Currency;
  public states       = AccountState;

  @Output() onAction: EventEmitter<ActionEvent> = new EventEmitter();
  
  @Input()
  set data(val:ClientAccount)
  {
    this.dataObject = val;
    this.accountForm.controls.accountID   .setValue(val.accountID);
    this.accountForm.controls.clientNumber.setValue(val.clientNumber);
    this.accountForm.controls.accountType .setValue(val.accountType);
    this.accountForm.controls.currency    .setValue(val.currency);
    this.accountForm.controls.state       .setValue(val.state);
  }

  @Input()
  set edit(val:boolean)
  {
    this.editable = val;
  }

  public accountForm = new FormGroup(
  {
    accountID   : new FormControl('',[Validators.required,Validators.minLength(4),Validators.pattern('^[0-9]*')]),
    clientNumber: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]*')]),
    accountType : new FormControl(0),
    currency    : new FormControl(0),
    state       : new FormControl(0)
  });

  constructor() { }

  public onSubmit()
  {
    this.onAction.emit({type:'onUpdate',data:{original:this.dataObject,updated:this.accountForm.value}});
  }

  public onEdit()
  {
    this.editable = true;
  }

  public onDelete()
  {
    this.onAction.emit({type:'onDelete',data:this.dataObject});
  }

  public getError(control)
  {
    let fControl = this.accountForm.controls[control];
    if(fControl)
    {
      if(fControl.errors)
      {
        if(fControl.errors.required)
        {
          return 'ველი არაა შევსებული'
        }
        if(fControl.errors.minlength)
        {
          return 'სიმბოლოების რაოდენობა ნაკლებია ' + fControl.errors.minlength.requiredLength + '-ზე';
        }
        if(fControl.errors.maxlength)
        {
          return 'სიმბოლოების რაოდენობა მეტია ' + fControl.errors.maxlength.requiredLength + '-ზე';
        }
        if(fControl.errors.pattern)
        {
          return 'მხოლოდ ციფრებია დასაშვები';
        }
      }
    }
    return '';
  }
}
