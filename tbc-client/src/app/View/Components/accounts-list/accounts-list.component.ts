import { Component, Input } from '@angular/core';
import { AccountType, Currency, AccountState } from 'src/app/Servicess/Enums/Enums';
import { ClientAccount } from 'src/app/Servicess/Interfaces/ClientAccount';

@Component({
  selector: 'accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent
{
  public accounts    : Array<ClientAccount>;
  public expandedRows: {} = {};
  public cols        : any[] = [
    { field: 'accountID',  header: 'ID'      },
    { field: 'accountType',header: 'ტიპი'    },
    { field: 'currency',   header: 'ვალუტა'  },
    { field: 'state',      header: 'სტატუსი' }
  ];

  @Input()
  set data(val:Array<ClientAccount>)
  {
    this.accounts = val;
  }

  constructor()
  {
    if(!this.expandedRows['0'])
    {
      this.expandedRows['0'] = true;
    }
  }

  onCardAction(e)
  {
    switch(e.type)
    {
      case 'onUpdate':
      {
        e.data['original'].accountID    = Number.parseInt(e.data['updated'].accountID);
        e.data['original'].clientNumber = Number.parseInt(e.data['updated'].clientNumber);
        e.data['original'].accountType  = e.data['updated'].accountType;
        e.data['original'].currency     = e.data['updated'].currency;
        e.data['original'].state        = e.data['updated'].state;   
        break;
      }
      case 'onDelete':
      {
        let index = this.accounts.indexOf(e.data);
        if(index>=0)
        {
          this.accounts.splice(index,1);
        }
        break;
      }
    }
  }
  
  getFieldValue(type,e)
  {
    let str = e;
    switch(type)
    {
      case 'accountType':
        {
          switch(e)
          {
            case AccountType.Current     :str = 'მიმდინარე';    break;
            case AccountType.Accumulating:str = 'დაგროვებითი'; break;
            case AccountType.Saving      :str = 'შემნახველი';   break;
          }
          break;
        }
      case 'currency':
        {
          switch(e)
          {
            case Currency.GEL:str = "GEL"; break;
            case Currency.USD:str = "USD"; break;
            case Currency.EUR:str = "EUR"; break;
            case Currency.RUB:str = "RUB"; break;
          }
          break;
        }
      case 'state':
        {
          switch(e)
          {
            case AccountState.Active:str = "აქტიური"  ; break;
            case AccountState.Closed:str = "დახურული"; break;
          }
          break;
        }
    }
    return str;
  }
}
