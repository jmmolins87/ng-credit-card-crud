import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';

import { CreditCard } from '../models/CreditCard';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor( private firebase: AngularFirestore ) { }

  saveCard( card: CreditCard ): Promise<any> {

    return this.firebase.collection('cards').add( card );
  }

  obteinCards(): Observable<any> {
    
    return this.firebase.collection('cards', ref => ref.orderBy('createDate', 'asc')).snapshotChanges();
  }

  deleteCard( id: string ): Promise<any> {
      
      return this.firebase.collection('cards').doc( id ).delete();
  }
}
