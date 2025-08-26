import { Component, computed, effect, inject, signal } from '@angular/core';
import { CartService } from '../../sercices/cart-service';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { Pizza } from '../../models/pizza';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cart',
  imports: [TableModule, Button],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  private _cartService = inject(CartService);
  private _httpClient = inject(HttpClient);
  private _messageService = inject(MessageService);


  cart = signal<Pizza[]>([]);

  total = computed(()=> {
    this.cart().reduce((prev, current)=> current.prix + prev, 0)
  })

  cartCount = computed(() => this.cart().length);

  constructor(){
    //effect relance une action à chaque modification du panier
    effect(()=> {
      //cette fonction sera exécuté à chaque modification du panier
      if(this._cartService.cart().length ===0) {
        this.cart.set([]);
        return;
      }
      forkJoin(this._cartService.cart().map(item => 
        this._httpClient.get<Pizza>('http://localhost:3000/pizza/'+item.id)
      )).subscribe(data => this.cart.set(data));

    })
  }

  removeFromCart(i: number) {
    this._cartService.remove(i);
  }

  order() {
    this._httpClient.post<void>('http://localhost:3000/commandes', this._cartService.cart()
  ).subscribe(() => {
    this._messageService.add({ severity: 'success', detail: ('Votre commande a été envoyé' )});
  });

  }
}
