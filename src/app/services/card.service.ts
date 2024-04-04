import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable, Subject } from 'rxjs';

import { CreditCard } from '../models/CreditCard';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private card = new Subject<CreditCard>();

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

  editCard( id: string, card: any ): Promise<any> {
    return this.firebase['firestore'].collection('cards').doc( id ).update( card );
  }

  addCard( card: CreditCard ) { 
    this.card.next( card );
  }

  getCard(): Observable<CreditCard> {
    return this.card.asObservable();
  }
}
