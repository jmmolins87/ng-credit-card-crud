import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder, 
  FormGroup,
  Validators 
} from '@angular/forms';
import { CreditCard } from './../../models/CreditCard';
import { CardService } from './../../services/card.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  public title: string = 'Crear Tarjeta';
  public actionButton: string = "Aceptar";
  public form: FormGroup;
  public showSpinner: boolean = false;
  public id: string | undefined;

  constructor( 
      private fb: FormBuilder, 
      private cardService: CardService,
      private toastr: ToastrService ) {
    this.form = fb.group({
      titular: [ '', Validators.required ],
      numCard: [ 
        '', 
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16)
        ]
      ],
      expirateDate: [ 
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5)
        ]
      ],
      cvv: [ 
        '', 
        [ 
          Validators.required, 
          Validators.minLength(3),
          Validators.maxLength(3)
        ]
      ]
    });
  }

  ngOnInit() {
    this.cardService.getCard().subscribe( card => {
      console.log( card );
      this.id = card.id;
      this.title = "Editar Tarjeta";
      this.actionButton = "Actualizar";
      this.form.patchValue({
        titular: card.titular,
        numCard: card.numCard,
        expirateDate: card.expirateDate,
        cvv: card.cvv
      });
    })
  }

  createCard() {

    if( this.id === undefined ) {
      // Creamos nueva tarjeta
      this.addCard();
    } else {
      // Editamos tarjeta
      this.editCard( this.id )
    }
  }

  addCard() {

    const card: CreditCard = {
      titular: this.form.value.titular,
      numCard: this.form.value.numCard,
      expirateDate: this.form.value.expirateDate,
      cvv: this.form.value.cvv,
      createDate: new Date(),
      updateDate: new Date()
    };

    this.showSpinner = true;

    this.cardService.saveCard( card ).then(() => {
      this.toastr.success('¡¡Tarjeta registrada con éxito!!', 'Tarjeta registrada');
      this.showSpinner = false;
      this.form.reset();
    }, error => {
      this.showSpinner = false;
      this.toastr.error('Error al registrar la tarjeta', 'Error en el registro')
    });
  }

  editCard( id: string ) {

    const card: CreditCard = {
      titular: this.form.value.titular,
      numCard: this.form.value.numCard,
      expirateDate: this.form.value.expirateDate,
      cvv: this.form.value.cvv,
      updateDate: new Date()
    };

    this.showSpinner = true;

    this.cardService.editCard( id, card ).then(() => {
      this.showSpinner = false;
      this.title = 'Crear Tarjeta';
      this.actionButton = 'Aceptar';
      this.form.reset();
      this.id = undefined;
      this.toastr.info('¡¡Tarjeta actualizada con éxito!!', 'Tarjeta actualizada');
    }, error => {
      this.showSpinner = false;
      this.toastr.error('Error al actualizar la tarjeta', 'Error en la actualización')
    });
  }

}
