import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Pizza } from '../../models/pizza';
import { PizzaCard } from "../../components/pizza-card/pizza-card";

@Component({
  selector: 'app-home',
  imports: [PizzaCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  private _httpClient = inject(HttpClient);

  pizzas = signal<Pizza[]>([]);

  constructor(){
    // code d'initialisation
    this._httpClient.get<Pizza[]>('http://localhost:3000/pizza')
      .subscribe({
        // en cas de succès
        next: (reponse) => {this.pizzas.set(reponse) },
        // en cas d'erreur
        error: () => {}
      })
  }
}
