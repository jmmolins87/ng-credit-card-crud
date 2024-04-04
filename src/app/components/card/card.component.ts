import { Component } from '@angular/core';
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
export class CardComponent {

  public title: string = 'Crear Tarjeta';
  public form: FormGroup;
  public showSpinner: boolean = false;

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

  createCard() {

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

}
