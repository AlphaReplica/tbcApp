import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';
import { AppService } from '../AppService';

@Injectable({providedIn: 'root'})
export class CanNavigate implements CanActivate
{
    constructor(private service:AppService)
    {
    }

    canActivate(): boolean
    {
        if(this.service.isEditing)
        {
            return false;
        }
        return true;
    }
}