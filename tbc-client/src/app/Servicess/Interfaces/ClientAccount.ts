import { AccountType, Currency, AccountState } from './../Enums/Enums';

export interface ClientAccount
{
    accountID   :number;
    clientNumber:number;
    accountType :AccountType;
    currency    :Currency;
    state       :AccountState;
}