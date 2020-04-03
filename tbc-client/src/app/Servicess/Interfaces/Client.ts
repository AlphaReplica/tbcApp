import { Gender } from './../Enums/Enums';
import { ClientAccount } from './ClientAccount';

export interface Client
{
    clientID          :number;
    firstName         :string;
    lastName          :string;
    gender            :Gender;
    personID          :string;
    phone             :number;
    registeredCountry :string;
    registeredCity    :string;
    registeredAdress  :string;
    actualCountry     :string;
    actualCity        :string;
    actualAdress      :string;
    photo             :string;
    accounts          :Array<ClientAccount>;
}