import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppService } from '../AppService';

@Injectable({providedIn: 'root'})
export class ClientResolver implements Resolve<any>
{
    constructor(private service: AppService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {
        if(Number.parseInt(route.paramMap.get('id'))>0)
        {
            return this.service.getClient(route.paramMap.get('id'));
        }
        return this.service.getClientEmpty();
    }
}

@Injectable({providedIn: 'root'})
export class ClientListResolver implements Resolve<any>
{
    constructor(private service: AppService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {
        return this.service.getClients();
    }
}