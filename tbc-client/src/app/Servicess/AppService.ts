import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './Interfaces/Client';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';

@Injectable({providedIn: 'root'})
export class AppService
{
    public  isEditing  :boolean = false;
    private endpoint   :string  = "";
    private currentPage:number  = 1;
    private clients    :Array<Client>;

    constructor(private http: HttpClient, public router : Router)
    {
        this.endpoint = environment.serviceURL;
    }

    private getClientFromArray(id)
    {
        let result = null;
        
        if(this.clients)
        {
            result = this.clients.filter(function(o){return o.clientID == id;});
        }
        return result ? result[0] : null;
    }

    isInEditMode()
    {
        this.isEditing = true;
    }

    returnToUsersList()
    {
        this.router.navigate(['/clientsList/'+this.currentPage]);
    }

    changePage(id)
    {
        this.router.navigate(['/clientsList/'+id]);
        this.currentPage = id;
    }

    viewClient(id)
    {
        this.router.navigate(['/client/view/'+id]);
    }

    editClient(id)
    {
        this.router.navigate(['/client/edit/'+id]);
    }

    removeClient(id)
    {
        this.http.post(this.endpoint+'/removeClient',{id:id}).subscribe(e=>
        {
            this.isEditing = false;
            this.clients   = null;
            this.router.navigate(['/clientsList/'+this.currentPage]);
        })
    }

    submitClient(obj:Client)
    {
        this.http.post(this.endpoint+'/submitClient',obj).subscribe(e=>
        {
            if(obj.clientID==0)
            {
                this.currentPage = 1;
            }
            this.clients     = null;
            this.isEditing   = false;
            this.router.navigate(['/clientsList/'+this.currentPage]);
        })
    }

    getClientEmpty():Client
    {
        return  {
            clientID          :0,
            firstName         :'',
            lastName          :'',
            gender            :0,
            personID          :'',
            phone             :0,
            registeredCountry :'',
            registeredCity    :'',
            registeredAdress  :'',
            actualCountry     :'',
            actualCity        :'',
            actualAdress      :'',
            photo             :'',
            accounts          :[]
        }
    }

    getClient(id): Observable<any>
    {
        return Observable.create((observer) => 
        {
            let client = this.getClientFromArray(id);
            if(client)
            {
                observer.next(client);
                observer.complete();
            }
            else
            {
                this.http.post(this.endpoint+'/getClient',{id:id}).subscribe(e=>
                {
                    observer.next(e);
                    observer.complete();
                })
            }
        });
    }

    getClients(): Observable<Client[]>
    {
        return Observable.create((observer) => 
        {
            if(this.clients)
            {
                observer.next(this.clients);
                observer.complete();
            }
            else
            {
                this.http.get(this.endpoint+'/getClients').subscribe(e=>
                {
                    this.clients = e as Client[];
                    observer.next(this.clients);
                    observer.complete();
                })
            }
        });
    }

    onActions(type,data)
    {
        console.log("Action:",type,"Params:",data);

        switch(type)
        {
            case 'onHome'            :this.returnToUsersList();     break;
            case 'isInEditMode'      :this.isInEditMode     ();     break; 
            case 'userlistPageChange':this.changePage       (data); break;
            case 'viewClient'        :this.viewClient       (data); break; 
            case 'editClient'        :this.editClient       (data); break; 
            case 'removeClient'      :this.removeClient     (data); break;
            case 'submitClient'      :this.submitClient     (data); break;
        }
    }
}