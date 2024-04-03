import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { CardComponent } from './components/card/card.component';
import { ListCardComponent } from './components/list-card/list-card.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ListCardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
