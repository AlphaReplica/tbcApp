import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Gender, AccountType, Currency, AccountState } from 'src/app/Servicess/Enums/Enums';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Client } from 'src/app/Servicess/Interfaces/Client';
import { ClientAccount } from 'src/app/Servicess/Interfaces/ClientAccount';
import { ActivatedRoute } from '@angular/router';
import { ActionEvent } from 'src/app/Servicess/Interfaces/ActionEvent';

@Component({
  selector: 'client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss']
})
export class ClientViewComponent implements OnInit 
{
  public editable      = false;
  public clientID      = 0;
  public genderOptions = Gender;
  public accounts:Array<ClientAccount>;

  @Output() onAction: EventEmitter<ActionEvent> = new EventEmitter();
  
  set data(val:Client)
  {
    this.clientID = val.clientID;
    this.clientForm.controls.clientID  .setValue(val.clientID);
    this.clientForm.controls.firstName .setValue(val.firstName);
    this.clientForm.controls.lastName  .setValue(val.lastName);
    this.clientForm.controls.gender    .setValue(val.gender);
    this.clientForm.controls.personalID.setValue(val.personID);
    this.clientForm.controls.phone     .setValue(val.phone);

    this.clientForm.controls.legalAddress ['controls'].country.setValue(val.registeredCountry);
    this.clientForm.controls.legalAddress ['controls'].city   .setValue(val.registeredCity);
    this.clientForm.controls.legalAddress ['controls'].address.setValue(val.registeredAdress);
    this.clientForm.controls.actualAddress['controls'].country.setValue(val.actualCountry);
    this.clientForm.controls.actualAddress['controls'].city   .setValue(val.actualCity);
    this.clientForm.controls.actualAddress['controls'].address.setValue(val.actualAdress);

    this.accounts = val.accounts;
  }

  get hasAccounts():boolean
  {
    if(this.accounts)
    {
      return this.accounts.length>0;
    }
    return false;
  }

  get hasEmptyAccounts():boolean
  {
    if(this.accounts)
    {
      for(let num = 0; num < this.accounts.length; num++)
      {
        if(this.accounts[num].accountID == 0)
        {
          return true;
        }
      }
    }
    return false;
  }
  
  public clientForm = new FormGroup(
  {
    clientID    : new FormControl(''),
    firstName   : new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(50),Validators.pattern('[აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ]*')]),
    lastName    : new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(50),Validators.pattern('[აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ]*')]),
    gender      : new FormControl(0),
    personalID  : new FormControl(0,[Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern('^[0-9]*')]),
    phone       : new FormControl(0,[Validators.required,Validators.minLength(9),Validators.maxLength(9),Validators.pattern('^5[0-9]*')]),
    legalAddress: new FormGroup(
    {
      country: new FormControl('',[Validators.required,Validators.pattern('^[A-Za-zაბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ]*')]),
      city   : new FormControl('',[Validators.required,Validators.pattern('^[A-Za-zაბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ]*')]),
      address: new FormControl('',[Validators.required]),
    }),
    actualAddress: new FormGroup(
    {
      country: new FormControl('',[Validators.required,Validators.pattern('^[A-Za-zაბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ]*')]),
      city   : new FormControl('',[Validators.required,Validators.pattern('^[A-Za-zაბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ]*')]),
      address: new FormControl('',[Validators.required])
    })
  });

  constructor(private route: ActivatedRoute)
  {
    this.route.params.subscribe(params => 
    {
      this.editable = (params.view == 'edit');
    
      if(this.editable)
      {
        this.onAction.emit({type:'isInEditMode',data:null});
      }
   });
   this.route.data.subscribe((data: { client: Client }) => 
   {
     this.data = data.client;
   });
  }

  ngOnInit(): void
  {
    if(this.editable)
    {
      this.onAction.emit({type:'isInEditMode',data:null});
    }
  }
  
  public addNewAccount()
  {
    this.accounts = !this.accounts ? [] : this.accounts;

    if(!this.hasEmptyAccounts)
    {
      this.accounts.unshift(
      {
        accountID:0,
        accountType:AccountType.Accumulating,
        clientNumber:0,
        currency:Currency.GEL,
        state:AccountState.Active
      });
    }
  }

  public onSubmit()
  {
    let client = this.clientForm.value;
    client.accounts = this.accounts;

    this.onAction.emit({type:'submitClient',data:this.clientForm.value});
  }

  public onEdit()
  {
    this.onAction.emit({type:'editClient',data:this.clientID});
  }

  public onDelete()
  {
    this.onAction.emit({type:'removeClient',data:this.clientID});
  }

  public onHome()
  {
    this.onAction.emit({type:'onHome',data:null});
  }

  private getControl(control:string,form:any)
  {
    if(control.length>0 && form)
    {
      if(control.indexOf('.')>-1)
      {
        let arr = control.split('.');

        if(arr.length>0)
        {
          let item = arr[0];
          arr.splice(0,1);

          return this.getControl(arr.join('.'),form.controls[item]);
        }
      }
      return form.controls[control]
    }
  }

  public getError(control:string)
  {
    let fControl = this.getControl(control,this.clientForm);
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
          switch(fControl.errors.pattern.requiredPattern)
          {
            case '^[A-Za-zაბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ]*$': return 'მხოლოდ ასოებია დასაშვები'; 
            case '^[აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ]*$'      : return 'მხოლოდ ქართული სიმბოლოებია დასაშვები'; 
            case '^5[0-9]*$'                                     : return 'პირველი ციფრი უნდა იყოს 5, მხოლოდ ციფრებია დასაშვები'; 
            case '^[0-9]*$'                                      : return 'მხოლოდ ციფრებია დასაშვები'; 
          }
        }
      }
    }
    return '';
  }
}
