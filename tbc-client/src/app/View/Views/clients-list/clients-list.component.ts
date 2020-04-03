import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Client } from 'src/app/Servicess/Interfaces/Client';
import { Gender } from 'src/app/Servicess/Enums/Enums';
import { ActivatedRoute } from '@angular/router';
import { ActionEvent } from 'src/app/Servicess/Interfaces/ActionEvent';

@Component({
  selector: 'clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit
{
  @Output() onAction: EventEmitter<ActionEvent> = new EventEmitter();

  public currentPage: number = 0;
  public pageCount  : number = 20;
  public clients    : Client[];
  public cols       : any[]


  constructor(private route: ActivatedRoute)
  {
    this.route.params.subscribe(params => 
    {
      this.currentPage = (params.page-1);
    });
    this.route.data.subscribe((data: { clients:Client[] }) => 
    {
      this.clients = data.clients;
    });

    this.cols = 
    [
      { field: 'clientID',  header: 'ID'                    },
      { field: 'firstName', header: 'სახელი'                },
      { field: 'lastName',  header: 'გვარი'                 },
      { field: 'phone',     header: 'ტელეფონი'             },
      { field: 'accounts',  header: 'ანგარიშების რაოდენობა' }
    ];
  }

  ngOnInit(): void
  {
  }

  paginate(e)
  {
    this.onAction.emit({type:'userlistPageChange',data:(e.first/this.pageCount)+1});
  }

  view(e)
  {
    this.onAction.emit({type:'viewClient',data:e.clientID});
  }

  edit(e)
  {
    this.onAction.emit({type:'editClient',data:e.clientID});
  }

  get page():number
  {
    return (this.pageCount * this.currentPage);
  }
}
