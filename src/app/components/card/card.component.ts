import { Component } from '@angular/core';
import { 
  FormBuilder, 
  FormGroup,
  Validators 
} from '@angular/forms';
import { CreditCard } from 'src/app/models/CreditCard';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  public title: string = 'Crear Tarjeta';
  public form: FormGroup;

  constructor( fb: FormBuilder ) {
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

    console.log( card );
  }

}
