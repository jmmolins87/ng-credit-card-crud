import { Component, inject } from '@angular/core';

import { Firestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public title = 'Tarjeta de crédito';
  public firestore: Firestore = inject( Firestore );
}
