import { Component } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { CardService } from './../../services/card.service';
import { CreditCard } from '../../models/CreditCard';


@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css']
})
export class ListCardComponent {

  public title: string = 'Listar Tarjeta';
  public listCard: CreditCard [] = [];

  constructor( private cardService: CardService, private toastr: ToastrService ) {}

  ngOnInit() {
    this.obteinCard();
  }

  obteinCard() {
    this.cardService.obteinCards().subscribe( data => {
      this.listCard = [];
      data.forEach(( element: any ) => {
        this.listCard.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    })
  }

  deleteCard( id: any ) {
    this.cardService.deleteCard( id ).then( () => {
      this.toastr.success('¡¡La tarjeta fue eliminada con exito!!', 'Registro eliminado');
    }, error => {
      this.toastr.error('Opps.. no se pudo eliminar la tarjeta', 'Hubo un error');
      console.log( error )
    });
  }

}
